/**
  * Fetch and display Star Wars character data.
  */

let currentPage = 1;

// set the new page number
function setPage(newPage) {
  if (newPage < 1) {
    return;
  }

  currentPage = newPage;
  document.getElementById("page").innerText = newPage.toString();
}

// simple, naive json fetching
async function fetchJsonData(url) {
  let response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}

async function fetchCharacters() {
  // show loading spinner
  startLoading();

  // get data
  const data = await fetchJsonData("https://swapi.dev/api/people/?page=" + currentPage.toString())

  let rows = [];
  data.results.forEach(character => {
    let row = document.createElement("tr");

    let name = document.createElement("td");
    name.textContent = character.name;
    row.appendChild(name);

    let year = document.createElement("td");
    year.textContent = character.birth_year;
    row.appendChild(year);

    rows.push(row)
  });

  document.getElementById("character-data").replaceChildren(...rows);

  // show data
  document.getElementById("loading").classList.add('hidden')
  document.getElementById("character-table").classList.remove('hidden')
}

async function fetchPlanets() {
  // show loading spinner
  startLoading();

  // get data
  const data = await fetchJsonData("https://swapi.dev/api/planets/?page=" + currentPage.toString())

  let rows = [];
  data.results.forEach(planet => {
    let row = document.createElement("tr");

    let name = document.createElement("td");
    name.textContent = planet.name;
    row.appendChild(name);

    let orbital_period = document.createElement("td");
    orbital_period.textContent = planet.orbital_period;
    row.appendChild(orbital_period);

    rows.push(row)
  });

  document.getElementById("planet-data").replaceChildren(...rows);

  // show data
  document.getElementById("loading").classList.add('hidden')
  document.getElementById("planet-table").classList.remove('hidden')
}

function startLoading() {
  document.getElementById("loading").classList.remove('hidden')
  document.getElementById("character-table").classList.add('hidden')
  document.getElementById("planet-table").classList.add('hidden')
}
