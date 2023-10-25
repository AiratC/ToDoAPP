
// Tasks APP
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskOutputText = `
            <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                <span class=${cssClass}>${task.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>
    `

    tasksList.insertAdjacentHTML('beforeend', taskOutputText);
})

checkEmptyList();

// Добавление задачи
form.addEventListener('submit', addTask);
// Удаление задачи
tasksList.addEventListener('click', deleteTask);
// Выполнение задачи
tasksList.addEventListener('click', doneTask);


// Функция добавление задачи
function addTask(event) {
    event.preventDefault();
    
    const taskOutput = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskOutput,
        done: false,
    };

    tasks.push(newTask);

    saveToLocalStorage();

    const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

    const taskOutputText = `
            <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                <span class=${cssClass}>${newTask.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>
    `

    tasksList.insertAdjacentHTML('beforeend', taskOutputText);
    taskInput.value = "";
    taskInput.focus();

    checkEmptyList();


};

// Функция удаления задачи
function deleteTask(event) {
    if(event.target.dataset.action !== 'delete') {
        return
       
    };

    const parentNode = event.target.closest('.list-group-item');

    // Определяем ID задачи
    const id = Number(parentNode.id);
    

    const index = tasks.findIndex(function(element) {

        if (element.id === id) {
            return true;
        }
    });

    // Удаляем задачу из массива с задачами
    tasks.splice(index, 1);
    parentNode.remove();

    saveToLocalStorage();

    checkEmptyList()

};

// Функция выполнения задачи
function doneTask(event) {
    if(event.target.dataset.action !== "done") {
        return
    };

    const parentNode = event.target.closest('.list-group-item');
    const span = parentNode.querySelector('.task-title');
    span.classList.add('task-title--done');
    

    const id = Number(parentNode.id);

    const task = tasks.find(function(element) {
        if (element.id === id) {
            return true;
        }
    });

    task.done = !task.done;
    saveToLocalStorage();

    

};


function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">Список дел пуст</div>
        </li>
        `

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    };

    if (tasks.length > 0) {
        const emptyListEL = document.querySelector('#emptyList');
        emptyListEL ? emptyListEL.remove() : null ;
    }
};

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}