import { newCardUp, fillCardUp, addCategory, createCategory, filterSearch, addSearchUp, filterChecks  } from "./modules/functions.js"

const cardsContainer = document.getElementById("cards-container");
const containerCard = document.querySelector("#cards-container");
const inputSearch = document.querySelector("#inputSearch");
const checks = document.getElementById("categories");
const checksContainer = document.getElementById("categories");

let api = "https://mindhub-xj03.onrender.com/api/amazing";

async function fetchData() {
  try{

    const apiResponse = await fetch(api)
    const data = await apiResponse.json()

    const filterPastEvents = data.events.filter(event => event.date > data.currentDate)
    const eventsCategories = data.events.map((evento) => evento.category);
    const catNoRepeat = [...new Set(eventsCategories)];
     
    newCardUp(filterPastEvents, cardsContainer);
    addCategory(catNoRepeat, checksContainer);
    filterSearch(filterPastEvents, containerCard)
    addSearchUp(filterPastEvents, containerCard)
 
    inputSearch.addEventListener("keyup", () => {
      const filteredByCheck = filterChecks(filterPastEvents);
      const filteredBySearch = filterSearch(filteredByCheck, containerCard);
      addSearchUp(filteredBySearch, containerCard);
    });
    
    checks.addEventListener("change", (e) => {
      const filteredByCheck = filterChecks(filterPastEvents);
      const filteredBySearch = filterSearch(filteredByCheck, containerCard);
      addSearchUp(filteredBySearch, containerCard);
    });
  }
  catch(error) {
    console.log(`The error is`, error);
  }
}

fetchData()
