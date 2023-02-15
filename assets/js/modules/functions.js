export function newCard(list, element) {
  element.innerHTML = "";
  let fill = "";
  for (let event of list) {
    fill += fillCard(event);
  }
  element.innerHTML += fill;
}
export function newCardUp(list, element) {
  element.innerHTML = "";
  let fill = "";
  for (let event of list) {
    fill += fillCardUp(event);
  }
  element.innerHTML += fill;
}
export function newCardPast(list, element) {
  element.innerHTML = "";
  let fill = "";
  for (let event of list) {
    fill += fillCardPast(event);
  }
  element.innerHTML += fill;
}
export function fillCard(event) {
  return `<div class="card1">
  <img src="${event.image}" alt="${event.name}" class="card-img1">
  <h5 class="festival-title">${event.name}</h5>
  <div class="text-container">
    <p>${event.description}</p>
  </div>
  <div class="footer-card">
    <h5 class="price">Price: $${event.price}</h5>
    <a href="../Details.html?id=${event._id}" class="btn-details">Details</a>
  </div>
</div>`;
}
export function fillCardUp(event) {
  return `<div class="card1">
  <img src="${event.image}" alt="${event.name}" class="card-img1">
  <h5 class="festival-title">${event.name}</h5>
  <div class="text-container">
    <p>${event.description}</p>
  </div>
  <div class="footer-card">
    <h5 class="price">Price: $${event.price}</h5>
    <a href="../Details.html?id=${event._id}" class="btn-details">Details</a>
  </div>
</div>`;
}
export function fillCardPast(event) {
  return `<div class="card1">
  <img src="${event.image}" alt="${event.name}" class="card-img1">
  <h5 class="festival-title">${event.name}</h5>
  <div class="text-container">
    <p>${event.description}</p>
  </div>
  <div class="footer-card">
    <h5 class="price">Price: $${event.price}</h5>
    <a href="../Details.html?id=${event._id}" class="btn-details">Details</a>
  </div>
</div>`;
}
export function addCategory(list, element) {
  let fragment = document.createDocumentFragment();
  list.forEach((cate) => fragment.appendChild(createCategory(cate)));
  element.appendChild(fragment);
}
export function createCategory(cate) {
  let category = document.createElement(`div`);
  category.className = "checkbox";
  category.innerHTML = ` <label>
  <input type="checkbox" name="checkbox" value="${cate}" required>
 ${cate}
</label>`;
  return category;
}
export function filterSearch(list, container) {
  container.innerHTML = "";
  let text = inputSearch.value.toLowerCase();
  let events = [];
  for (let event of list) {
    let name = event.name.toLowerCase();
    if (name.includes(text)) events.push(event);
  }
  return events;
}
export function addSearch(list, container) {
  list.length == 0
    ? (container.innerHTML += `Adjust the filters to find the search!`)
    : newCard(list, container);
}
export function addSearchUp(list, container) {
  list.length == 0
    ? (container.innerHTML += `Adjust the filters to find the search!`)
    : newCardUp(list, container);
}
export function addSearchPast(list, container) {
  list.length == 0
    ? (container.innerHTML += `Adjust the filters to find the search!`)
    : newCardPast(list, container);
}
export function filterChecks(list) {
  const checkbox = document.querySelectorAll("input[name=checkbox]:checked");
  const checkboxArray = [...checkbox];
  const valueChecks = checkboxArray.map((e) => e.value);
  return valueChecks.length == 0
    ? list
    : list.filter((event) => valueChecks.includes(event.category));
}
export function detailCreate(event, container) {
  document.title = `${event.name} | Detail's`;

  container.innerHTML = ` <div class="details-img">
  <img src="${event.image}" class="img-details">
  </div>
  <div class="container-information">
  <ul>
    <li><b>Name:</b> ${event.name} </li>
    <li><b>Date:</b> ${event.date} </li>
    <li><b>Description:</b> ${event.description} </li>
    <li><b>Category:</b> ${event.category} </li>
    <li><b>Place:</b>  ${event.place}</li>
    <li><b>Capacity:</b> ${event.capacity}</li>
    <li>
    <b>
      ${event.assistance !== undefined ? "Assistance: " : "Estimate: "}
    </b>
    <span>
      ${event.assistance !== undefined ? event.assistance : event.estimate}
      
    </span>
    </li>
    <li><b>Price:</b>${event.price} </li>
    
  </ul>
  </div> `;
}

export function createTable(assistanceUp, assistanceM, capacityM) {
  return `<table>
  <thead>
  <tr class="title-stats">
  <th scope="col" colspan="3" class="title-table1">Event statistics</th>
  </tr>
  <tr>
  <th>Event with the highest persentage of attendance</th>
  <th>Event with the lowest percentage of attendance</th>
  <th>Event with larger capacity</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <th>${assistanceUp.name} ${(assistanceUp.assistance / assistanceUp.capacity * 100).toFixed(2)}%</th>
  <th>${assistanceM.name} ${(assistanceM.assistance / assistanceM.capacity * 100).toFixed(2)}%</th>
  <th>${capacityM.name} ${capacityM.capacity}</th>
  </tr>
  </tbody>
  </table>
  `
}
export function income(lists, noRepeat) {
  let income = [];
  for (let i = 0; i < noRepeat.length; i++) {
    let earn = 0;
    for (let list of lists) {
      if (list.category === noRepeat[i]) {
        if (list.estimate !== undefined) {
          earn += list.price * list.estimate
        } else {
          earn += list.price * list.assistance
        }
      }
    }
    income.push(earn);
  }
  return income;
} 
export function assistanceUp(lists, noRepeat) {
  let percentage=[]
  for(let i = 0; i < noRepeat.length; i++){
      let estimate = 0
      let capacityT = 0
      for(let list of lists){
          if (list.category === noRepeat[i]){
              capacityT += (list.capacity)
              estimate += (list.estimate)
          }
      }
      percentage.push(estimate / capacityT * 100)
  }
  return percentage
}


export function assistancePast(lists, noRepeat){
  let percentage=[]
  for(let i = 0; i < noRepeat.length; i++){
      let assistanceT = 0
      let capacityT = 0
      for(let list of lists){
          if (list.category === noRepeat[i]){
              capacityT += (list.capacity)
              assistanceT += (list.assistance)
          }
      }
      percentage.push(assistanceT / capacityT * 100)
  }
  return percentage
}
export function createTableStat(noRepeat, income, assistanceP) {
  let stat = statistics(noRepeat, income, assistanceP);

  return `
  <table>
  <thead>
  <tr class="title-stats">
  <th colspan="3">Upcoming events statistics by category</th>
  </tr>
  <tr>
  <th>Categories</th>
  <th>Revenues</th>
  <th>Persentage of attendance</th>
  </tr>
  </thead>
  <tbody>
  ${stat}
  </tbody
  </table>
  `
}
export function createTablePast(noRepeat, income, assistanceP) {
  let stat = statistics(noRepeat, income, assistanceP);

  return `<table>
  <thead>
  <tr class="title-stats">
    <th colspan="3">Past Events statistic by category</th>
  </tr>
  <tr>
    <th>Categories</th>
    <th>Revenues</th>
    <th>Percentage of attendance</th>
  </tr>
  </thead>
  <tbody>
  ${stat}
</tbody>
</table>`;
}
export function statistics(noRepeat, income, assistanceP) {
  let statistics = ""
  for(let i = 0; i < noRepeat.length; i++){
      statistics += `
      <tr>
      <td>${noRepeat[i]}</td>
      <td>$${income[i]}</td>
      <td>${assistanceP[i].toFixed(2)}%</td>
      </tr>
      `
  }
  return statistics
}
