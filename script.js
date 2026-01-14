let data = JSON.parse(localStorage.getItem("todo")) || [];

function add() {
  let taskInput = document.getElementById("task");
  let task = taskInput.value.trim();

  if (task === "") {
    alert("Task cannot be empty");
    return;
  }

  data.push({ text: task, completed: false });
  localStorage.setItem("todo", JSON.stringify(data));
  taskInput.value = "";
  render();
}

function toggle(i) {
  data[i].completed = !data[i].completed;
  localStorage.setItem("todo", JSON.stringify(data));
  render();
}

function editTask(i) {
  let newTask = prompt("Edit task", data[i].text);
  if (newTask !== null && newTask.trim() !== "") {
    data[i].text = newTask;
    localStorage.setItem("todo", JSON.stringify(data));
    render();
  }
}

function del(i) {
  data.splice(i, 1);
  localStorage.setItem("todo", JSON.stringify(data));
  render();
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((t, i) => {
    list.innerHTML += `
      <li>
        <input type="checkbox" ${t.completed ? "checked" : ""} onclick="toggle(${i})">
        <span style="flex:1; margin-left:10px; text-decoration:${t.completed ? "line-through" : "none"}">
          ${t.text}
        </span>
        <button onclick="editTask(${i})">Edit</button>
        <button onclick="del(${i})">Delete</button>
      </li>
    `;
  });
}

render();
