let tasks = [];
let editingTaskId = null; // Variável para rastrear o ID da tarefa sendo editada

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

  if (editingTaskId) {
    // Se estamos editando, encontre e atualize a tarefa existente
    const task = tasks.find(task => task.id === editingTaskId);
    task.name = taskName;
    task.cost = taskCost;
    task.date = taskDate;
    task.order = parseInt(taskOrder);
    editingTaskId = null; // Limpa o ID de edição
  } else {
    // Se não estamos editando, adicione uma nova tarefa
    const id = Date.now();
    const task = { id, name: taskName, cost: taskCost, date: taskDate, order: parseInt(taskOrder) };
    tasks.push(task);
  }

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
  
  editingTaskId = id; // Define o ID da tarefa que está sendo editada
}
