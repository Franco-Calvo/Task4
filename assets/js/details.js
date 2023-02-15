import { detailCreate } from "./modules/functions.js";

let api = "https://mindhub-xj03.onrender.com/api/amazing";


const detalles = location.search;
const parametro = new URLSearchParams(detalles);
const nombre = parametro.get("id");


async function fetchData(){
  try{
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()

    const container = document.getElementById("container-details");
    const evento = data.events.find((evento) => evento._id == nombre);
    
    detailCreate(evento, container)
 

  }
  catch(error){
    console.log(`The error is`, error);
  } 
}

fetchData()


