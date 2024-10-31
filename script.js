let tasks = [];
let editingTaskId = null; // Variável para rastrear o ID da tarefa sendo editada
let draggedTaskId = null; // Variável para rastrear o ID da tarefa sendo arrastada

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  
  // Ordena e exibe as tarefas com suporte a arrastar e soltar
  tasks.sort((a, b) => a.order - b.order).forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.draggable = true; // Habilita o recurso de arrastar
    taskItem.dataset.id = task.id; // Define o ID como um atributo de dados para rastreamento
    
    // Eventos de arrastar e soltar
    taskItem.addEventListener("dragstart", handleDragStart);
    taskItem.addEventListener("dragover", handleDragOver);
    taskItem.addEventListener("drop", handleDrop);
    taskItem.addEventListener("dragend", handleDragEnd);

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
    const task = tasks.find(task => task.id === editingTaskId);
    task.name = taskName;
    task.cost = taskCost;
    task.date = taskDate;
    task.order = parseInt(taskOrder);
    editingTaskId = null;
  } else {
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
  
  editingTaskId = id;
}

/* Funções para arrastar e soltar */

function handleDragStart(event) {
  draggedTaskId = event.target.dataset.id; // Armazena o ID da tarefa sendo arrastada
  event.target.classList.add("dragged"); // Adiciona a classe para feedback visual
}

function handleDragOver(event) {
  event.preventDefault(); // Permite o evento de soltar
  event.target.classList.add("over"); // Adiciona uma borda visual para o item de destino
}

function handleDrop(event) {
  event.preventDefault();
  const targetId = event.target.closest(".task-item").dataset.id; // Obtém o ID do item onde foi solto
  const draggedTaskIndex = tasks.findIndex(task => task.id == draggedTaskId);
  const targetTaskIndex = tasks.findIndex(task => task.id == targetId);

  // Reordena as tarefas no array
  const [draggedTask] = tasks.splice(draggedTaskIndex, 1);
  tasks.splice(targetTaskIndex, 0, draggedTask);

  // Atualiza a propriedade de ordem
  tasks.forEach((task, index) => (task.order = index + 1));

  renderTasks(); // Atualiza a exibição
}

function handleDragEnd(event) {
  event.target.classList.remove("dragged"); // Remove a classe de opacidade
  document.querySelectorAll(".task-item").forEach(item => item.classList.remove("over")); // Remove bordas
}
