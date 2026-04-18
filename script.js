// load tasks on page openoning
window.onload = function(){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.done));
};

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if(task === "") return;

  createTask(task, false);
  saveTasks();

  input.value = "";
}

function createTask(taskText, isDone) {
  let li = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isDone;

  let span = document.createElement("span");
  span.textContent = taskText;

  if(isDone) {
    span.style.textDecoration = "line-through";
  }

  checkbox.onclick = function(){
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    saveTasks();
  };


// create delete button
let deleteBtn = document.createElement("button");
deleteBtn.textContent = "❌";
deleteBtn.onclick = function(){
  li.remove();
  saveTasks();
};

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(deleteBtn);


  document.getElementById("taskList").appendChild(li);

}

function saveTasks(){
  let tasks = [];
  let listItems = document.querySelectorAll("#taskList li");

  listItems.forEach(li => {
    let text = li.querySelector("span").textContent;
    let done = li.querySelector("input").checked;

    tasks.push({ text: text, done: done});
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}