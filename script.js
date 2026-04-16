function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if(task === "") return;

  let li = document.createElement("li");
// create checkbox
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

// create task text
let span = document.createElement("span");
span.textContent = task;

// strike through when checked
checkbox.onclick = function(){
  span.style.textDecoration = checkbox.checked ?
  "line-through" : "none";
};

// create delete button
let deleteBtn = document.createElement("button");
deleteBtn.textContent = "❌";
deleteBtn.onclick = function(){
  li.remove();
}

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(deleteBtn);


  document.getElementById("taskList").appendChild(li);

  input.value = "";
}