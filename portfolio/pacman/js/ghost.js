'use strict';
const GHOST = '&#9781;';

var gGhosts;
var gIntervalGhosts;
var gMoves = 0;

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    // gIntervalGhosts = setInterval(moveGhosts, 2000);
}

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

// : loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
    }
    
}

// : figure out moveDiff, nextLocation, nextCell
function moveGhost(ghost) {
    gMoves++;
    // { i: 0, j: 1 }
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    };
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // : return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    // : hitting a pacman?  call gameOver
    if (nextCellContent === PACMAN) {
        isWin = false;
        gameOver();
        return;
    }
    // : moving from corrent position:
    // : update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // : update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // : Move the ghost to new location
    ghost.currCellContent = nextCellContent
    ghost.location = nextLocation;
    // : update the model
    gBoard[nextLocation.i][nextLocation.j] = GHOST;
    // : update the DOM
    renderCell(nextLocation, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 };
    } else if (randNum <= 50) {
        return { i: -1, j: 0 };
    } else if (randNum <= 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

function getGhostHTML(ghost) {
    var ghostColor = gPacman.isSuper ? 'white' : ghost.color
    return `<span style="background-color:${ghostColor}; color: black">${GHOST}</span>`;
}

function getEatenGhost(location) {
    for (var ghost of gGhosts) {
        if (ghost.location.i === location.i && ghost.location.j === location.j) return ghost
    }
}