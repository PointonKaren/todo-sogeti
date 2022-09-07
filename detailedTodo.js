const urlPage = document.location.href;
const url = new URL(urlPage);
const id = url.searchParams.get("id");
const yearSpan = document.getElementById("year");

let text = document.getElementById("text");
let description = document.getElementById("description");
let error = document.getElementById("error");
let content = document.querySelector(".detailed-content");
/**
 * Récupération des données du local storage
 */
let localStorageItems = JSON.parse(localStorage.getItem("todosLS"));

/**
 * Affichage dynamique du titre et de la description du TODO consulté
 */
for (item of localStorageItems) {
  let localStorageId = item.id;
  if (localStorageId == id) {
    text.textContent = item.text;
    content.removeChild(error);
    if (item.description == undefined) {
      description.textContent = "Aucune description n'a été précisée";
    } else {
      description.textContent = item.description;
    }
  } else {
    console.log("L'id du local storage diffère de l'id du ToDo");
  }
}

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
