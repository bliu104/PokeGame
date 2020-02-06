const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const pokeInput = document.querySelector("input");
const butt = document.querySelector("button");

let pokeGet;

pokeGet = async function() {
  const poke = pokeInput.value;
  let response = await axios.get(`${BASE_URL}${poke}`);
  pokeData(response);
  pokeStat(response);
  pokePic(response);
  moves(response);
};

function pokeData(response) {
  const pokeData = response;
  let name = pokeData.data.forms[0].name;
  let pokeID = pokeData.data.id;
  document.querySelector(
    ".Pokemon_info"
  ).innerHTML = `<div> ${name} #${pokeID}</div>`;
  console.log(response);
}
function pokePic(response) {
  const pokeData = response;
  let imagePokeFront = pokeData.data.sprites.front_default;
  // let imagePokeBack = pokeData.data.sprites.back_default;
  // let imagePokeShiny = pokeData.data.sprites.front_shiny;
  // let imagePokeBackShiny = pokeData.data.sprites.back_shiny;
  document.querySelector(
    ".PokePics"
  ).innerHTML = `<img src = ${imagePokeFront}>`;
}

function pokeStat(response) {
  const pokeData = response;
  let health = pokeData.data.stats[5].base_stat;
  let defense = pokeData.data.stats[3].base_stat;
  let attack = pokeData.data.stats[4].base_stat;
  let specialAttack = pokeData.data.stats[2].base_stat;
  let specialDefense = pokeData.data.stats[1].base_stat;
  let speed = pokeData.data.stats[0].base_stat;
  document.querySelector(
    ".Pokemon_stat"
  ).innerHTML = `<div>Health: ${health}</div><div>Attack: ${attack}</div><div>Defense: ${defense}</div><div>Special Attack: ${specialAttack}</div><div>Special Defense: ${specialDefense}</div><div>Speed: ${speed}</div>`;
}
function moves(response) {
  const pokeData = response.data.moves;
  let i = 0;
  while (i < pokeData.length) {
    moves = pokeData[i].move.name;
    document.querySelector("#moveSet").innerHTML += `<li>${moves}</li>`;
    i++;
  }
}

// function allPokemon(response) {
//   const pokeData = response;
//   let name = pokeData.data.forms[0].name;
//   let pokeID = pokeData.data.id;
//   let imagePokeFront = pokeData.data.sprites.front_default;
//   let typing =
// }
butt.addEventListener("click", pokeGet);
