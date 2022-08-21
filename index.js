const url = "http://localhost:4000/";
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
  button.setAttribute("value", character.id);
  button.innerHTML = "Choose";
  button.addEventListener("click", (e) => {
    fetch(url + "characters", {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json", id: e.target.value },
    });
    resetCharacters();
  });

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

const createTableItem = (record) => {
  let container = document.createElement("div");

  let name = document.createElement("p");
  name.innerHTML = record.key;

  let value = document.createElement("p");
  value.innerHTML = record.value;

  return container.append(name, value);
};

const displayResults = () => {
  let table = document.createElement("div");

  let container = document.createElement("div");

  let name = document.createElement("p");
  name.innerHTML = "Name";

  let value = document.createElement("p");
  value.innerHTML = "Wins";

  container.append(name, value);
  table.append(container);

  fetch(url + "results", options)
    .then((response) => response.json())
    .then((response) => {
      let results = Object.entries(response).sort((a, b) => b[1] - a[1]);
      results.forEach((element) => {
        table.append(createTableItem(element));
      });
      let root = document.querySelector(".root");
      root.append(table);
    });
};

const resetCharacters = () => {
  let rootEl = document.querySelector(".root");
  rootEl.innerHTML = "";
  if (characterList === []) {
    displayResults();
    return;
  }
  setCharacterOne();
  setCharacterTwo();
};

//Start Page

fetch(url + "hi", options);

let title = document.createElement("h1");
title.innerHTML = "Welcome to the Game of Faces";

let description = document.createElement("p");
description.innerHTML =
  "A game where you decide who is the stronger character from the popular HBO series Game of Thrones";

let button = document.createElement("button");
button.innerHTML = "Get Started";

let container = document.createElement("div");
container.append(title, description, button);

let rootEl = document.querySelector(".root");
rootEl.append(container);

//Event handlers

button.addEventListener("click", () => {
  fetchCharacters();
  setTimeout(() => {
    reorderCharacterList();
    resetCharacters();
  }, 1000);
});
