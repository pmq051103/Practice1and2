document.addEventListener("DOMContentLoaded", loadTasks);
const API_URL = "http://localhost:3000/tasks";

async function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let id = crypto.randomUUID();

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, text: taskText, completed: false })
    });
    taskInput.value = "";
    loadTasks();
}

async function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let response = await fetch(API_URL);
    let tasks = await response.json();

    tasks.forEach((task) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = task.text;
        span.className =task.completed ? 'completed' : '';
        if (!task.completed) {
            span.onclick = () => toggleTask(task.id);
        } else {
            span.style.cursor = "not-allowed"; 
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Xóa";
        deleteBtn.id="btnDelete";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

async function toggleTask(id) {
    let response = await fetch(`${API_URL}/${id}`);
    let task = await response.json();

    if (!task.completed) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: task.text, completed: !task.completed })
        });
        loadTasks();
    }
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
}
