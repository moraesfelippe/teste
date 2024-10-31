let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.sort((a, b) => a.order - b.order).forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <div>
        <strong>${task.name}</strong> - R$${task.cost} - ${task.date} (Ordem: ${task.order})
      </div>
      <div>
        <button onclick="editTask(${task.id})">Editar</button>
        <button onclick="deleteTask(${task.id})">Excluir</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskName = document.getElementById("taskName").value;
  const taskCost = document.getElementById("taskCost").value;
  const taskDate = document.getElementById("taskDate").value;
  const taskOrder = document.getElementById("taskOrder").value;
  const id = Date.now();
  const task = { id, name: taskName, cost: taskCost, date: taskDate, order: parseInt(taskOrder) };

  tasks.push(task);
  renderTasks();
  document.getElementById("taskForm").reset();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  document.getElementById("taskName").value = task.name;
  document.getElementById("taskCost").value = task.cost;
  document.getElementById("taskDate").value = task.date;
  document.getElementById("taskOrder").value = task.order;
  
  deleteTask(id);
}
