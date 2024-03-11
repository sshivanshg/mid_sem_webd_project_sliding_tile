const imagePositions = [
    'top left',
    'top center',
    'top right',
    'center left',
    'center center',
    'center right',
    'bottom left',
    'bottom center',
];

let gameGrid = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
];

const initializeGame = () => {
    let sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gameGrid = [];
    for (let i = 0; i < 9; i++) {
        const current = sequence.splice(Math.random() * sequence.length, 1);
        gameGrid.push(current[0]);
    }
};

const moveTile = (index) => {
    const tileIndex = gameGrid.indexOf(8);
    const adjacentIndexes = [tileIndex - 1, tileIndex + 1, tileIndex - 3, tileIndex + 3];

    for (const adjIndex of adjacentIndexes) {
        if (adjIndex === index) {
            gameGrid[tileIndex] = gameGrid[index];
            gameGrid[index] = 8;
            break;
        }
    }
    updateDisplay();
};

const checkVictory = () => {
    for (let i = 0; i < 9; i++) {
        if (gameGrid[i] !== i) {
            return false;
        }
    }
    return true;
};

const updateDisplay = () => {
    let gridContainer = document.querySelector('.grid').cloneNode(false);

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (gameGrid[i] !== 8) {
            cell.style.backgroundPosition = imagePositions[gameGrid[i]];
            cell.style.backgroundImage = 'url("https://i.imgur.com/CmFuOpx.png")';
            cell.style.cursor = 'pointer';
            cell.addEventListener('click', () => moveTile(i));
        }

        gridContainer.appendChild(cell);
    }

    document.querySelector('.grid').replaceWith(gridContainer);

    setTimeout(() => {
        if (checkVictory()) {
            alert("Congratulations! You solved the puzzle! Click on New Game to continue playing !!");
        }
    }, 10);
};

initializeGame();
updateDisplay();


document.querySelector('button').addEventListener('click', () => {
    initializeGame();
    updateDisplay();
});
