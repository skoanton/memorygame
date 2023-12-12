const memoryCards = document.querySelectorAll(".memory-card");
let tries = 0;
let cardNumbers = [];
const overlayEL = document.querySelector(".overlay");
const closeButton = document.querySelector(".close");
let corretGuess = 0;
function flipCard(card) {
    card.classList.add("flip");
    cardNumbers[tries] = card.getAttribute("data-card");
    tries++;
    if (tries === 2) {
        setTimeout(() => {
            checkIfSameCard();
        }, 700);
    }
}
function shuffle() {
    memoryCards.forEach(memoryCards => {
        let randomNumber = Math.floor(Math.random() * 16);
        memoryCards.style.order = randomNumber.toString();
    });
}
function checkIfSameCard() {
    if (cardNumbers[0] != cardNumbers[1]) {
        cardNumbers.forEach(cardNumber => {
            for (const memoryCard of memoryCards) {
                if (memoryCard.getAttribute("data-card") === cardNumber && memoryCard.classList.contains("flip")) {
                    memoryCard.classList.remove("flip");
                }
            }
        });
    }
    hasWon();
    tries = 0;
}
function hasWon() {
    if (cardNumbers[0] === cardNumbers[1]) {
        corretGuess++;
        console.log(corretGuess);
        if (corretGuess === 8) {
            overlayEL === null || overlayEL === void 0 ? void 0 : overlayEL.classList.add("show");
            console.log("won");
        }
    }
}
for (const card of memoryCards) {
    card.addEventListener("click", function () {
        flipCard(card);
    });
}
function restart() {
    overlayEL.classList.remove("show");
    memoryCards.forEach(memoryCard => {
        memoryCard.classList.remove("flip");
        shuffle();
        corretGuess = 0;
    });
}
closeButton.addEventListener("click", restart);
shuffle();
