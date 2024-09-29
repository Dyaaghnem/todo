const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("change", filterTodo);

function addTodo(e) {
    e.preventDefault();
    if (!todoInput.value.trim()) return;
    
    const todoDiv = createTodoElement(todoInput.value);
    todoList.appendChild(todoDiv);
    saveTodos(todoInput.value);
    todoInput.value = "";
}

function createTodoElement(text) {
    const div = document.createElement("div");
    div.classList.add("todo");
    div.innerHTML = `
        <li class="todo-item">${text}</li>
        <button class="complete-btn">✔</button>
        <button class="trash-btn">✘</button>`;
    return div;
}

function handleTodoClick(e) {
    const todo = e.target.closest(".todo");
    if (e.target.classList.contains("trash-btn")) {
        todo.remove();
        updateTodos(todo.textContent.trim());
    } else if (e.target.classList.contains("complete-btn")) {
        todo.classList.toggle("completed");
    }
}

function filterTodo() {
    [...todoList.children].forEach(todo => {
        const show = filterOption.value === "all" ||
            (filterOption.value === "completed" && todo.classList.contains("completed")) ||
            (filterOption.value === "incomplete" && !todo.classList.contains("completed"));
        todo.style.display = show ? "flex" : "none";
    });
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => todoList.appendChild(createTodoElement(todo)));
}

function saveTodos(todo) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodos(todoText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(t => t !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}
