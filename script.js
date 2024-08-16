const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winnerMessage');
const closePopup = document.getElementById('closePopup');

let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame(draw) {
    if (draw) {
        winnerMessage.textContent = 'Draw!';
    } else {
        winnerMessage.textContent = `${isXTurn ? 'X' : 'O'} Wins!`;
    }
    popup.style.display = 'block';
    gameActive = false;
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    popup.style.display = 'none';
    gameActive = true;
    isXTurn = true;
}

function newGame() {
    restartGame();
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', newGame);
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});
