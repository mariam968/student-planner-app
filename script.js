// kload everything when page opens
window.onload = function(){
  loadTasks();
  loadSales();
  updateTotal();
};

// Add new task
function addTask(){
  let input = document.getElementById("taskInput");
  let date = document.getElementById("taskDate").value;
  let category = document.getElementById("taskCategory").value;

  let task = input.value;

  if(task === " ") return;

  createTask(task, false, date, category);
  saveTasks();

  input.value = " ";
}

// create task element
function createTask(taskText, isDone, date, category){
  let li = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isDone;

  let span = document.createElement("span");
  span.textContent = taskText + " | " + date + " | " + category;

  if(isDone){
    span.style.textDecoration = "line-through;"
  }

  checkbox.onclick = function(){
    span.style.textDecoration = checkbox.checked? "line-through": "none";
    saveTasks();
  };

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

// save tasks
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#tasklist li").forEach(li => {
    let parts = li.querySelector("span").textContent.split(" | ");
  

    tasks.push({
      text: parts[0],
      date: parts[1],
      category: parts[2],
      done: li.querySelector("input").checked

    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

  // load tasks
  function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
      createTask(task.text, task.done, task.date, task.category);
    });
  }

  // SALES
  // Add sales
  function addSale(){
    let product = document.getElementById("productInput").value;
    let price = document.getElementById("priceInput").value;

    if(product === " " || price === " ")return;


    let li = document.createElement("li");
    li.textContent = product + " - " + price ;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.onclick = function(){
      li.remove();
      updateTotal();
      saveSales();
    }

    li.appendChild(deleteBtn);

    document.getElementById("salesList").appendChild(li);

    updateTotal();
    saveSales();

    document.getElementById("productInput").value = " ";
    document.getElementById("priceInput").value = " ";
  }

  // Update total
  function updateTotal(){
    let total = 0;

    document.querySelectorAll("#salesList li").forEach(item => {
      let text = item.textContent;
      let price = text.match(/\d+/);

      if(price) total += Number(price[0]);
    });

    document.getElementById("totalAmount").textContent = "UGX " + total;
  }


  // Save sales
  function saveSales(){
    let sales = [];

    document.querySelectorAll("#salesList li").forEach(item => {
      let text = item.textContent;
      let parts = text.split(" - ");

      sales.push({
        product: parts[0],
        price: parts[1]
      });
    });

    localStorage.setItem("sales".JSON.stringify(sales));
  }

  // load sales
  function loadSales(){
    let sales = JSON.parse(localStorage.getItem("sales")) || [];

    sales.forEach(sale => {
      let li = document.createElement("li");
      li.textContent = sale.product + " - " + sale.price;

      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";

      deleteBtn.onclick = function(){
        li.remove();
        updateTotal();
        saveSales();
      };

      li.appendChild(deleteBtn);
      document.getElementById("salesList").appendChild(li);
    });
  }
