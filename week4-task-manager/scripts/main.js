// 1. HTML ke elements pakro
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMessage = document.getElementById("errorMessage");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// 2. Tasks aur filter ka state
let tasks = loadTasks();
let currentFilter = "all";

// 3. localStorage se tasks lo
function loadTasks() {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

// 4. localStorage mein tasks save karo
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 5. Tasks ko page par dikhao
function renderTasks() {
  taskList.innerHTML = "";

  const visibleTasks = tasks.filter(function (task) {
    if (currentFilter === "active") {
      return !task.completed;
    }
    if (currentFilter === "completed") {
      return task.completed;
    }
    return true;
  });

  visibleTasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", function () {
      toggleTask(task.id);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function () {
      editTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// 6. Complete / Undo
function toggleTask(id) {
  tasks.forEach(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  saveTasks();
  renderTasks();
}

// 7. Delete
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  renderTasks();
}

// 8. Edit
function editTask(id) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });

  const newText = prompt("Edit your task:", task.text);

  if (newText === null) {
    return;
  }

  if (newText.trim() === "") {
    errorMessage.textContent = "Task cannot be empty.";
    return;
  }

  errorMessage.textContent = "";
  task.text = newText.trim();
  saveTasks();
  renderTasks();
}

// 9. Add task
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please enter a task.";
    return;
  }

  errorMessage.textContent = "";

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// 10. Filter buttons
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    renderTasks();
  });
});

// 11. Page khulte hi saved tasks dikhao
renderTasks();
