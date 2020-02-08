const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const pokeInput = document.querySelector("input");
const butt = document.querySelector("#button1");

let pokeGet;

pokeGet = async function() {
  const poke = pokeInput.value;
  let response = await axios.get(`${BASE_URL}${poke}`);
  pokeData(response);
  pokeStat(response);
  pokePic(response);
  moves(response);
};

pokeCar = async function() {
  let i = 0;
  let num = 1;
  let response;
  while (i < 13) {
    response = await axios.get(`${BASE_URL}${num}`);
    imageCar(response);
    num++;
    i++;
  }
  carousel();
};

function randomPoke() {
  let randomNum = Math.floor(Math.random() * 800);
  return randomNum;
}
first = async function() {
  let i = 0;
  let response;
  let array = [];
  while (i < 9) {
    response = await axios.get(`${BASE_URL}${randomPoke()}`);
    array[i] = response;
    i++;
  }
  console.log(array);
};
first();

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

function imageCar(response) {
  document.querySelector(
    ".caousel_track"
  ).innerHTML += `<li class = 'carousel_slide'><img src = "${response.data.sprites.front_default}" class = "carousel_image"></li>`;
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
pokeCar();

//------------------- carousel----------------

const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");

function carousel() {
  const track = document.querySelector(".caousel_track");
  const slide = Array.from(track.children);
  const dotsNavs = document.querySelector(".carousel_nav");
  const dots = Array.from(dotsNavs.children);
  const slideSize = slide[0].getBoundingClientRect().width;
  console.log(slideSize);
  let i = 0;
  console.log(slide.length);
  while (i < slide.length) {
    slide[i].style.left = slideSize * i + "px";
    i++;
  }
}
let currentSlide;
let nextSlide;
let counter = 0;
let currentPosition = 0;
function buttonTrack() {
  currentSlide = document.querySelector(".caousel_track").children[2 + counter];
  nextSlide = currentSlide.nextElementSibling;
  const amountToMove = -200;
  document.querySelector(".caousel_track").style.transform =
    "translateX(" + (amountToMove + currentPosition) + "px)";
  currentSlide = nextSlide;
  nextSlide = currentSlide.nextElementSibling;

  console.log(nextSlide);
  counter++;
  currentPosition -= 200;
}

let rightcurrentSlide;
let rightnextSlide;

function rightButton() {
  rightcurrentSlide = document.querySelector(".caousel_track").children[
    2 + counter
  ];
  rightprevSlide = rightcurrentSlide.prevElementSibling;
  const amountToMove = 200;
  document.querySelector(".caousel_track").style.transform =
    "translateX(" + (amountToMove + currentPosition) + "px)";
  rightcurrentSlide = rightprevSlide;
  rightprevSlide = currentSlide.prevElementSibling;

  counter--;
  currentPosition += 200;
}

nextButton.addEventListener("click", buttonTrack);
prevButton.addEventListener("click", rightButton);
butt.addEventListener("click", pokeGet);
