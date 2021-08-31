// cardsNames
const cardNames = [
  "2C",
  "2D",
  "2H",
  "2S",
  "3C",
  "3D",
  "3H",
  "3S",
  "4C",
  "4D",
  "4H",
  "4S",
  "5C",
  "5D",
  "5H",
  "5S",
  "6C",
  "6D",
  "6H",
  "6S",
  "7C",
  "7D",
  "7H",
  "7S",
  "8C",
  "8D",
  "8H",
  "8S",
  "9C",
  "9D",
  "9H",
  "9S",
  "10C",
  "10D",
  "10H",
  "10S",
  "AC",
  "AD",
  "AH",
  "AS",
  "JC",
  "JD",
  "JH",
  "JS",
  "KC",
  "KD",
  "KH",
  "KS",
  "QC",
  "QD",
  "QH",
  "QS"
];

const mainUrl =
  "https://raw.githubusercontent.com/Newton-School/Deck_of_Cards/main/JPEG/";

let count = 0;

function renderCardsGame() {
  /* Render Cards*/
  buildCards();

  /* Sort Cards Randomly  */
  cardNames.sort(() => 0.5 - Math.random());

  /* Adding EventListener to all Card Bins */
  document.querySelectorAll(".card-bin ").forEach((item) => {
    item.addEventListener("drop", dropImage);
  });
}

function buildCards() {
  for (let i = 0; i < 52; i++) {
    const imgCard = document.createElement("img");
    imgCard.setAttribute("src", `${mainUrl}${cardNames[i]}.jpg`);
    imgCard.setAttribute("id", i);
    imgCard.setAttribute("class", "card");
    imgCard.setAttribute("draggable", "true");
    imgCard.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("src", e.target.src);
      e.dataTransfer.setData("id", e.target.id);
    });

    imgCard.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    /* Appending the Image Card to Image Container */
    document.querySelector(".image-container").appendChild(imgCard);
  }
}

function dropImage(e) {
  const draggedCardSrc = e.dataTransfer.getData("src");
  const draggedCardId = e.dataTransfer.getData("id");
  const droppedContainerCardType = e.target.className[0];
  const draggedCardType = draggedCardSrc.split("/")[7].split(".")[0];
  const bothCardMatches =
    draggedCardType[draggedCardType.length - 1] === droppedContainerCardType;
  if (bothCardMatches) {
    document.getElementById(draggedCardId).remove();
    count++;
    document.querySelector(".count").innerText = 52 - count;
  } else {
    setTimeout(() => {
      document.querySelector(
        "#notification"
      ).innerHTML = `<h1>Oops🙃 you have dropped the card in the wrong bin</h1>`;
    }, 0);
    setTimeout(() => {
      document.querySelector("#notification").innerHTML = "";
    }, 3000);
  }

  if (count === 52) {
    document.querySelector(
      "#notification"
    ).innerHTML = `<h1>You have lost your power of Magic Drop</h1>
    <button id="restart-button">Regain Magic</button>`;
    document.querySelector("#restart-button").addEventListener("click", reset);
  }
}

function reset() {
  document.querySelector(".image-container").innerHTML = "";
  document.querySelector("#notification").innerHTML = "";
  renderCardsGame();
  count = 0;
  document.querySelector(".count").innerText = 52 - count;
}

renderCardsGame();
