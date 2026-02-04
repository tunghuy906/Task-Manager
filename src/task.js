const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load task khi mở trang
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  tasks.push(text);
  saveTasks();
  renderTasks();

  input.value = "";
});

// Render task list
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn">✖</button>
    `;

    li.querySelector(".delete-btn").onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
