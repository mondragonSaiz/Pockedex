let pokeIMG = document.querySelector(".poke-img");
let pokeTitle = document.querySelector(".poke-title");
let pokeHeight = document.querySelector(".poke-height");
let pokeTypeSection = document.querySelector(".pokemon-type");
let pokeIndoBody = document.querySelector(".habilidades");
let firstType = document.querySelector(".first-type");
let secondType = document.querySelector(".second-type");

let pokeWeight = document.querySelector(".poke-weight");
let pokemonInput = document.querySelector(".poke-input");
let pockeForm = document.querySelector(".form");

pockeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("HOLAAA");
  console.log("POKE NAME : ", pokemonInput.value);

  let pokeValue = pokemonInput.value.trim().toLowerCase();
  getPokemon(pokeValue);
});

var getPokemon = function (idOrName) {
  try {
    console.log("SEARCHING...");
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${idOrName}/`;
    fetch(pokeURL)
      .then(manageErrors)
      .then((res) => res.json())
      .then((data) => renderPokemon(data));
  } catch (e) {
    throw new Error("THIS A ERROR", e);
  }
};
let pokeAbilities = document.querySelector(".pokemon-abilities");
let abilitiesContainer = document.getElementById("abilities-container");

function manageErrors(response) {
  if (!response.ok) {
    console.error("PIKA ERR");
    renderError();
    // if (response.status == 404) {
    //   throw Error(response.statusText);
    // }
    return; // will print '200 - ok'
  }
  return response;
}

// let seeDetails = false;

let renderError = function () {
  console.log("ERRRORRRR");
  pokeIMG.src =
    "https://cdn.dribbble.com/users/4040675/screenshots/10545158/media/85a3329e4202059593616d3b42f16e8d.png?compress=1&resize=400x300";
};

let renderPokemon = function (data) {
  // if (seeDetails) {
  //   getPokemonAbilities(data);
  // }

  pokeIndoBody.innerHTML = "";

  var pokemonAbilities = document.createElement("div");
  pokemonAbilities.classList.add(".pokemon-abilities");
  pokemonAbilities.setAttribute("data-bs-toggle", "collapse");
  pokemonAbilities.setAttribute("data-bs-target", "#abilities-container");
  pokemonAbilities.setAttribute("aria-expanded", "false");
  pokemonAbilities.setAttribute("aria-controls", "abilities-container");

  var seeAbilitiesText = document.createElement("p");
  seeAbilitiesText.classList.add("card-text");
  var smallAbilitiesText = document.createElement("small");
  smallAbilitiesText.classList.add("smallText");
  smallAbilitiesText.textContent = "See abilities";
  seeAbilitiesText.append(smallAbilitiesText);

  var abilities = document.createElement("div");
  abilities.classList.add("collapse");
  abilities.setAttribute("id", "abilities-container");

  pokemonAbilities.append(seeAbilitiesText);
  pokemonAbilities.append(abilities);

  pokeIndoBody.append(pokemonAbilities);

  console.log("DATA", data);
  console.log("PIKA IMAGE URL", data.sprites.front_default);
  let imgURL = data.sprites.front_default;
  pokeIMG.setAttribute("src", imgURL);
  pokeTitle.textContent = data.name;
  pokeHeight.textContent = `Height : ${data.height}0cm`;
  pokeWeight.textContent = ` Weight : ${data.weight}kg`;

  // pokeType1.textContent = `${data.types[0].type.name}`;

  for (let i = 0; i < data.types.length; i++) {
    if (data.types.length > 1) {
      let tipo1 = data.types[0].type.name;
      let tipo2 = data.types[1].type.name;

      let types = getTypeColors(tipo1, tipo2);
      console.log("T1 ", types[0]);
      console.log("T2 ", types[1]);
      firstType.innerHTML = "";
      secondType.innerHTML = "";
      let firstTypeColorIndicator = document.createElement("p");
      firstTypeColorIndicator.classList.add("type-colorIndicator", types[0]);

      let firstTypeTextIndicator = document.createElement("p");
      firstTypeTextIndicator.textContent = tipo1;
      firstTypeTextIndicator.style.marginLeft = "2px";

      let secondTypeColorIndicator = document.createElement("p");
      secondTypeColorIndicator.classList.add("type-colorIndicator", types[1]);

      let secondTypeTextIndicator = document.createElement("p");
      secondTypeTextIndicator.textContent = tipo2;
      secondTypeTextIndicator.style.marginLeft = "2px";

      firstType.append(firstTypeColorIndicator);
      firstType.append(firstTypeTextIndicator);

      secondType.append(secondTypeColorIndicator);
      secondType.append(secondTypeTextIndicator);
    } else {
      firstType.innerHTML = "";
      secondType.innerHTML = "";
      let tipo1 = data.types[0].type.name;
      let type = getTypeColor(tipo1);
      let firstTypeColorIndicator = document.createElement("p");
      firstTypeColorIndicator.classList.add("type-colorIndicator", type[0]);

      let firstTypeTextIndicator = document.createElement("p");
      firstTypeTextIndicator.textContent = data.types[0].type.name;
      firstTypeTextIndicator.style.marginLeft = "2px";

      firstType.append(firstTypeColorIndicator);
      firstType.append(firstTypeTextIndicator);
    }
  }
  let getPokemonAbilities = function () {
    console.log("Pokemon abilities!!!");
    // console.log("Pokemon DATA: ", data);

    let idOrName = pokemonInput.value.trim().toLowerCase();
    console.log("Pokemon in discuss : ", idOrName);
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${idOrName}/`;
    fetch(pokeURL)
      .then((res) => res.json())
      .then((data) => renderPokemonAbilities(data));
  };

  pokemonAbilities.addEventListener("click", getPokemonAbilities);

  let renderPokemonAbilities = function (data) {
    let ulEL = document.createElement("ul");
    console.log("DATA FOR ABILITIES", data);
    abilities.innerHTML = "";
    console.log("ABILITIES", data.abilities);
    for (let i = 0; i < data.abilities.length; i++) {
      const abilityName = data.abilities[i].ability.name;
      console.log(`ABILITIE - ${i} :`, abilityName);
      let liEL = document.createElement("li");
      liEL.classList.add("liEl");
      liEL.textContent = abilityName;
      ulEL.append(liEL);
    }
    abilities.append(ulEL);
  };
};

let getTypeColor = function (tipo1) {
  let tipo = [];
  switch (tipo1) {
    case "fire":
      tipo.push("fireType");
      break;
    case "flying":
      tipo.push("flyingType");
      break;
    case "water":
      tipo.push("waterType");
      break;
    case "fighting":
      tipo.push("fightingType");
      break;
    case "grass":
      tipo.push("grassType");
      break;
    case "normal":
      tipo.push("normalType");
      break;
    case "poison":
      tipo.push("poisonType");
      break;
    case "ground":
      tipo.push("groundType");
      break;
    case "rock":
      tipo.push("rockType");
      break;
    case "bug":
      tipo.push("bugType");
      break;
    case "ghost":
      tipo.push("ghostType");
      break;
    case "electric":
      tipo.push("electricType");
      break;
    case "psychic":
      tipo.push("pyschicType");
      break;
    case "ice":
      tipo.push("iceType");
      break;
    case "dragon":
      tipo.push("dragonType");
      break;
    case "dark":
      tipo.push("darkType");
      break;
    case "steel":
      tipo.push("steelType");
      break;
    case "fairy":
      tipo.push("fairyType");
      break;
  }
  return tipo;
};

let getTypeColors = function (tipo1, tipo2) {
  let tipos = [];
  switch (tipo1) {
    case "fire":
      tipos.push("fireType");
      break;
    case "flying":
      tipos.push("flyingType");
      break;
    case "water":
      tipos.push("waterType");
      break;
    case "fighting":
      tipos.push("fightingType");
      break;
    case "grass":
      tipos.push("grassType");
      break;
    case "normal":
      tipos.push("normalType");
      break;
    case "poison":
      tipos.push("poisonType");
      break;
    case "ground":
      tipos.push("groundType");
      break;
    case "rock":
      tipos.push("rockType");
      break;
    case "bug":
      tipos.push("bugType");
      break;
    case "ghost":
      tipos.push("ghostType");
      break;
    case "electric":
      tipos.push("electricType");
      break;
    case "psychic":
      tipos.push("pyschicType");
      break;
    case "ice":
      tipos.push("iceType");
      break;
    case "dragon":
      tipos.push("dragonType");
      break;
    case "dark":
      tipos.push("darkType");
      break;
    case "steel":
      tipos.push("steelType");
      break;
    case "fairy":
      tipos.push("fairyType");
      break;
  }

  switch (tipo2) {
    case "fire":
      tipos.push("fireType");
      break;
    case "flying":
      tipos.push("flyingType");
      break;
    case "water":
      tipos.push("waterType");
      break;
    case "fighting":
      tipos.push("fightingType");
      break;
    case "grass":
      tipos.push("grassType");
      break;
    case "normal":
      tipos.push("normalType");
      break;
    case "poison":
      tipos.push("poisonType");
      break;
    case "ground":
      tipos.push("groundType");
      break;
    case "rock":
      tipos.push("rockType");
      break;
    case "bug":
      tipos.push("bugType");
      break;
    case "ghost":
      tipos.push("ghostType");
      break;
    case "electric":
      tipos.push("electricType");
      break;
    case "psychic":
      tipos.push("pyschicType");
      break;
    case "ice":
      tipos.push("iceType");
      break;
    case "dragon":
      tipos.push("dragonType");
      break;
    case "dark":
      tipos.push("darkType");
      break;
    case "steel":
      tipos.push("steelType");
      break;
    case "fairy":
      tipos.push("fairyType");
      break;
  }

  return tipos;
};

// var getMainPokemons = function (number) {
//   for (let i = 1; i <= number; i++) {
//     getPokemon(i);
//   }
// };

// getMainPokemons(10);
