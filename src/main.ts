import "./style.css"

type Task = {
  id: number
  title: string
  completed: boolean
}

const input = document.getElementById("task-input") as HTMLInputElement
const addBtn = document.getElementById("add-btn") as HTMLButtonElement
const taskList = document.getElementById("task-list") as HTMLUListElement

// Load từ localStorage
let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]")

renderTasks()

// Add task
addBtn.addEventListener("click", () => {
  const title = input.value.trim()
  if (!title) return

  const newTask: Task = {
    id: Date.now(),
    title,
    completed: false
  }

  tasks.push(newTask)
  saveTasks()
  renderTasks()

  input.value = ""
})

// Render
function renderTasks() {
  taskList.innerHTML = ""

  tasks.forEach(task => {
    const li = document.createElement("li")
    li.className = "task-item"

    li.innerHTML = `
      <label class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <span class="${task.completed ? "completed" : ""}">
          ${task.title}
        </span>
      </label>
      <button class="delete-btn">✖</button>
    `

    // Toggle completed
    const checkbox = li.querySelector("input") as HTMLInputElement
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked
      saveTasks()
      renderTasks()
    })

    // Delete
    const deleteBtn = li.querySelector("button") as HTMLButtonElement
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id)
      saveTasks()
      renderTasks()
    })

    taskList.appendChild(li)
  })
}

// Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
