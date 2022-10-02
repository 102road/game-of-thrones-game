// API variables

const url = "http://localhost:3000/";
const options = {
  method: "GET",
  mode: "cors",
  headers: { "Content-type": "application/json" },
};

// Character Variables

let characterList = [];
let characterOne = "";
let characterTwo = "";

// Function to create menu page

const showMenu = () => {
  let titleImage = document.createElement("img");
  titleImage.setAttribute(
    "src",
    "./assets/images/1-2-game-of-thrones-logo-picture.png"
  );
  titleImage.setAttribute("class", "title-image");

  let gameButton = document.createElement("button");
  gameButton.innerHTML = "Get Started";

  let displayButton = document.createElement("button");
  displayButton.innerHTML = " Display Results";

  let menuPage = document.createElement("section");
  menuPage.setAttribute("class", "menu-page");
  menuPage.append(gameButton, titleImage, displayButton);

  rootEl.innerHTML = "";
  rootEl.append(menuPage);

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
};

//Sets Character list

const fetchCharacters = () => {
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => (characterList = response))
    .catch((err) => console.log(err));
};

const reorderCharacterList = () => {
  console.log(characterList)
  characterList.sort(() => Math.random() - 0.5);
};

// Creates Character Functions

const createCharacterTile = (character) => {
  // Creates elements for character tile

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
  button.setAttribute("class", "choose");
  button.innerHTML = "Choose";

  // Event Handler that posts results of each selection and adds one point to the character results page

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

  // Appends elements to parent element

  parentEl.append(name, image, house, button);
  return parentEl;
};

const setCharacterOne = () => {
  characterOne.innerHTML = "";
  characterOne = document.createElement("article");
  characterOne.setAttribute("class", "character-one");

  let character = characterList.shift();
  characterOne.append(createCharacterTile(character));

  return characterOne;
};

const setCharacterTwo = () => {
  characterTwo.innerHTML = "";
  characterTwo = document.createElement("article");
  characterTwo.setAttribute("class", "character-two");

  let character = characterList.shift();
  characterTwo.append(createCharacterTile(character));

  return characterTwo;
};

const resetCharacters = () => {
  let rootEl = document.querySelector(".root");
  rootEl.innerHTML = "";

  //Checks to see Character list array is empty and displays results if it is empty

  if (characterList.length === 0) {
    displayResults();
    return;
  }
  let characterPage = document.createElement("section");
  characterPage.setAttribute("class", "character-page");
  characterPage.append(setCharacterOne(), setCharacterTwo());

  rootEl.append(characterPage);
};

//Results table functions

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
  // Create title and game button for results page

  let title = document.createElement("h2");
  title.innerHTML = "Results";

  let gameButton = document.createElement("button");
  gameButton.setAttribute("class", "play");
  gameButton.innerHTML = "Play Game";

  gameButton.addEventListener("click", () => {
    fetchCharacters();
    setTimeout(() => {
      reorderCharacterList();
      resetCharacters();
    }, 1000);
  });

  // Creates header for results table appends them to the top of the page

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

  // Fetches results data from api

  fetch(url + "results", options)
    .then((response) => response.json())
    .then((response) => {
      // Puts response into descending order

      let results = Object.entries(response).sort((a, b) => b[1] - a[1]);

      // Creates elements for each result in the ordered array and appends them to a table

      results.forEach((element) => {
        let document = createTableItem(element);
        console.log(document);
        table.append(document);
      });

      // Appends all new elements title, table and game button to section element

      let container = document.createElement("section");
      container.setAttribute("class", "results-page");
      container.append(title, table, gameButton);

      // Appends results to the root element

      let root = document.querySelector(".root");
      root.append(container);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Initial Page Load Creates title, description and buttons

let rootEl = document.querySelector(".root");

let frontPage = document.createElement("section");
frontPage.setAttribute("class", "front-page");

rootEl.append(frontPage);

//Event handlers

frontPage.addEventListener("click", () => {
  showMenu();
});
