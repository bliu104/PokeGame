const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const pokeInput = document.querySelector("input");
const butt = document.querySelector("#button2");
let pokemove = document.querySelector(".OppMoves ");
let userpokemovestat = document.querySelector(".userPokemonMoves");
const battleButt = document.querySelector("#battle");
let pokeGet;

pokeGet = async function() {
  const poke = pokeInput.value;
  let response = await axios.get(`${BASE_URL}${poke}`);
  userPokemon(response);
  pokeStat(response);
  userPokemonMove(response);
  userpokeMoves();
};

let userpokeMoves = async function() {
  let i = 0;
  let response = [];
  while (i < 4) {
    let move = userpokemovestat.children[i].textContent;
    response[i] = await axios.get(`https://pokeapi.co/api/v2/move/${move}/`);
    i++;
  }

  let j = 0;
  while (j < 4) {
    UsermoveStat(response[j]);
    j++;
  }
  //console.log(response);
};

let getPokeMove = async function() {
  let i = 0;
  let response = [];
  while (i < 4) {
    let move = pokemove.children[i].textContent;
    response[i] = await axios.get(`https://pokeapi.co/api/v2/move/${move}/`);
    i++;
  }
  let j = 0;
  while (j < 4) {
    moveStat(response[j]);
    j++;
  }
};

randompokeGet = async function() {
  let response2 = await axios.get(`${BASE_URL}${randomPoke()}`);
  oppPokemon(response2);
  ImageNameOpp(response2);
  getPokeMove();
  document.querySelector(
    "#textBox"
  ).innerHTML = `A wild ${response2.data.forms[0].name} appeared!`;
};

// TypeAdv = async function(type) {
//   let response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
//   //console.log(response);
//   //return response;
// };
// // TypeAdv("fire");
// // TypeAdv("ground");
function randomNumber(response) {
  const pokeData = response;
  let length1 = pokeData.data.moves.length;
  let moveset = [];
  let i = 0;
  while (i < 4) {
    randomNum = Math.floor(Math.random() * length1);
    if (!moveset.includes(randomNum)) {
      moveset[i] = randomNum;
      i++;
    }
  }
  return moveset;
}

function userPokemon(response) {
  const pokeData = response;
  let name = pokeData.data.forms[0].name;
  document.querySelector(
    "#textBox"
  ).innerHTML = `You choose ${pokeData.data.forms[0].name}!`;
  let imagePokeBack = pokeData.data.sprites.back_default;

  document.querySelector(".Battlestats").innerHTML = `<div>${name}</div>`;
  document.querySelector(
    ".PokemonImage"
  ).innerHTML = ` <img id = "UserIMG"src = ${imagePokeBack}>`;
}

function userPokemonMove(response) {
  const pokeData = response;
  let array = randomNumber(response);
  let move1 = pokeData.data.moves[array[0]].move.name;
  let move2 = pokeData.data.moves[array[1]].move.name;
  let move3 = pokeData.data.moves[array[2]].move.name;
  let move4 = pokeData.data.moves[array[3]].move.name;
  document.querySelector(
    ".userPokemonMoves"
  ).innerHTML = `<div>${move1}</div><div>${move2}</div><div>${move3}</div><div>${move4}</div>`;
}

function randomPoke() {
  let randomNum = Math.floor(Math.random() * 800);
  return randomNum;
}

function oppPokemon(response) {
  let pokeData = response;
  let level = 50;
  let randomNum = [];
  let i = 0;
  while (i < 6) {
    randomNum[i] = Math.floor(Math.random() * 3);
    i++;
  }

  let array = randomNumber(response);
  let move1 = pokeData.data.moves[array[0]].move.name;
  let move2 = pokeData.data.moves[array[1]].move.name;
  let move3 = pokeData.data.moves[array[2]].move.name;
  let move4 = pokeData.data.moves[array[3]].move.name;

  let health = pokeData.data.stats[5].base_stat;
  let defense = pokeData.data.stats[3].base_stat;
  let attack = pokeData.data.stats[4].base_stat;
  let specialAttack = pokeData.data.stats[2].base_stat;
  let specialDefense = pokeData.data.stats[1].base_stat;
  let speed = pokeData.data.stats[0].base_stat;

  document.querySelector(
    ".OppMoves"
  ).innerHTML = `<div>${move1}</div><div>${move2}</div><div>${move3}</div><div>${move4}</div>`;

  document.querySelector(".OppStat").innerHTML += `<div>${health +
    level * randomNum[5]}</div>
  <div>${attack + level * randomNum[0]}</div><div>${defense +
    level * randomNum[1]}</div><div>Special Attack: ${specialAttack +
    level * randomNum[2]}</div><div>Special Defense: ${specialDefense +
    level * randomNum[3]}</div><div>${speed + level * randomNum[4]}</div>`;
}

function ImageNameOpp(response) {
  let pokeData = response;
  let name = pokeData.data.forms[0].name;
  let imagePokeBack = pokeData.data.sprites.front_default;
  document.querySelector(
    ".OppPokemon"
  ).innerHTML = `<div style="display: none";>${name}</div> <img id = "imgOpp"src = ${imagePokeBack}>`;
}

function pokeStat(response) {
  const pokeData = response;
  let level = 50;
  let randomNum = [];
  let i = 0;
  while (i < 6) {
    randomNum[i] = Math.floor(Math.random() * 3);
    i++;
  }
  let defense = pokeData.data.stats[3].base_stat;
  let attack = pokeData.data.stats[4].base_stat;
  let specialAttack = pokeData.data.stats[2].base_stat;
  let specialDefense = pokeData.data.stats[1].base_stat;
  let speed = pokeData.data.stats[0].base_stat;
  let health = pokeData.data.stats[5].base_stat;
  document.querySelector(".Battlestats").innerHTML += `<div>${health +
    level * randomNum[5]}</div><div>${attack +
    level * randomNum[0]}</div><div>${defense +
    level * randomNum[1]}</div><div>${specialAttack +
    level * randomNum[2]}</div><div>${specialDefense +
    level * randomNum[3]}</div><div>${speed + level * randomNum[4]}</div>`;
}

function moveStat(response) {
  let moveData = response;
  let moves = {};
  moves.power = moveData.data.power;
  if (moves.power === null) {
    moves.power = 0;
  }
  moves.accuracy = moveData.data.accuracy;
  if (moves.accuracy === null) {
    moves.accuracy = 0;
  }
  moves.type = moveData.data.type.name;
  document.querySelector(
    ".Movestats"
  ).innerHTML += `<div>${moves.power}</div><div>${moves.accuracy}</div><div>Type: ${moves.type}</div>`;
}
function UsermoveStat(response) {
  let moveData = response;
  let moves = {};
  moves.name = moveData.data.name;
  moves.power = moveData.data.power;
  if (moves.power === null) {
    moves.power = 0;
  }
  moves.accuracy = moveData.data.accuracy;
  if (moves.accuracy === null) {
    moves.accuracy = 0;
  }
  moves.type = moveData.data.type.name;
  document.querySelector(
    ".userPokemonMoveStat"
  ).innerHTML += `<div>${moves.name}</div><div>${moves.power}</div><div>${moves.accuracy}</div><div>${moves.type}</div>`;
}
//--------------------------------------------------------
function OppStat() {
  OppStats = {};
  OppStats.Health = document.querySelector(".OppStat").children[0].textContent;
  OppStats.Attack = document.querySelector(".OppStat").children[1].textContent;
  OppStats.Defense = document.querySelector(".OppStat").children[2].textContent;
  OppStats.Speed = document.querySelector(".OppStat").children[5].textContent;

  let userMoves0 = {};
  let userMoves1 = {};
  let userMoves2 = {};
  let userMoves3 = {};

  array = [userMoves0, userMoves1, userMoves2, userMoves3];

  let i = 0;
  let j = 0;

  while (j < 4) {
    array[j].Name = document.querySelector(".OppMoves").children[j].textContent;
    array[j].movePower = document.querySelector(".Movestats").children[
      i
    ].textContent;
    array[j].moveAcc = document.querySelector(".Movestats").children[
      i + 1
    ].textContent;
    array[j].moveType = document.querySelector(".Movestats").children[
      i + 2
    ].textContent;
    i = i + 3;
    j++;
  }
  let arr1 = [];
  arr1[0] = OppStats;
  arr1[1] = array;
  console.log(arr1);
  return arr1;
}

function userPokemonStats() {
  let userStats = {};

  userStats.Health = document.querySelector(
    ".Battlestats"
  ).children[1].textContent;
  userStats.Attack = document.querySelector(
    ".Battlestats"
  ).children[2].textContent;
  userStats.Defense = document.querySelector(
    ".Battlestats"
  ).children[3].textContent;
  userStats.Speed = document.querySelector(
    ".Battlestats"
  ).children[6].textContent;
  //console.log(userStats);

  let userMoves0 = {};
  let userMoves1 = {};
  let userMoves2 = {};
  let userMoves3 = {};

  array = [userMoves0, userMoves1, userMoves2, userMoves3];

  let i = 0;
  let j = 0;

  while (i < 16) {
    array[j].Name = document.querySelector(".userPokemonMoveStat").children[
      i
    ].textContent;
    array[j].movePower = document.querySelector(
      ".userPokemonMoveStat"
    ).children[i + 1].textContent;
    array[j].moveAcc = document.querySelector(".userPokemonMoveStat").children[
      i + 2
    ].textContent;
    array[j].moveType = document.querySelector(".userPokemonMoveStat").children[
      i + 3
    ].textContent;
    i = i + 4;
    j++;
  }
  let arr1 = [];
  arr1[0] = userStats;
  arr1[1] = array;
  //console.log(arr1);
  return arr1;
}

const buttonMove1 = document.querySelector(".move1");
const buttonMove2 = document.querySelector(".move2");
const buttonMove3 = document.querySelector(".move3");
const buttonMove4 = document.querySelector(".move4");

function Health() {
  let UserData = userPokemonStats();
  let OppData = OppStat();
  document.querySelector("#userHP").append(UserData[0].Health);
  document.querySelector("#OppHP").append(OppData[0].Health);
  moveSet1(UserData);
  let element = document.querySelector("#battle");
  element.parentNode.removeChild(element);
}
function moveSet1(UserData) {
  document.querySelector(".move1").innerHTML = `${UserData[1][0].Name}`;
  document.querySelector(".move2").innerHTML = `${UserData[1][1].Name}`;
  document.querySelector(".move3").innerHTML = `${UserData[1][2].Name}`;
  document.querySelector(".move4").innerHTML = `${UserData[1][3].Name}`;
}
function Damage() {
  buttonMove1.addEventListener("click", function() {
    choosemove = buttonMove1.textContent;
    console.log(`${choosemove}`);
  });
  buttonMove2.addEventListener("click", function() {
    choosemove = buttonMove2.textContent;

    console.log(`${choosemove}`);
  });
  buttonMove3.addEventListener("click", function() {
    choosemove = buttonMove3.textContent;
    console.log(`${choosemove}`);
  });
  buttonMove4.addEventListener("click", function() {
    choosemove = buttonMove3.textContent;
    console.log(`${choosemove}`);
  });
}

function OppAttack() {
  let OppData = OppStat();
  let attacks = OppData[1];
  let randomAttack = Math.floor(Math.random() * 4);
  let array = [];
  array[0] = attacks[randomAttack].Name;
  array[1] = attacks[randomAttack].movePower;
  return array;
}

// function effectiveMove(attackType, pokeType) {
//   let double_damge_to = TypeAdv(attackType).data.damage_relations
//     .double_damage_to;
//   let type = TypeAdv(pokeType).data.data.damage_relations.double_damage_from;
//   let i = 0;
//   let j = 0;
//   let damageMulti = 1;
//   while (i < double_damge_to.length) {
//     while (j < type.length)
//       if (type[j].name === double_damge_to[i].name) {
//         damageMulti = damageMulti * 2;
//         j++;
//       }
//     j = 0;
//     i++;
//   }
//   return damageMulti;
// }
function PokeBattle(event) {
  let UserData = userPokemonStats();
  let OppData = OppStat();

  event.target.textContent;

  let attackPower1;
  let i = 0;
  while (i < 4) {
    if (event.target.textContent === UserData[1][i].Name) {
      attackPower1 = UserData[1][i].movePower;
    }
    i++;
  }
  moveSet1(UserData);

  Damage(UserData);

  document.querySelector("#textBox").innerHTML = `${
    document.querySelector(".Battlestats").children[0].textContent
  } use ${event.target.textContent}<br />${
    document.querySelector(".OppPokemon").children[0].textContent
  } use ${OppAttack()[0]}`;

  let DamMultiOpp =
    (((2 * 50) / 5) *
      OppAttack()[1] *
      (OppData[0].Attack / UserData[0].Defense)) /
      50 +
    2;

  let DamMultiUser =
    (((2 * 50) / 5) *
      attackPower1 *
      (UserData[0].Attack / OppData[0].Defense)) /
      50 +
    2;

  // console.log(effectiveMove("water", "fire"));

  document.querySelector("#OppHP").innerHTML -= `${DamMultiUser}`;
  document.querySelector("#userHP").innerHTML -= `${DamMultiOpp}`;

  let oppHealth = document.querySelector("#OppHP").textContent;
  console.log(oppHealth);

  let UserHealth = document.querySelector("#userHP").textContent;

  document.querySelector(
    "#OppHPbar"
  ).innerHTML = `<progress id="health" value="${oppHealth}" max="${
    document.querySelector(".OppStat").children[0].textContent
  }"></progress>`;

  document.querySelector(
    "#userHPbear"
  ).innerHTML = `<progress id="health" value="${UserHealth}" max="${
    document.querySelector(".Battlestats").children[1].textContent
  }"></progress>`;

  if (oppHealth <= 0) {
    document.querySelector("#textBox").innerHTML = `${
      document.querySelector(".OppPokemon").children[0].textContent
    } suddenly exploded and then died!:( Congratulations!! you won!!`;
    let element = document.querySelector(".butt1");
    element.parentNode.removeChild(element);
  } else if (UserHealth <= 0) {
    document.querySelector("#textBox").innerHTML = `${
      document.querySelector(".Battlestats").children[0].textContent
    } has exploded and died`;
    let element = document.querySelector(".butt1");
    element.parentNode.removeChild(element);
  }
}

buttonMove1.addEventListener("click", PokeBattle);
buttonMove2.addEventListener("click", PokeBattle);
buttonMove3.addEventListener("click", PokeBattle);
buttonMove4.addEventListener("click", PokeBattle);

function myFunction() {
  var x = document.querySelector(".butt1");
  if (x.style.display == "none" || x.style.display) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myFunction1() {
  var x = document.querySelector("#battle");
  if (x.style.display == "none" || x.style.display) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

butt.addEventListener("click", pokeGet);

randompokeGet();

//--------------------------------------------------------

battleButt.addEventListener("click", Health);

//console.log(randomPoke());
