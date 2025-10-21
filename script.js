const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Create Clear All button
const clearAllBtn = document.createElement("button");
clearAllBtn.textContent = "Clear All";
clearAllBtn.classList.add("clearAllBtn");
document.querySelector(".container").appendChild(clearAllBtn);

// Load saved tasks
window.addEventListener("load", loadTasks);

addBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const date = new Date();
  const timeString = date.toLocaleString(); // Date + time

  const task = { text: taskText, completed: false, time: timeString };
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);

  createTaskElement(task);
  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("fade-in");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const taskText = document.createElement("span");
  taskText.textContent = task.text;

  const timeInfo = document.createElement("small");
  timeInfo.textContent = task.time;

  taskContent.appendChild(taskText);
  taskContent.appendChild(timeInfo);

  if (task.completed) li.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("deleteBtn");

  deleteBtn.addEventListener("click", () => {
    li.classList.add("fade-out");
    setTimeout(() => {
      li.remove();
      deleteTaskFromStorage(task.text);
    }, 300);
  });

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleTaskComplete(task.text);
  });

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Local Storage functions
function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => createTaskElement(task));
}

function deleteTaskFromStorage(taskText) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => task.text !== taskText);
  saveTasksToStorage(tasks);
}

function toggleTaskComplete(taskText) {
  const tasks = getTasksFromStorage();
  const updated = tasks.map(task =>
    task.text === taskText ? { ...task, completed: !task.completed } : task
  );
  saveTasksToStorage(updated);
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
  }
}
// 🌙 Theme Toggle
const themeToggle = document.getElementById("themeToggle");

// Check and load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
