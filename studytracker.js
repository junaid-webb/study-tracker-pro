let tasks =
JSON.parse(
    localStorage.getItem("tasks")
) || [];

let goal =
localStorage.getItem("goal")
|| 0;

const quotes = [

    "Small progress is still progress.",

    "Consistency beats motivation.",

    "Study now, shine later.",

    "Every expert was once a beginner."

];

renderTasks();

document.getElementById(
    "goalText"
).textContent =
"Goal: " + goal + " Topics";

document.getElementById(
    "quote"
).textContent =
quotes[
    Math.floor(
        Math.random() *
        quotes.length
    )
];

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

function saveGoal(){

    goal =
    document.getElementById(
        "goalInput"
    ).value;

    localStorage.setItem(
        "goal",
        goal
    );

    document.getElementById(
        "goalText"
    ).textContent =
    "Goal: " + goal + " Topics";
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
    updateBadges();
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

function updateBadges(){

    const completed =
    tasks.filter(
        task => task.completed
    ).length;

    let badges = "";

    if(completed >= 1)
        badges +=
        '<span class="badge">🏆 First Step</span>';

    if(completed >= 5)
        badges +=
        '<span class="badge">🏆 Consistent Learner</span>';

    if(completed >= 10)
        badges +=
        '<span class="badge">🏆 Study Warrior</span>';

    document.getElementById(
        "badges"
    ).innerHTML = badges;
}

let time = 1500;
let interval;

function updateTimer(){

    let minutes =
    Math.floor(time / 60);

    let seconds =
    time % 60;

    document.getElementById(
        "timer"
    ).textContent =
    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

function startTimer(){

    if(interval) return;

    interval =
    setInterval(()=>{

        if(time > 0){

            time--;

            updateTimer();
        }

    },1000);
}

function pauseTimer(){

    clearInterval(interval);

    interval = null;
}

function resetTimer(){

    pauseTimer();

    time = 1500;

    updateTimer();
}

updateTimer();