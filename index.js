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

  let image = document.createElement("img");
  image.setAttribute("src", character.imageUrl);

  let house = document.createElement("h2");
  house.innerHTML = character.family;

  let button = document.createElement("button");
  button.setAttribute("value", character.fullName);
  button.innerHTML = "Choose";
  button.addEventListener("click", (e) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json", fullName: e.target.value },
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    resetCharacters();
  });

  parentEl.append(name, image, house, button);
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
  container.setAttribute("class", "container");

  let name = document.createElement("p");
  name.setAttribute("class", "name");
  name.innerHTML = record[0];

  let value = document.createElement("p");
  value.setAttribute("class", "value");
  value.innerHTML = record[1];

  container.append(name, value);
  return container;
};

const displayResults = () => {
  let title = document.createElement("h2");
  title.innerHTML = "Results";

  let gameButton = document.createElement("button");
  gameButton.innerHTML = "Play Game";

  gameButton.addEventListener("click", () => {
    fetchCharacters();
    setTimeout(() => {
      reorderCharacterList();
      resetCharacters();
    }, 1000);
  });

  let table = document.createElement("div");
  table.setAttribute("class", "table");

  let container = document.createElement("div");
  container.setAttribute("class", "container");

  let name = document.createElement("p");
  name.setAttribute("class", "name");
  name.innerHTML = "Name";

  let value = document.createElement("p");
  value.setAttribute("class", "value");
  value.innerHTML = "Wins";

  container.append(name, value);
  table.append(container);

  fetch(url + "results", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let results = Object.entries(response).sort((a, b) => b[1] - a[1]);
      console.log(results);
      results.forEach((element) => {
        let document = createTableItem(element);
        console.log(document);
        table.append(document);
      });
      let box = document.createElement('section');
      box.setAttribute('class', 'box')
      box.append(title,table,gameButton);

      let root = document.querySelector(".root");
      root.append(box);
    });
};

const resetCharacters = () => {
  let rootEl = document.querySelector(".root");
  rootEl.innerHTML = "";
  if (characterList.length === 0) {
    displayResults();
    return;
  }
  setCharacterOne();
  setCharacterTwo();
};

//Start Page

let title = document.createElement("h1");
title.innerHTML = "Welcome to the Game of Faces";

let description = document.createElement("p");
description.innerHTML =
  "A game where you decide who is the stronger character from the popular HBO series Game of Thrones";

let gameButton = document.createElement("button");
gameButton.innerHTML = "Get Started";

let displayButton = document.createElement("button");
displayButton.innerHTML = " Display Results";

let container = document.createElement("div");
container.setAttribute("class", "front-page");
container.append(title, description, gameButton, displayButton);

let rootEl = document.querySelector(".root");
rootEl.append(container);

//Event handlers

gameButton.addEventListener("click", () => {
  fetchCharacters();
  setTimeout(() => {
    reorderCharacterList();
    resetCharacters();
  }, 1000);
});

displayButton.addEventListener("click", () => {
  let rootEl = document.querySelector(".root");
  rootEl.innerHTML = "";
  displayResults();
});
