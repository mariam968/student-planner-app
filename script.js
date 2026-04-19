// load tasks on page openoning
window.onload = function(){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTask(task.text, task.done, task.date, task.category);
  });
};

function addTask() {
  let input = document.getElementById("taskInput");
  let date = document.getElementById("taskDate").value;
  let category = document.getElementById("taskCategory").value;

  let task = input.value;

  if(task === "") return;

  createTask(task, false, date, category);
  saveTasks();

  input.value = "";
}

function createTask(taskText, isDone, date, category) {
  let li = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isDone;

  let span = document.createElement("span");
  span.textContent = taskText + "|" + date + "|" + category;

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
    let textParts = li.querySelector("span").textContent.split("|");
    

    tasks.push({ 
      text: textParts[0],
      date: textParts[1],
      category: textParts[2], 
      done:li.querySelector("input").checked
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}