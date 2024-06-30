const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let edittodo = null;

// ADD to do
const addtodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("You must write something in your to do");
        return false;
    }

    if(addBtn.value === "Edit"){
        edittodo.target.previousElementSibling.innerHTML = inputText;
        editLocaltodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }

    else{
    // Creating p tag

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    
    // creating edit button

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn);

     // creating delete button

     const deleteBtn = document.createElement("button");
     deleteBtn.innerText = "Remove";
     deleteBtn.classList.add("btn","deleteBtn");
     li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocaltodos(inputText);
    }
}

// Update to do
const updatetodo = (e)=>{

    if(e.target.innerHTML === "Remove"){
     todoList.removeChild(e.target.parentElement);
     deleteLocaltodos(e.target.parentElement);
    }

    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        edittodo = e;
    }
}

const saveLocaltodos = (todo) =>{
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

const getLocaltodos = () =>{
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
         // Creating p tag

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);
    
    // creating edit button

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn);

     // creating delete button

     const deleteBtn = document.createElement("button");
     deleteBtn.innerText = "Remove";
     deleteBtn.classList.add("btn","deleteBtn");
     li.appendChild(deleteBtn);

    todoList.appendChild(li); 
        });
    }
}

const deleteLocaltodos = (todo)=>{
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    console.log(todoIndex);
}

const editLocaltodos = (todo)=>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos",JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getLocaltodos);
addBtn.addEventListener('click',addtodo);
todoList.addEventListener('click',updatetodo);
