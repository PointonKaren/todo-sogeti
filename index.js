const form = document.querySelector("#todoForm");
const list = document.querySelector("#todoList");
const yearSpan = document.getElementById("year");

let totalTodos = document.querySelector(".numberOfTodos");
let totalChecked = document.querySelector(".numberOfChecked");
let todoItems = [
  { text: "Tâche A", description: undefined, checked: false, id: 0 },
  { text: "Tâche B", description: "Une jolie description", checked: true, id: 1 },
  { text: "Tâche C", description: "42", checked: false, id: 2 },
  { text: "Tâche D", description: undefined, checked: true, id: 3 },
];

/**
 * Fonction qui calcule combien il y a de ToDos dans la liste
 */
const numberOfTodos = () => {
  if (todoItems.length === 1) {
    totalTodos.textContent = `Il y a 1 tâche dans la liste`;
  } else if (todoItems.length > 1) {
    totalTodos.textContent = `Il y a ${todoItems.length} tâches dans la liste`;
  } else if (todoItems.length === 0) {
    totalTodos.textContent = "Il n'y a aucune tâche dans la liste.";
  }
};
/**
 * Affichage du nombre de tâches cochées
 */
const numberOfChecked = () => {
  let isChecked = 0;
  for (item of todoItems) {
    if (item.checked) {
      isChecked++;
    }
  }
  if (isChecked === 0) {
    if (todoItems.length === 0) {
      totalChecked.textContent = "";
    } else if (todoItems.length === 1) {
      totalChecked.textContent = "mais elle n'est pas cochée.";
    } else if (todoItems.length > 1) {
      totalChecked.textContent = "mais aucune n'a été cochée.";
    }
  } else if (isChecked === 1) {
    if (todoItems.length === 0) {
      console.log("C'est impossible, il y a une erreur.");
    } else if (todoItems.length === 1) {
      totalChecked.textContent = "qui est cochée.";
    } else if (todoItems.length > 1) {
      totalChecked.textContent = "dont 1 cochée.";
    }
  } else if (isChecked > 1 && todoItems.length > 1 && isChecked != todoItems.length) {
    totalChecked.textContent = `dont ${isChecked} cochées.`;
  } else if (isChecked > 1 && todoItems.length > 1 && isChecked === todoItems.length) {
    totalChecked.textContent = `qui sont toutes cochées.`;
  } else {
    console.log("Ce n'est pas possible, il y a une erreur !");
  }
};

/**
 * Fonction qui gère le contenu du DOM en fonction du tableau todoItems
 * @param {Object} todo
 * @returns
 */
const renderTodo = (todo) => {
  // Met à jour le local storage suivant le contenu de todoItems à chaque appel de la fonction
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
     <a href="./detailedTodo.html?id=${todo.id}" target="_blank" title="Détail du ToDo"><span class="detail-button">🔍</span></a>
     <button class="delete">✕</button>
     `;

  // Supprime l'élément du DOM :
  if (todo.deleted) {
    item.remove();
    return;
  }
  // if/else qui évite que le ToDo soit dupliqué au check
  if (item) {
    list.replaceChild(li, item);
  } else {
    list.append(li);
  }
};

/**
 * Ecoute du clic sur un élément d'un ToDo et action sur le ToDo lié
 */
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    item = event.target.parentElement;
    const itemKey = item.dataset.key;
    toggleDone(itemKey);
  }
  if (event.target.classList.contains("delete")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
  todoItems.sort((a, b) => a.checked - b.checked);
});

/**
 * Fonction qui gère ce qui se passe pour le ToDo lorsqu'il est coché
 * @param {Number} key
 */
const toggleDone = (key) => {
  index = todoItems.findIndex((item) => item.id === Number(key));
  let todoItem = todoItems[index];
  todoItem.checked = !todoItem.checked;
  renderTodo(todoItem);
  numberOfChecked();
};

/**
 * Fonction qui permet de supprimer l'item du tableau todoItems
 * @param {Number} key
 */
const deleteTodo = (key) => {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
  numberOfTodos();
  numberOfChecked();
};

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
  numberOfTodos();
  numberOfChecked();
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
  inputText.value = "";
  inputDescription.value = "";
});

/**
 * Année automatique dans le footer
 */
const yearCalc = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const yearParsed = parseInt(year);
  yearSpan.textContent = `${yearParsed}`;
};

yearCalc();
numberOfTodos();
numberOfChecked();
