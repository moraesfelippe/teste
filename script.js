let tasks = [];
let editingTaskId = null;

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.sort((a, b) => a.order - b.order).forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.cost >= 1000 ? "highlight" : ""}`;
    taskItem.innerHTML = `
      <span><strong>${task.name}</strong> - R$${task.cost} - ${task.date}</span>
      <div>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="confirmDelete(${task.id})">🗑️</button>
        <button onclick="moveTaskUp(${index})" ${index === 0 ? "disabled" : ""}>▲</button>
        <button onclick="moveTaskDown(${index})" ${index === tasks.length - 1 ? "disabled" : ""}>▼</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function openAddTaskForm() {
  editingTaskId = null;
  document.getElementById("formTitle").innerText = "Incluir Tarefa";
  document.getElementById("taskFormContainer").classList.remove("hidden");
  document.getElementById("taskName").value = "";
  document.getElementById("taskCost").value = "";
  document.getElementById("taskDate").value = "";
}

function closeTaskForm() {
  document.getElementById("taskFormContainer").classList.add("hidden");
}

function saveTask() {
  const name = document.getElementById("taskName").value;
  const cost = parseFloat(document.getElementById("taskCost").value);
  const date = document.getElementById("taskDate").value;

  if (editingTaskId) {
    const task = tasks.find(task => task.id === editingTaskId);
    if (tasks.some(t => t.name === name && t.id !== editingTaskId)) {
      alert("Já existe uma tarefa com esse nome.");
      return;
    }
    task.name = name;
    task.cost = cost;
    task.date = date;
  } else {
    if (tasks.some(t => t.name === name)) {
      alert("Já existe uma tarefa com esse nome.");
      return;
    }
    const id = Date.now();
    const order = tasks.length + 1;
    tasks.push({ id, name, cost, date, order });
  }

  renderTasks();
  closeTaskForm();
}

function confirmDelete(id) {
  if (confirm("Deseja realmente excluir esta tarefa?")) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  document.getElementById("formTitle").innerText = "Editar Tarefa";
  document.getElementById("taskName").value = task.name;
  document.getElementById("taskCost").value = task.cost;
  document.getElementById("taskDate").value = task.date;
  document.getElementById("taskFormContainer").classList.remove("hidden");
  editingTaskId = id;
}

function moveTaskUp(index) {
  if (index > 0) {
    [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
    tasks.forEach((task, i) => (task.order = i + 1));
    renderTasks();
  }
}

function moveTaskDown(index) {
  if (index < tasks.length - 1) {
    [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    tasks.forEach((task, i) => (task.order = i + 1));
    renderTasks();
  }
}
