import "./style.css"

type Task = {
  id: number
  title: string
  description: string
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
    description: "",
    completed: false
  }

  tasks.push(newTask)
  saveTasks()
  renderTasks()

  input.value = ""
})

function renderTasks() {
  taskList.innerHTML = ""

  tasks.forEach(task => {
    const li = document.createElement("li")
    li.className = "task-item"

    li.innerHTML = `
      <label class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <div class="task-content">
          <span class="task-title ${task.completed ? "completed" : ""}">
            ${task.title}
          </span>

          <textarea
            class="task-desc"
            placeholder="What will you do for this task?"
          >${task.description}</textarea>
        </div>
      </label>

      <button class="delete-btn">✖</button>
    `

    // checkbox
    const checkbox = li.querySelector("input") as HTMLInputElement
    checkbox.onchange = () => {
      task.completed = checkbox.checked
      saveTasks()
      renderTasks()
    }

    const desc = li.querySelector(".task-desc") as HTMLTextAreaElement

      const autoResize = () => {
        desc.style.height = "auto"
        desc.style.height = desc.scrollHeight + "px"
      }

      autoResize()

      desc.oninput = () => {
        task.description = desc.value
        autoResize()
        saveTasks()
      }


    // delete
    const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement
    deleteBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id)
      saveTasks()
      renderTasks()
    }

    taskList.appendChild(li)
  })
  
}
// Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
