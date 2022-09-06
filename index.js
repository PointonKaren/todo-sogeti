const form = document.querySelector(".todoForm");
const list = document.querySelector("#todoList");

let todoItems = [
  { text: "Tâche A", description: undefined, checked: false, id: 0 },
  { text: "Tâche B", description: "Une jolie description", checked: true, id: 1 },
  { text: "Tâche C", description: "42", checked: false, id: 2 },
  { text: "Tâche D", description: undefined, checked: true, id: 3 },
];

const renderTodo = (todo) => {
  localStorage.setItem("todosLS", JSON.stringify(todoItems));
  const item = document.querySelector(`[data-key='${todo.id}']`);
  const isChecked = todo.checked ? "done" : "";
  const li = document.createElement("li");
  li.setAttribute("class", `todo-item ${isChecked}`);
  li.setAttribute("data-key", todo.id);
  li.innerHTML = `
     <input id="${todo.id}" type="checkbox"/>
     <label for="${todo.id}" class="tick js-tick"></label>
     <span>${todo.text}</span>
     <a href="./detailedTodo.html?id=${todo.id}" target="_blank"><button>...</button></a>
   `;
  // if/else qui évite que le ToDo soit dupliqué au check
  if (item) {
    list.replaceChild(li, item);
  } else {
    list.append(li);
  }
};

// Ecoute du clic sur la "checkbox" et action sur le ToDo lié
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    item = event.target.parentElement;
    const itemKey = item.dataset.key;
    toggleDone(itemKey);
  }
  todoItems.sort((a, b) => a.checked - b.checked);
});

/**
 * Fonction qui gère ce qui se passe pour le ToDo lorsqu'il est coché
 * @param {Number} key
 */
function toggleDone(key) {
  index = todoItems.findIndex((item) => item.id === Number(key));
  let todoItem = todoItems[index];
  todoItem.checked = !todoItem.checked;
  renderTodo(todoItem);
}
/**
 * Récupération des données stockées dans le local storage
 */
document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todosLS");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});

/**
 * Fonction pour ajouter un TODO
 * @param {String} text
 */
const addTodo = (text, description) => {
  const todo = {
    text,
    description,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
};

/**
 * Actions à effectuer lorsque le formulaire est soumis
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputText = document.querySelector(".todoText");
  const inputDescription = document.querySelector(".todoDescription");
  const text = inputText.value.trim();
  const description = inputDescription.value.trim();
  if (text !== "" && description == "") {
    addTodo(text);
  } else if (text !== "" && description !== "") {
    addTodo(text, description);
  }
});
