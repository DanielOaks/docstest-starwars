/**
  * Fetch and display Star Wars character data.
  */
async function fetchCharacters() {
  let response = await fetch("https://swapi.dev/api/people/?page=1");
  const data = await response.json();

  var temp = "";
  data.results.forEach((character) => {
    temp += "<tr>";
    temp += "<td>" + character.name + "</td>";
    temp += "<td>" + character.birth_year + "</td>";
    temp += "</tr>";
  });
  document.getElementById("data").innerHTML = temp;
}
