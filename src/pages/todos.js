import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Todos from "../services/todos.js";
import Form from "../components/form.js";

const global_todos = [];

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const delete_button = document.getElementById('todos-list-delete');
    setUpDeleteButton(delete_button);

    // getAll get /todo
    refreshTodos();

    // create POST /todo { description: string }
    const formEl = document.getElementById('todos-form')

    new Form(formEl, {
        'description': (value) => {
            if (value.length < 1) {
                return 'Значение должно быть больше 1'
            } else if (value.length >= 64) {
                return 'Значение должно быть меньше 64'
            }

            return false
        }
    }, async (values) => {
        await Todos.create(values.description);
        refreshTodos();
    })
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

async function refreshTodos() {
    const todos = await Todos.getAll();
    const todos_list = document.getElementById("todos-list");
    todos_list.innerHTML = '';
    printTodos(todos);
}

function printTodos(todos) {
    const todos_list = document.getElementById("todos-list");
    if (todos.length != 0) {
        for (let todo of todos) {
            const view = getTodoView(todo);
            todos_list.appendChild(view);
        }
    }
}

function getTodoView(todo) {
    let checked = "";
    if (todo.completed) {
        checked = "checked";
    }
    const view = 
    `
            <input class="todo-item-checkbox" type="checkbox" ${checked}>
            <div class="todo-item-text">${todo.description}</div>
    `;
    let div_main = document.createElement("button");
    div_main.className = "todo-item";
    div_main.innerHTML = view;
    let checkbox = div_main.getElementsByClassName("todo-item-checkbox")[0];
    checkbox.todo_id = todo.id;
    setUpUpdateCheckBox(checkbox);
    setUpSelectTitleButton(div_main);
    return div_main;
}

function setUpUpdateCheckBox(el) {
    let func = async (event) => {
          let value = !el.checked;
          el.checked = value;
          let id = el.todo_id;
          try {
            await Todos.update(id, value);
            el.checked = !value;
          }
          catch{
            alert("Непредвиденная ошибка, статус не может быть изменён");
          }
    }
    el.addEventListener("change", func);
}

function setUpDeleteButton(el){
    let func = () => {
          let todos = Array.from(document.getElementsByClassName("todo-item-selected"));
          const todos_list = document.getElementById("todos-list");
          todos.forEach(async el => {
            let id = el.getElementsByClassName("todo-item-checkbox")[0].todo_id;
            await Todos.delete(id);
            todos_list.removeChild(el)
          });
          
    };
    el.addEventListener("click", func);
}

function setUpSelectTitleButton(el){
    let func = () =>{
          if(!el.classList.contains("todo-item-selected")){
                el.classList.add("todo-item-selected");
          }
          else{
                el.classList.remove("todo-item-selected");
          }
    };
    el.addEventListener("click", func);
}