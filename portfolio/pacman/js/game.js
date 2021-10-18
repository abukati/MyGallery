'use strict';
const WALL = '#';
const FOOD = '.';
const SUPER_FOOD = '⬤';
const EMPTY = ' ';
const CHERRY = '🍒'

var gEmptyLocations = []

const LOSE_MODAL = document.querySelector('.game-over')
const WIN_MODAL = document.querySelector('.game-won')

var cherryTimeout
var isWin = false;
var gFoodCount = 0;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 || i === 1 && j === 8 ||
                i === 8 && j === 1 || i === 8 && j === 8) {
                    board[i][j] = SUPER_FOOD;
                }
            if (board[i][j] === FOOD) gFoodCount++
        }
    }
    gFoodCount -= 2
    return board;
}

// update model and dom
function updateScore(diff) {
    //model
    gGame.score += diff;
    //dom

    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    
    if (gGame.score == gFoodCount) {
        isWin = true
        gameOver()
    }
}

(function setCherryLocation() {
    var nextLocation = gEmptyLocations[getRandomIntInclusive(0, gEmptyLocations.length)]
    if (nextLocation) {
        gBoard[nextLocation.i][nextLocation.j] = CHERRY
        renderCell(nextLocation, CHERRY)
        gFoodCount += 10
    }
    cherryTimeout = setTimeout(setCherryLocation, 15000)
})()

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearTimeout(cherryTimeout);
    gIntervalGhosts = null;
    isWin ? WIN_MODAL.style.display = 'inherit' : LOSE_MODAL.style.display = 'inherit';
}

function playAgain() {
    gFoodCount = 0;
    gGame.score = 0;
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    LOSE_MODAL.style.display = 'none';
    WIN_MODAL.style.display = 'none';
    init();
}