const url = "http://localhost:4000/characters";
const options = {
  method: "GET",
  mode: "cors",
  headers: { "Content-type": "application/json" },
};

// Variables
let characterList = [];
let characterOne = "";
let characterTwo = "";

// Fetch data function will on be called once
const fetchCharacters = () => {
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => (characterList = response))
    .catch((err) => console.log(err));
};

const reorderCharacterList = () => {
  characterList.sort(() => Math.random() - 0.5);
};

const createCharacterTile = (character) => {
  let parentEl = document.createElement("article");
  parentEl.setAttribute("class", "character");

  let name = document.createElement("h2");
  name.innerHTML = character.fullName;

  let house = document.createElement("p");
  house.innerHTML = character.family;

  let image = document.createElement("img");
  image.setAttribute("src", character.imageUrl);

  let button = document.createElement("button");

  parentEl.append(image, name, house, button);
  return parentEl;
};

const setCharacterOne = () => {
  characterOne.innerHTML = "";
  characterOne = document.createElement("section");
  characterOne.setAttribute("class", "character-one");

  let character = characterList.shift();
  characterOne.append(createCharacterTile(character));
  let rootEl = document.querySelector(".root");
  rootEl.append(characterOne);
};

const setCharacterTwo = () => {
  characterTwo.innerHTML = "";
  characterTwo = document.createElement("section");
  characterTwo.setAttribute("class", "character-two");

  let character = characterList.shift();
  characterTwo.append(createCharacterTile(character));
  let rootEl = document.querySelector(".root");
  rootEl.append(characterTwo);
};

const resetCharacters = () => {
  let rootEl = document.querySelector(".root");
  rootEl.innerHTML = "";
  setCharacterOne();
  setCharacterTwo();
};

//Start Page

let title = document.createElement("h1");
title.innerHTML = "Welcome to the game of faces";

let description = document.createElement("p");
description.innerHTML =
  "A game where you decide who is the stronger character from the popular HBO series Game of Thrones";

let button = document.createElement("button");
button.innerHTML = "Get Started";

let rootEl = document.querySelector(".root");
rootEl.append(title, description, button);

//Event handlers

button.addEventListener(
  "click",
  () => {
    fetchCharacters();
    setTimeout(() => {
      console.log(characterList);
      reorderCharacterList();
      resetCharacters();
    },1000);
  }
);
