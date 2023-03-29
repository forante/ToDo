const taskForm = document.querySelector(".task__form"),
  taskInput = document.querySelector(".task__input"),
  taskButton = document.querySelector(".task__btn"),
  taskList = document.querySelector(".task__list");

let taskArr = [];

if (localStorage.getItem("ToDo")) {
  let storageArr = JSON.parse(localStorage.getItem("ToDo"));
  storageArr.forEach((elem) => {
    const taskDone = elem.done ? "task__item done" : "task__item";

    const newBlock = `<li id='${elem.id}' class="${taskDone}">${elem.task}
      <img src="./img/delete.svg" alt="" class="delete__icon icon">
      <img src="./img/done.svg" alt="" class="done__icon icon">
      <hr class="task__line"/>
      </li>`;
    taskList.insertAdjacentHTML("beforeend", newBlock);
  });
  taskArr = storageArr;
  saveToLocalStorage();
}

taskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

taskList.addEventListener("click", (e) => {
  doneTask(e);
});

taskList.addEventListener("click", (e) => {
  deleteTask(e);
});

function addTask() {
  if (taskInput.value == "") return;
  const newTask = taskInput.value;

  const taskObj = {
    id: Date.now(),
    task: newTask,
    done: false,
  };

  taskArr.push(taskObj);

  const taskDone = taskObj.done ? "task__item done" : "task__item";

  const newBlock = `<li id='${taskObj.id}' class="${taskDone}">${newTask}
      <img src="./img/delete.svg" alt="" class="delete__icon icon">
      <img src="./img/done.svg" alt="" class="done__icon icon">
      <hr class="task__line"/>
      </li>`;
  taskList.insertAdjacentHTML("beforeend", newBlock);

  saveToLocalStorage();

  taskInput.value = "";
}

function doneTask(e) {
  if (e.target.classList.contains("done__icon")) {
    const parentNode = e.target.closest(".task__item");
    parentNode.classList.toggle("done");

    taskArr.find((elem) => {
      if (parentNode.id == elem.id) {
        elem.done = !elem.done;
      }
    });
  }
  saveToLocalStorage();
}

function deleteTask(e) {
  if (e.target.classList.contains("delete__icon")) {
    const parentNode = e.target.closest(".task__item");
    taskArr = taskArr.filter((elem) => parentNode.id != elem.id);
    parentNode.remove();
  }
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("ToDo", JSON.stringify(taskArr));
}
