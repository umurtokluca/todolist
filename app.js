const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".todo-list")
const clearButton = document.querySelector("#delete-todos")
const listBody = document.querySelector(".todo-list-body")

eventListeners();

function eventListeners(){ 
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    listBody.addEventListener("click",deleteTodo)
    clearButton.addEventListener("click",clearAllTodos)
}

function clearAllTodos(e){
    if (todoList.firstElementChild == null) {
        redAlertDelete()
    } 
    else if (confirm("Tüm aktiviteleri silmek istediğinize emin misiniz?")){
        // Arayüzden Silme
        // todoList.innerHTML = "";
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem("todos")
        greenAlertDelete()
    }
}

function deleteTodo(e){
    
    if (e.target.className === "remove-icon md hydrated"){
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage()

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1)
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos))
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage()

    todos.forEach(function(todo){
        addTodoToUI(todo)

    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim()

    if (newTodo == ""){
        redAlert()
    }
    else {
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo)
        greenAlert()
    }

    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage()

    todos.push(newTodo)
    
    localStorage.setItem("todos",JSON.stringify(todos))

}

function redAlert(){
    
    document.getElementById("add-todo").classList.add("red-alert")
    document.getElementById("add-todo").innerHTML="Lütfen alanı boş bırakmayın."

    setTimeout(function(){
        $('#add-todo').removeClass('red-alert')
    },1000)

    setTimeout(function(){ 
        document.getElementById("add-todo").innerHTML = "Ekle";
    }, 1000);
}

function greenAlert(){
    
    document.getElementById("add-todo").classList.add("green-alert")
    document.getElementById("add-todo").innerHTML="Aktivite başarıyla eklendi."
    
    setTimeout(function(){
        $('#add-todo').removeClass('green-alert')
    },1000)

    setTimeout(function(){ 
        document.getElementById("add-todo").innerHTML = "Ekle";
    }, 1000);
}

function redAlertDelete(){
    document.getElementById("delete-todos").classList.add("red-alert")
    document.getElementById("delete-todos").value="Aktivite listesi zaten boş."

    setTimeout(function(){
        $('#delete-todos').removeClass('red-alert')
    },1000)

    setTimeout(function(){ 
        document.getElementById("delete-todos").value = "Tüm Aktiviteleri Temizleyin";
    }, 1000);
}

function greenAlertDelete(){
    document.getElementById("delete-todos").classList.add("green-alert")
    document.getElementById("delete-todos").value="Aktiviteler başarıyla temizlendi."

    setTimeout(function(){
        $('#delete-todos').removeClass('green-alert')
    },1000)

    setTimeout(function(){ 
        document.getElementById("delete-todos").value = "Tüm Aktiviteleri Temizleyin";
    }, 1000);
}

function addTodoToUI(newTodo){

    const listItem = document.createElement("li")
    const link = document.createElement("a")

    link.href = "#";
    link.className = "todo-remove"
    link.innerHTML = "<ion-icon name='close-outline' class='remove-icon'></ion-icon>"

    listItem.className = "todo-list-item"
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link)

    todoList.appendChild(listItem)
    todoInput.value = ""
    
}