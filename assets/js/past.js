
import { newCardPast, fillCardPast, addCategory, createCategory, filterSearch, addSearchPast, filterChecks  } from "./modules/functions.js"

let api = "https://mindhub-xj03.onrender.com/api/amazing";

const containerCard = document.querySelector("#cards-container");
const cardsContainer = document.getElementById("cards-container");
const checksContainer = document.getElementById("categories");
const inputSearch = document.querySelector("#inputSearch");
const checks = document.getElementById("categories");

async function fetchData() {
  try{

    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
 
    const eventsCategories = data.events.map((evento) => evento.category);
    const catNoRepeat = [...new Set(eventsCategories)];
    const list = data.events.filter(event => event.date < data.currentDate)
    const filterPastEvents = data.events.filter(event => event.date < data.currentDate)   

    newCardPast(filterPastEvents, cardsContainer);
    addCategory(catNoRepeat, checksContainer);
    filterSearch(filterPastEvents, containerCard)
    addSearchPast(filterPastEvents, containerCard)

    
inputSearch.addEventListener("keyup", () => {
  const filteredByCheck = filterChecks(filterPastEvents);
  const filteredBySearch = filterSearch(filteredByCheck, containerCard);
  addSearchPast(filteredBySearch, containerCard);
});

checks.addEventListener("change", (e) => {
  const filteredByCheck = filterChecks(filterPastEvents);
  const filteredBySearch = filterSearch(filteredByCheck, containerCard);
  addSearchPast(filteredBySearch, containerCard);
});
  }
  catch (error) {
    console.log(`The error is`, error);
  }
}

fetchData();








