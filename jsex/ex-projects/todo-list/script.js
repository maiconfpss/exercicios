const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const totalCount = document.getElementById('total-count');
const doneCount = document.getElementById('done-count');

addBtn.addEventListener('click', addTask);

function addTask() {
    const texto = taskInput.value;
    if (texto === '') return;
    createTaskItem(texto);
    taskInput.value = '';
    updateCounters();
    updateEmptyState();

}

function createTaskItem(texto) {
    const li = document.createElement('li')
    li.classList.add('task-item');
    li.innerHTML = `
        <button class="task-check" onclick="toggleDone(this)"></button>
        <span class="task-text">${texto}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>

    `;
    taskList.appendChild(li);
}

function toggleDone(botao) {
    const li = botao.parentElement;
    li.classList.toggle('done');
    if (li.classList.contains('done')) {
        botao.textContent = '✓';
    }
    else {
        botao.textContent = '';
    }
    updateCounters();
}

function deleteTask(botao) {
    const li = botao.parentElement;
    li.remove();
    updateCounters();
    updateEmptyState();
}

function updateCounters() {
    const total = taskList.querySelectorAll('.task-item').length;
    const done = taskList.querySelectorAll('.task-item.done').length;

    totalCount.textContent = `${total} tarefas`;
    doneCount.textContent = `${done} concluídas`;
}

function updateEmptyState() {
    const total = taskList.querySelectorAll('.task-item').length;
    if (total === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}