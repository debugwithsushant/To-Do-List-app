let tasks = [];

window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach((task, index) => renderTask(task, index));
  }
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => renderTask(task, index));
}

function addTask() {
  const taskInput = document.getElementById("task");
  const descInput = document.getElementById("desc");
  const dateInput = document.getElementById("duedate");

  const task = taskInput.value.trim();
  const desc = descInput.value.trim();
  const date = dateInput.value;

  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    text: task,
    description: desc,
    duedate: date,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  updateList();

  taskInput.value = "";
  descInput.value = "";
  dateInput.value = "";
}

function renderTask(task, index) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  if (task.completed) {
    li.classList.add("completed");
  }

  const taskTitle = document.createElement("strong");
  taskTitle.textContent = task.text;
  li.appendChild(taskTitle);

  if (task.description) {
    const desc = document.createElement("p");
    desc.textContent = task.description;
    li.append(desc);
  }

  if (task.duedate) {
    const due = document.createElement("b");
    due.textContent = "Due: " + task.duedate;
    li.append(due);
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = function (event) {
    event.stopPropagation();
    const newText = prompt("Edit task title:", task.text);
    const newDesc = prompt("Edit task description:", task.description);
    const newDue = prompt("Edit due date (YYYY-MM-DD):", task.duedate);
    if (newText !== null && newText.trim() !== "") {
      tasks[index].text = newText.trim();
      if (newDesc !== null) {
        tasks[index].description = newDesc.trim();
      }
      if (newDue !== null) {
        tasks[index].duedate = newDue.trim();
      }
      saveTasks();
      updateList();
    }
  };
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function (event) {
    event.stopPropagation();
    tasks.splice(index, 1);
    saveTasks();
    updateList();
  };
  li.appendChild(deleteBtn);

  li.onclick = function () {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    updateList();
  };
  taskList.appendChild(li);
}