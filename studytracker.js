function addTask() {

    const taskInput =
    document.getElementById("taskInput");

    const taskList =
    document.getElementById("taskList");

    if (taskInput.value.trim() === "")
        return;

    const li =
    document.createElement("li");

    li.innerHTML = `
        <span>${taskInput.value}</span>

        <button onclick="toggleTask(this)">
            Complete
        </button>

        <button onclick="deleteTask(this)">
            Delete
        </button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";
}

function toggleTask(button) {

    const task =
    button.parentElement.querySelector("span");

    task.classList.toggle("completed");
}

function deleteTask(button) {

    button.parentElement.remove();
}