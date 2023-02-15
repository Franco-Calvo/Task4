import { newCard, fillCard, addCategory, createCategory, filterSearch, addSearch, filterChecks } from "./modules/functions.js"

let api = "https://mindhub-xj03.onrender.com/api/amazing";

const cardsContainer = document.getElementById("cards-container");
const checks = document.getElementById("categories");
const checksContainer = document.getElementById("categories");
const containerCard = document.querySelector("#cards-container");

const inputSearch = document.querySelector("#inputSearch");

async function fetchData () {
  try{
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()

      const eventsCategories = data.events.map((evento) => evento.category);
      const catNoRepeat = [...new Set(eventsCategories)];    
 
      newCard(data.events, cardsContainer);
      addCategory(catNoRepeat, checksContainer);
      filterSearch(data.events, containerCard)
      addSearch(data.events, containerCard)

      inputSearch.addEventListener("keyup", () => {
        const filteredByCheck = filterChecks(data.events);
        const filteredBySearch = filterSearch(filteredByCheck, containerCard);
        addSearch(filteredBySearch, containerCard);
      });
      
      checks.addEventListener("change", () => {
        const filteredByCheck = filterChecks(data.events);
        const filteredBySearch = filterSearch(filteredByCheck, containerCard);
        addSearch(filteredBySearch, containerCard);
      });
  }
  catch(error){
    console.log(`The error is`, error);
  }
}

fetchData()








