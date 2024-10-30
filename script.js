document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.getElementById('addTaskBtn').addEventListener('click', () => {
        openAddTaskModal();
    });
});

function loadTasks() {
    // Fetch tasks from backend and render them
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            tasks.sort((a, b) => a.ordem - b.ordem).forEach(task => {
                const li = document.createElement('li');
                li.className = task.custo >= 1000 ? 'high-cost' : '';
                li.innerHTML = `
                    ${task.nome} - R$ ${task.custo.toFixed(2)} - ${task.dataLimite}
                    <button onclick="editTask(${task.id})">✏️</button>
                    <button onclick="deleteTask(${task.id})">🗑️</button>
                `;
                taskList.appendChild(li);
            });
        });
}

function openAddTaskModal() {
    // Implement modal to add task
}

function editTask(id) {
    // Implement edit functionality
}

function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        fetch(`/api/tasks/${id}`, { method: 'DELETE' })
            .then(() => loadTasks());
    }
}
