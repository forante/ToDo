const taskForm = document.querySelector(".task__form"),
  taskInput = document.querySelector(".task__input"),
  taskButton = document.querySelector(".task__btn"),
  taskList = document.querySelector(".task__list"),
  taskItem = document.querySelector(".task__item"),
  doneButton = document.querySelector(".done__icon");

let taskArr = [];

taskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("done__icon")) {
    const parentNode = e.target.closest(".task__item");
    parentNode.classList.toggle("done");

    localStorage.setItem("ToDo", JSON.stringify(taskArr));

    taskArr.find((elem) => {
      if (parentNode.id == elem.id) {
        elem.done = !elem.done;
      }
    });
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete__icon")) {
    const parentNode = e.target.closest(".task__item");
    taskArr = taskArr.filter((elem) => parentNode.id != elem.id);
    parentNode.remove();
    localStorage.setItem("ToDo", JSON.stringify(taskArr));
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   console;
//   getSrorage();
// });

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

  localStorage.setItem("ToDo", JSON.stringify(taskArr));

  taskInput.value = "";
}

// function getSrorage() {
//   const Arr = localStorage.getItem("ToDo");
//   console.log(JSON.parse(Arr));
//   const taskArrStorage = [];
//   if (JSON.parse(Arr) != null) {
//     taskArrStorage = JSON.parse(Arr);
//   }
// }
