class Todo{
      #completed;
      constructor(id, userId, title, completed){
            this.id = id;
            this.userId = userId;
            this.title = title;
            this.completed = completed;
      }

      set completed(value){
            if(value == "on"){
                  this.#completed = true;
            }
            else if(value == "off"){
                  this.#completed = false;
            }
            else{
                  this.#completed = value;
            }
      }

      get completed(){
            return this.#completed;
      }
}

class User{
      constructor(id, name, email, adress, phone, website, company){
            this.id = id;
            this.name = name;
            this.email = email;
            this.adress = adress;
            this.phone = phone;
            this.website = website;
            this.company = company;
      }
}

class Adress{
      constructor(street, suite, city, zipcode, geo){
            this.street = street;
            this.suite = suite;
            this.city = city;
            this.zipcode = zipcode;
            this.geo = geo;
      }
}

class Geo{
      constructor(lat, lng){
            this.lat = lat;
            this.lng = lng;
      }
}

class Company{
      constructor(name, catchPhrase, bs){
            this.name = name;
            this.catchPhrase = catchPhrase;
            this.bs = bs;
      }
}

class TodoApiController{
      TODOS = "todos";
      USERS = "users";
      constructor(){}

      async getTodos(){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.TODOS}`); 
                  let result = await response.text();
                  return JSON.parse(result); 
            }
            catch (error){
                  console.log(error);
            }
      }

      async getTodoById(id){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.TODOS}/${id}`); 
                  let result = await response.text();
                  return JSON.parse(result); 
            }
            catch (error){
                  console.log(error);
            }
      }

      async getTodoByUserId(userId){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.USERS}/${userId}/${this.TODOS}`); 
                  if(!response.ok){
                        throw new Error("Response not OK");
                  }
                  let result = await response.text();
                  return JSON.parse(result);   
            }
            catch(error){
                  console.log(error);
            }
      }

      async addTodo(todo){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.TODOS}`, {
                        method: 'POST',
                        body: JSON.stringify({
                              userId: todo.userId,
                              id: todo.id,
                              title: todo.title,
                              completed: todo.completed,
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      });
                  if(!response.ok){
                        throw new Error("Response not OK");
                  }
                  let result = await response.json();
                  return result;
            }
            catch(error){
                  console.log(error);
            }
      }

      async updateTodo(todo_id, new_todo){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.TODOS}/${todo_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                              userId: new_todo.userId,
                              id: new_todo.id,
                              title: new_todo.title,
                              completed: new_todo.completed,
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      });
                  
                  if(!response.ok){
                        throw new Error("Response not OK");  
                  }
                  let result = await response.json();
                  return result;
            }
            catch(error){
                  console.log(error);
            }
      }

      async pathTodo(todo_id, data){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.TODOS}/${todo_id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(data),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      });
                  if(!response.ok){
                        throw new Error("Response not OK");   
                  }

                  let result = await response.json();
                  return result;
            }
            catch(error){
                  console.log(error);
            }
      }

      async deleteTodo(todo_id){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.TODOS}/${todo_id}`, {
                        method: 'DELETE',
                  });
                  if(!response.ok){
                        throw new Error("Response not OK");
                  }
            }
            catch(error){
                  console.log(error);
            }
      }
}

class UserApiController{
      USERS = "users";
      constructor(){}

      async getUserById(id){
            try{
                  let response = await fetch(`https://jsonplaceholder.typicode.com/${this.USERS}/${id}`); 
                  if(!response.ok){
                        throw new Error("Response not OK");
                  }
                  let result = await response.text();
                  return JSON.parse(result); 
            }
            catch (error){
                  console.log(error);
            }
      }
}

class UsersRepository{
      users = [];
      constructor(userApiController){
            this.userApiController = userApiController;
      }

      async getUserById(id){
            let filtered_user = this.users.filter(user => user.id == id);
            if(filtered_user.length == 0){
                  let new_user = await this.userApiController.getUserById(id);
                  let user = this.objectToUser(new_user);
                  this.users.push(user);
                  return user;
            }
            return filtered_user[0];
      }

      objectToUser(object){
            return new User(object.id, object.name, object.email, object.adress, object.phone, object.website, object.company);
      }
}

class TodosRepository{
      todos = [];
      constructor(usersRepository, todosApiController){
            this.usersRepository = usersRepository;
            this.todosApiController = todosApiController;
      }

      async getTodos(){
            try{
                  let todos = await this.todosApiController.getTodos();
                  return todos;
            }
            catch(error){
                  console.log(error);
            }
      }

      async getTodoById(id){
            try{
                  let local_todos = this.todos.filter(el => {
                        return el.id == id;
                  });
                  if(local_todos.length != 0){
                         return local_todos[0];
                  }
                  let todo = await this.todosApiController.getTodoById(id);
                  return todo;
            }
            catch(error){
                  console.log(error);
            }
      }

      async getTodosByUserId(userId){
            try{
                  let local_todos = this.todos.filter(function(el) {
                       return el.userId == userId;
                  });
                  if(local_todos.length != 0){
                        return local_todos;
                  }
                  let user = await this.usersRepository.getUserById(userId);
                  let todos = await this.todosApiController.getTodoByUserId(userId);
                  todos.forEach(element => {
                        element.user = user;
                  });
                  todos.forEach(el => this.todos.push(el));
                  return todos;
            }
            catch(error){
                  console.log(error);
            }
      }

      async addTodo(todo){
            try{
                  let result = await this.todosApiController.addTodo(todo);
                  this.todos.push(result);
                  return result;
            }
            catch(error){
                  console.log(error);
            }
      }

      async updateTodo(todo_id, new_todo){
            try{
                  let old_todo = await this.getTodoById(todo_id); 
                  old_todo.userId = new_todo.userId;
                  old_todo.id = new_todo.id;
                  old_todo.title = new_todo.title;
                  old_todo.completed =  new_todo.completed;
                  let result = await this.todosApiController.updateTodo(todo_id, new_todo);
                  return result;
            }
            catch(error){
                  console.log(error);
            }
      }

      async pathTodo(todo_id, data){
            try{
                  let result = await this.todosApiController.pathTodo(todo_id, data);
                  return result;
            }
            catch(error){
                  console.log(error);
            }
      }

      async deleteTodo(todo_id){
            try{
                  await this.todosApiController.deleteTodo(todo_id);
                  let index = -1;
                  for(let todo of this.todos){
                      if(todo.id == todo_id){
                          index = this.todos.indexOf(todo);
                          break;
                      }
                  }      
                  if(index != -1){
                      this.todos.splice(index, 1)
                  }     
                  this.isDeleted = this.todos.length == 0;         
            }
            catch(error){
                  console.log(error);
            }
      }
}

class HTMLWorker{
      currentUserId = -1;
      constructor(todosRepository){
            this.todosRepository = todosRepository;
      }

      getTodoHtmlView(todo){
            let divCheckbox = document.createElement("button");
            divCheckbox.className = "todo-button" 
            let div = document.createElement("div");
            div.className = "todo";
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "todo-checkbox";
            checkbox.id_todo = `${todo.id}`;
            if( todo.completed){
                  checkbox.setAttribute("checked", "");
            }
            this.setUpUpdateCheckBox(checkbox);
            div.prepend(checkbox);
            let  titleText = document.createTextNode(todo.title);
            titleText.className = "todo-text";
            div.append(titleText); 
            divCheckbox.append(div);
            divCheckbox.id_todo = todo.id;
            this.setUpSelectTitleButton(divCheckbox);
            return divCheckbox;
      }
      
      async updateTodoList(){
            var inputValue = document.getElementsByClassName("todos-container-header-form-input")[0].value;
            let listDiv = document.getElementsByClassName("todos-container-body")[0];
            let old_todos = Array.from(document.getElementsByClassName("todo-button"))
            this.currentUserId = parseInt(inputValue);
            let todos = await this.todosRepository.getTodosByUserId(parseInt(inputValue));
            if(old_todos.length != 0){
                  old_todos.forEach(el => listDiv.removeChild(el));
            }
            todos.forEach(el => {
                  this.addTodoToList(this.getTodoHtmlView(el), listDiv);
            });
      }

      addTodoToList(todoView, listTodo){
            listTodo.appendChild(todoView);
      }

      setUpSelectTitleButton(el){
            let func = () =>{
                  if(!el.classList.contains("todo-button-selected")){
                        el.classList.add("todo-button-selected");
                  }
                  else{
                        el.classList.remove("todo-button-selected");
                  }
            };
            el.addEventListener("click", func);
      }

      setUpDeleteButton(el){
            let func = () => {
                  let todos = Array.from(document.getElementsByClassName("todo-button-selected"));
                  let list = document.getElementsByClassName("todos-container-body")[0];
                  todos.forEach(el => list.removeChild(el));
                  todos.forEach(el => this.todosRepository.deleteTodo(el.id_todo));
            };
            el.addEventListener("click", func);
      }

      setUpDefineUserButton(el){
            let func = async () => {
                  await this.updateTodoList();
            };
            el.addEventListener("click", func);
      }

      setUpOpenFormButton(el){
            let func = () => {
                  if(this.currentUserId != -1){
                        let window = document.getElementsByClassName("add-newTodo-form")[0];
                        window.style.display = "flex";
                  }
            };
            el.addEventListener("click", func);
      }

      setUpCancelButton(el){
            let func = () => {
                  let window = document.getElementsByClassName("add-newTodo-form")[0];
                  window.style.display = "none";
            };
            el.addEventListener("click", func);
      }

      setUpAddNewTodoButton(el){
            let func = async () => {
                  let title = document.getElementById("add-newTodo-form-part-input-title").value;
                  let status = document.getElementById("add-newTodo-form-part-input-checkbox").checked;
                  let newTodo = new Todo(0, this.currentUserId, title, status);
                  let result = await this.todosRepository.addTodo(newTodo);
                  this.addTodoToList(this.getTodoHtmlView(result), document.getElementsByClassName("todos-container-body")[0]);
                  let window = document.getElementsByClassName("add-newTodo-form")[0];
                  window.style.display = "none";
                  
            };
            el.addEventListener("click", func);
      }
      
      setUpUpdateCheckBox(el){
            let func = async (event) => {
                  let value = !el.checked;
                  el.checked = value;
                  let id = el.id_todo;
                  let oldTodo = await this.todosRepository.getTodoById(id);
                  let newTodo = new Todo(id, oldTodo.userId, oldTodo.title, !value);
                  let result = await this.todosRepository.updateTodo(id, newTodo);
                  el.checked = !value;
            }
            el.addEventListener("change", func);
      }
}

let todosRep = new TodosRepository(new UsersRepository(new UserApiController()), new TodoApiController());
let worker = new HTMLWorker(todosRep);

if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
} 
else {
      init();
}
  
function init(){
      let defineUserButton = document.getElementsByClassName("todos-container-header-form-button")[0];
      worker.setUpDefineUserButton(defineUserButton);
      let openFormAddNewTodoButton = document.getElementsByClassName("todos-container-bottom-button")[0];
      worker.setUpOpenFormButton(openFormAddNewTodoButton);
      let addNewTodoButton = document.getElementsByClassName("add-newTodo-form-ok")[0];
      worker.setUpAddNewTodoButton(addNewTodoButton);
      let cancelButton = document.getElementsByClassName("add-newTodo-form-cancel")[0];
      worker.setUpCancelButton(cancelButton);
      let deleteButton = document.getElementById("delete-button");
      worker.setUpDeleteButton(deleteButton);
}