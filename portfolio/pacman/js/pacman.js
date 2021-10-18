'use strict';
const PACMAN = '😷';
const SUPER_PACMAN = '😈';
var direction = ''

var gPoppedGhosts = []
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // : use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // : return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === FOOD) updateScore(1);
    if (nextCellContent === SUPER_FOOD && !gPacman.isSuper) {
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false;
            return;
        }, 5000)
    } else if (nextCellContent === SUPER_FOOD && gPacman.isSuper) return
    
    // : hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        if (!gPacman.isSuper) {
            isWin = false;
            gameOver();
            return;
        } else {
            var eatenGhost = getEatenGhost(nextLocation)
            gPoppedGhosts.push(gGhosts.pop(eatenGhost));
            setTimeout(() => {
                gGhosts = gPoppedGhosts;
                return
            }, 5000)
        }
    }
    if (nextCellContent === CHERRY) updateScore(10)

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // : update the DOM
    renderCell(gPacman.location, EMPTY);
    // : Move the pacman to new location
    gPacman.location = nextLocation;
    // : update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN;
    // : update the DOM
    gPacman.isSuper ? renderCell(nextLocation, getPacmanHTML()) : renderCell(nextLocation, getPacmanHTML())
    
    if (nextCellContent === EMPTY && nextCellContent != PACMAN) {
        gEmptyLocations.push(nextLocation)
    }
}


function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };

    // : figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            direction = '0deg'
            break;
        case 'ArrowUp':
            nextLocation.i--;
            direction = '180deg'
            break;
        case 'ArrowRight':
            nextLocation.j++;
            direction = '270deg'
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            direction = '90deg'
            break;
    }
    return nextLocation;
}

function getPacmanHTML() {
    return `<div id="pacman" style="transform:rotate(${direction})">${gPacman.isSuper ? SUPER_PACMAN : PACMAN}</div>`;
}