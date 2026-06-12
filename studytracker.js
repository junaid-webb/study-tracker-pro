let tasks =
JSON.parse(
    localStorage.getItem("tasks")
) || [];

renderTasks();

function addTask() {

    const taskInput =
    document.getElementById("taskInput");

    const category =
    document.getElementById("category");

    if(taskInput.value.trim() === "")
        return;

    tasks.push({
        text: taskInput.value,
        category: category.value,
        completed: false
    });

    saveTasks();

    taskInput.value = "";
}

function toggleTask(index) {

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
}

function deleteTask(index) {

    tasks.splice(index,1);

    saveTasks();
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();
}

function renderTasks() {

    const taskList =
    document.getElementById("taskList");

    const searchValue =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    taskList.innerHTML = "";

    tasks
    .filter(task =>
        task.text
        .toLowerCase()
        .includes(searchValue)
    )
    .forEach((task,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML = `
            <span class="${
                task.completed
                ? "completed"
                : ""
            }">
                ${task.category}
                ${task.text}
            </span>

            <button
                onclick="toggleTask(${index})">
                Complete
            </button>

            <button
                onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function updateStats() {

    const total =
    tasks.length;

    const completed =
    tasks.filter(
        task => task.completed
    ).length;

    const pending =
    total - completed;

    document.getElementById(
        "totalTasks"
    ).textContent = total;

    document.getElementById(
        "completedTasks"
    ).textContent = completed;

    document.getElementById(
        "pendingTasks"
    ).textContent = pending;

    const percent =
    total === 0
    ? 0
    : Math.round(
        (completed/total)*100
    );

    document.getElementById(
        "progressPercent"
    ).textContent =
    percent + "%";

    document.getElementById(
        "progressFill"
    ).style.width =
    percent + "%";
}