// Array containing pairs of numbers from 1 to 8
const cards = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];

// Array to store flipped cards
let flippedCards = [];

// Array to store matched cards
let matchedCards = [];

// Function to shuffle the elements of an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create the game board
function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffle(cards);
    cards.forEach(cardValue => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = cardValue; // Store the value of the card
        cardElement.textContent = cardValue; // Display the value on the card
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Function to handle card flipping
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip') && !this.classList.contains('matched')) {
        this.classList.add('flip');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// Function to check if flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        if (matchedCards.length === cards.length) {
            showCongratulations();
        }
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }
    flippedCards = [];
}

// Function to display congratulatory message and restart button
function showCongratulations() {
    // Create a container div for the congratulatory message and restart button
    const container = document.createElement('div');
    container.classList.add('congratulations-container');

    // Create a div for the congratulatory message
    const message = document.createElement('div');
    message.textContent = 'Congratulations! You won!';
    message.classList.add('congratulations');

    // Apply styles to center the message
    message.style.fontSize = '36px';
    message.style.fontWeight = 'bold';
    message.style.color = '#007bff'; // Blue color
    message.style.textAlign = 'center';
    message.style.marginBottom = '20px';

    // Create a restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.classList.add('restart-btn');
    restartButton.addEventListener('click', restartGame);

    // Append the message and restart button to the container
    container.appendChild(message);
    container.appendChild(restartButton);

    // Append the container to the body
    document.body.appendChild(container);
}

// Function to restart the game
function restartGame() {
    // Reset all cards
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the game board
    flippedCards = [];
    matchedCards = [];
    createGameBoard(); // Create a new game board
    
    // Remove the congratulatory message and restart button container
    const container = document.querySelector('.congratulations-container');
    if (container) {
        container.remove();
    }
}


// Call the createGameBoard() function to start the game
createGameBoard();
// Add event listener to the restart button
document.getElementById('restart-btn').addEventListener('click', restartGame);
