/**
  * Fetch and display Star Wars character data.
  */

// simple, naive json fetching
async function fetchJsonData(url) {
  let response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}

async function fetchCharacters() {
  // show loading spinner
  startLoading();

  // get data from this endpoint
  const data = await fetchJsonData("https://swapi.dev/api/people/?page=1")

  // make the character table
  var temp = "";
  data.results.forEach((character) => {
    temp += "<tr>";
    temp += "<td>" + character.name + "</td>";
    temp += "<td>" + character.birth_year + "</td>";
    temp += "</tr>";
  });
  document.getElementById("character-data").innerHTML = temp;

  // show data
  document.getElementById("loading").classList.add('hidden')
  document.getElementById("character-table").classList.remove('hidden')
}

async function fetchPlanets() {
  // show loading spinner
  startLoading();

  // get data from this endpoint
  const data = await fetchJsonData("https://swapi.dev/api/planets/?page=1")

  // make the planets table
  var temp = "";
  data.results.forEach((planet) => {
    temp += "<tr>";
    temp += "<td>" + planet.name + "</td>";
    temp += "<td>" + planet.orbital_period + "</td>";
    temp += "</tr>";
  });
  document.getElementById("planet-data").innerHTML = temp;

  // show data
  document.getElementById("loading").classList.add('hidden')
  document.getElementById("planet-table").classList.remove('hidden')
}

function startLoading() {
  document.getElementById("loading").classList.remove('hidden')
  document.getElementById("character-table").classList.add('hidden')
  document.getElementById("planet-table").classList.add('hidden')
}
