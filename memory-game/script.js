const cards = document.querySelectorAll('.card');

/* 
  Data for the game. 
  We will duplicate these to create pairs.
*/
const cardData = [
    { name: 'alien', icon: '👽' },
    { name: 'ufo', icon: '🛸' },
    { name: 'rocket', icon: '🚀' },
    { name: 'planet', icon: '🪐' },
    { name: 'crystal', icon: '💎' },
    { name: 'wizard', icon: '🧙' },
    { name: 'dna', icon: '🧬' },
    { name: 'ghost', icon: '👻' },
];

const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let timerInterval;
let seconds = 0;
let gameStarted = false;

/* 
  Initialize Game 
*/
function initGame() {
    // 1. Reset State
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    moves = 0;
    seconds = 0;
    gameStarted = false;
    movesElement.textContent = moves;
    timerElement.textContent = '00:00';
    clearInterval(timerInterval);

    // 2. Clear Board
    gameBoard.innerHTML = '';

    // 3. Create Pairs & Shuffle
    // Spread operator (...) to duplicate the array
    const deck = [...cardData, ...cardData];

    // Sort randomly (simple shuffle)
    deck.sort(() => 0.5 - Math.random());

    // 4. Generate HTML
    deck.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name; // Store name for matching logic

        /* 
           Structure:
           .card (container)
             .front-face (The cover - what you see initially)
             .back-face (The content - the icon)
           
           Wait! In CSS we defined:
           .front-face (No rotation) -> This is the cover.
           .back-face (Rotated 180deg) -> This is the icon.
        */
        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        frontFace.textContent = '?'; // Or a logo

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.textContent = item.icon;

        // Append faces to card
        // Note: ORDER MATTERS for z-index overlapping if not using 3d properly, 
        // but with preserve-3d it's fine.
        // Usually back-face (content) goes first in HTML if we want it "behind", 
        // but with absolute positioning they stack.
        // Let's stick to the order in CSS logic.
        card.appendChild(backFace);  // Icon
        card.appendChild(frontFace); // Cover

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

/*
  Timer Logic
*/
function startTimer() {
    if (gameStarted) return;
    gameStarted = true;
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        // String functions to pad default 0
        timerElement.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

/*
  Card Flip Logic
*/
function flipCard() {
    // Stop if board is locked (waiting for unflip)
    if (lockBoard) return;

    // Stop if clicking the same card
    if (this === firstCard) return;

    // First click starts the timer
    if (!gameStarted) startTimer();

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    incrementMoves();
    checkForMatch();
}

function incrementMoves() {
    moves++;
    movesElement.textContent = moves;
}

/*
  Match Logic
*/
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Matched! Remove listeners so they can't be clicked again
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Visual feedback: Change cursor
    firstCard.style.cursor = 'default';
    secondCard.style.cursor = 'default';

    // Check for Win (if all cards flipped)
    // We can check if all cards have 'flip' class
    const allCards = document.querySelectorAll('.card');
    const allFlipped = [...allCards].every(card => card.classList.contains('flip'));

    if (allFlipped) {
        clearInterval(timerInterval);
        setTimeout(() => alert(`You won in ${moves} moves and ${timerElement.textContent}!`), 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true; // Lock board so user can't click others

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000); // Wait 1s before flipping back
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*
  Event Listeners
*/
restartBtn.addEventListener('click', initGame);

// Start game on load
initGame();
