'use strict'

// Game progression control functions

var elSmiley = document.querySelector('.smiley')
var elBombs = document.querySelector('.bombs')
var elUndo = document.querySelector('.undo')
var elSafeBtn = document.querySelector('.safe-click')


var gGame = {
   isOn: false,
   shownCount: 0,
   markCount: 0,
   isCustom: false,
   isSafe: false,
   isWin: false,
   isHint: false,
}

var gUndo = {
   cellInf: [],
   boardStat: []
}

var gMinesToPlace
var gSafe = 3
var gHintCount = 3


function initGame() {
   if (window.performance.getEntriesByType('navigation').map((nav) => nav.type).includes('reload')) {
      window.localStorage.clear()
   }
   buildBoard()
   gLevel.size == 4 ? renderLives(2) : renderLives(3)
   renderHints(gHintCount)
   elSmiley.innerHTML = SMILEY
   elBombs.innerHTML = `<p>${MINE}x${gLevel.mines}</p>`
}


function gameStarter(elCell, i, j) {
   startTimer()
   var minePositions = [] 
   minePositions = gGame.isCustom ? gMines : setMinesPos(i, j, gLevel.mines)
   gGame.isOn = true
   setMines(gBoard, minePositions)
   cellClicked(elCell, i, j)
}


function checkGame() {
   if (!gLives.length) {
      renderMinedCells(gMines)
      gGame.isWin = false
      gGame.isOn = false
      pauseTimer()
      elSmiley.innerHTML = DEAD_SMILEY
   }
   else if (gLevel.mines == gGame.markCount) {
      gGame.isWin = true
      gGame.isOn = false
      pauseTimer()
      elSmiley.innerHTML = WIN_SMILEY
   }
   else if (gGame.shownCount == (gLevel.size**2)) {
      gGame.isWin = true
      gGame.isOn = false
      pauseTimer()
      elSmiley.innerHTML = WIN_SMILEY
   }
}


function resetGame() {
   gGame = {
      isOn: false,
      shownCount: 0,
      markCount: 0,
      isCustom: gGame.isCustom,
      isSafe: false,
      isWin: false,
      isHint: false,
   }
   gUndo = {
      cellInf: [],
      boardStat: []
   }
   gBoard = []
   gMines = []
   gLives = []
   gHints = []
   gFlagCounter = 0
   gHintCount = 3
   resetTimer()
   initGame()
}


function renderLives(lives) {
   var elLives = document.querySelector('.lives')
   var strHTML = ''
   gLives = []
   for (var i = 0; i < lives; i++) {
      gLives.push(`life${i}`)
      strHTML += LIFE
   }
   elLives.innerHTML = strHTML
}


function toggleCustomMode() {
   if (!gGame.isCustom) {
      gGame.isCustom = true
      gMinesToPlace = gLevel.mines
   } 
   // else {

   // }
}
