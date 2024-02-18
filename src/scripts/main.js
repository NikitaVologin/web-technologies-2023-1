class Post{
      comments = [];
      constructor(id, user, title, body, comments = []){
            this.id = id;
            this.user = user;
            this.title = title;
            this.body = body;
            this.comments = comments;
      }

      addComment(comment){
            this.comments.push(comment);
      }

      addComments(comments){
            comments.forEach(comment => this.addComment(comment));
      }
      
      equals(other_post){
            return this.user == other_post.user &&
                  this.title == other_post.title &&
                  this.body == other_post.body &&
                  this.comments.quals_comments(comments);
      }

      equals_comments(other_comments){
            let lenbool = this.comments.length == other_comments.length;
            let comequals = false;
            if(lenbool){
                  for(let i = 0; i < this.comments.length; i++ ){
                        comequals += this.comments[i].equals(other_comments[i]);
                  }
                  return comequals == this.comments.length;
            }
            return false;
      }
}

class Comment{
      constructor(postId, id, name, email, body){
            this.postId = postId;
            this.id = id;
            this.name = name;
            this.email = email;
            this.body = body;
      }
      equals(other_comment){
            return this.postId == other_comment.postId &&
                  this.name == other_comment.name &&
                  this.email == other_comment.email &&
                  this.body == other_comment.body;
      }
}

class APIController{
      constructor(){}
      
      async getPosts(){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/posts`); 
                  let result = await response.text();
                  return JSON.parse(result); 
            }
            catch (error){
                  console.log(error);
            }
      }

      async getPostById(id){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`); 
                  let result = await response.text();
                  return JSON.parse(result); 
            }
            catch (error){
                  console.log(error);
            }
      }

      async getPostCommentsByPostId(post_id){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}/comments`); 
                  let result = await response.text();
                  return JSON.parse(result);   
            }
            catch(error){
                  console.log(error);
            }
      }

      async addPost(post){
            try{
                  let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        body: JSON.stringify({
                          title: post.title,
                          body: post.body,
                          userId: post.user,
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      });
                  let result = await response.json();
                  return result.equals(post);
            }
            catch(error){
                  console.log(error);
            }
      }

      async updatePost(post_id, new_post){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                          id: post_id,
                          title: new_post.title,
                          body: new_post.body,
                          userId: new_post.user,
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      });
                  let result = response.json();
                  return new_post.equals(result);
            }
            catch(error){
                  console.log(error);
            }
      }

      async pathPost(post_id, data){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(data),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      });
                  let result = await response.json();
            }
            catch(error){
                  console.log(error);
            }
      }

      async deletePost(post_id){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`, {
                        method: 'DELETE',
                  });
            }
            catch(error){
                  console.log(error);
            }
      }
}

class PostRepository{
      posts = [];
      
      constructor(controller, postMapper, commentMapper){
            this.controller = controller;
            this.postMapper = postMapper;
            this.commentMapper = commentMapper;
      }

      get count() {
            return this.posts.length;
      }

      async getPosts(){
            this.posts = [];
            var result = await this.controller.getPosts();
            for(var post_result of result){
                  let comments = await this.controller.getPostCommentsByPostId(post_result.id);
                  let post = this.postMapper.objectToPost(post_result).addComments(comments);
                  this.posts.push(post);
            }
      }

      async getPostById(id){
            let filtered_post = this.posts.filter((post) => post.id == id);
            if(filtered_post.length == 0){
                  let result_post = await this.controller.getPostById(id);
                  let post = this.postMapper.objectToPost(result_post);
                  let result_comments = await this.controller.getPostCommentsByPostId(id);
                  let comments = [];
                  result_comments.forEach(comment => comments.push(this.commentMapper.objectToComment(comment)));
                  post.addComments(comments);
                  this.posts.push(post);
                  return post;
            }
            else{
                  return filtered_post[0];
            }
      }

      async addPost(post){

      }

      async updatePost(post_id, new_post){

      }

      async pathPost(post_id, data){

      }

      async deletePost(post_id){
            
      }
}

class PostMapper{
      constructor(){}

      objectToPost(object_post){
            return new Post(object_post.id, object_post.userId, object_post.title, object_post.body);
      }
}

class CommentMapper{
      constructor(){}
      
      objectToComment(object_comment){
            return new Comment(object_comment.postId, object_comment.id, object_comment.name, object_comment.email, object_comment.body);
      }
}

class HTMLWorker{
      constructor(post_repository){
            this.post_repository = post_repository;
            this.post_id = 1;
      }

      get id(){
            return this.post_id;
      }

      set id(value){
            if(value < 1 || value >= this.post_repository.length){
                  throw new RangeError();
            }
            this.post_id = value;
      }

      setButton(el){
            const func =  async () => {
                  let value = parseInt(el.value);//el.getAttribute('id') == "left-button" ? -1 : 1; 
                  this.id += value;
                  let old_node = Array.from(document.getElementsByClassName("post-part"));
                  let post = await this.post_repository.getPostById(this.id);
                  let post_view = this.getPostView(post);
                  let div = document.getElementsByClassName("post-container")[0];
                  let comment_div = document.getElementsByClassName("post-comments")[0];
                  if(old_node.length == 0){
                        div.prepend(post_view);
                  }
                  else{
                        div.replaceChild(post_view, old_node[0]);
                        let old_comments = Array.from(document.getElementsByClassName("post-comment"));
                        old_comments.forEach(oc => comment_div.removeChild(oc));
                  }
                  for(let c of post.comments){
                        comment_div.append(this.getCommentView(c));
                  }
            };
            el.addEventListener("click", func);
      }
      
      getPostView(post){
            let div = document.createElement("div");
            div.className = "post-part";
            div.innerHTML =`
                  <div class="post-header">
                        <div class="post-header-user">
                              <img class="post-header-user-icon" src="assets/img/user.png">
                              <p class="post-header-user-name">${post.user}</p>
                        </div>
                  </div>  
                  <div class="post-body">
                        <p class="post-body-id">${post.id}</p>
                        <div class="post-header-title">
                              <p>${post.title}</p>
                        </div> 
                        <p class="post-body-text">${post.body}</p>
                  </div>
            `;
            return div;
      }
      
      getCommentView(comment){
            let div = document.createElement("div");
            div.className = "post-comment";
            div.innerHTML = `
                  <div class="post-comment-header">
                        <img class="post-comment-header-icon" src="assets/img/user.png">
                        <div class="post-comment-header-contacts">
                              <div class="post-comment-header-contacts-email">
                                    <p class="post-comment-email-text">${comment.email}</p>
                              </div>
                              <div class="post-comment-header-contacts-name">
                              <p class="post-comment-name-text">${comment.name}</p>
                              </div>
                        </div>
                  </div>
                  <div class="post-comment-body">
                        <p class="post-comment-body-text">${comment.body}</p>
                  </div>
            `;
            return div;
      }
      async FillScreen(){
            let post = await this.post_repository.getPostById(this.id);
            let post_view = this.getPostView(post);
            let div = document.getElementsByClassName("post-container")[0];
            div.prepend(post_view);

            let comment_div = document.getElementsByClassName("post-comments")[0];
            let comments = post.comments;
            comments.forEach(comment => comment_div.append(this.getCommentView(comment)));
      }
}
const post_rep = new PostRepository(new APIController(), new PostMapper(), new CommentMapper());
const worker = new HTMLWorker(post_rep); 

if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
} 
else {
      init();
}
  
function init(){
      worker.FillScreen();
      let buttons = Array.from(document.getElementsByClassName("post-bottom-button"));
      buttons.forEach((button) => {
            worker.setButton(button);
      }); 
}