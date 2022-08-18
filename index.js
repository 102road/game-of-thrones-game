const url = "https://thronesapi.com/api/v2/Characters";
const options = {
  method: "GET",
  headers: { accept: "application/json" },
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

  let name = document.createElement("h2");
  name.innerHTML = character.fullName;

  let house = document.createElement("p");
  house.innerHTML = character.familyHouse;

  let image = document.createElement("img");
  image.setAttribute("src", character.imageUrl);

  parentEl.append(image, name, house);
  return parentEl;
};

const setCharacterOne = () => {
  characterOne = "";
  characterOne = document.createElement("section");
  characterOne.setAttribute("class", "character-one");

  let character = characterList.shift();
  characterOne.append(createCharacterTile(character));
  let rootEl = document.querySelector("root");
  rootEl.append(characterOne);
};

const setCharacterTwo = () => {
  characterTwo = "";
  characterTwo = document.createElement("section");
  characterTwo.setAttribute("class", "character-two");

  let character = characterList.shift();
  characterTwo.append(createCharacterTile(character));
  let rootEl = document.querySelector("root");
  rootEl.append(characterTwo);
};
