'use strict'

// Board construction and individual cells functionality

var gBoard = []
var gLives = []
var gHints = []
var gFlagCounter = 0

function buildBoard() {
   gBoard = createMat(gLevel.size)
   printMat(gBoard, '.game-board')
}

function buildCustomBoard() {
   printMat(gBoard, '.game-board')
}

function cellClicked(elCell, i, j) {
   if (!gGame.isOn && !gGame.shownCount) {
      gameStarter(elCell, i, j)
      return
   }
   if (!gGame.isOn) return
   if (gGame.isHint) {
      showHint(i, j)
      gGame.isHint = false
      return
   }
   if (gGame.isCustom) {
      gBoard[i][j].isMine = true
      gMines.push({i, j})
      renderCell(MINE, i, j)
      gMinesToPlace--
      if (!gMinesToPlace) {
         closeMinedCells(gMines)
         buildCustomBoard()
         gGame.isCustom = false
         return
      }
      return
   }
   if (elCell.classList.contains('clicked')) return
   if (gBoard[i][j].isMarked) return
   if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
      var inf = {
         lives: gLives.length,
         clickedCells: gGame.shownCount,
         flagCount: gGame.markCount
      }
      gUndo.boardStat.push(copyMat(gBoard))
      gUndo.cellInf.push(inf)
      console.log(gUndo);
      gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
      if (!gBoard[i][j].minesAroundCount) {
         renderCell('', i, j)
         expandReveal(gBoard, i, j)
      } else {
         renderCell(gBoard[i][j].minesAroundCount, i, j)
      }
      return
   }
   if (gBoard[i][j].isMine) {
      gGame.markCount++
      renderCell(BLOWN_MINE, i, j)
      elSmiley.innerHTML = INJURED_SMILEY
      gLives.pop()
      renderLives(gLives.length)
      checkGame()
      return
   }
}


function expandReveal(board, matI, matJ) {
   if (!board[matI][matJ].isMine && !gGame.isHint) {
      for (var i = matI - 1; i <= matI + 1; i++) {
         if (i < 0 || i > gBoard.length - 1) continue
         for (var j = matJ - 1; j <= matJ + 1; j++) {
            if (i == matI && j == matJ) continue
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (board[i][j].isMine) {
               gGame.markCount++
               continue
            }
            if (board[i][j].isShown) continue
            if (board[i][j].isMarked) continue
            var negCount = setMinesNegsCount(gBoard, i, j)
            gBoard[i][j].minesAroundCount = negCount
            if (negCount > 0) {
               renderCell(negCount, i, j)
            }
            else {
               renderCell('', i, j)
               expandReveal(gBoard, i, j)
            }
         }
      }
   }
}


function cellMarked(elCell, i, j) {
   if (!gGame.isOn) return
   if (elCell.classList.contains('clicked')) return
   if (!gBoard[i][j].isMarked) {
      if (gFlagCounter > gLevel.mines) return
      gBoard[i][j].isMarked = true
      gFlagCounter++
      elCell.innerHTML = FLAG
      if (gBoard[i][j].isMine) {
         gGame.shownCount++
         gGame.markCount++
      }
   } else {
      gBoard[i][j].isMarked = false
      gFlagCounter--
      elCell.innerText = ''
      if (gBoard[i][j].isMine) gGame.markCount--
   }
   checkGame()
}


function renderCell(value, i, j) {
   var elCell = document.querySelector(`.cell-${i}-${j}`)
   elCell.classList.add('clicked')
   if (!gGame.isHint) {
      gBoard[i][j].isShown = true
      gGame.shownCount++
   } else {
      setTimeout(() => {
         elCell.classList.remove('clicked')
         elCell.innerHTML = ''
      }, 1500)
   }
   elCell.innerHTML = (value == 0) ? '' : value
}


function renderMinedCells(mines) {
   for (var mine of mines) {
      if (!gBoard[mine.i][mine.j].isShown) {
         renderCell(MINE, mine.i, mine.j)
      }
   }
}


function closeMinedCells(mines) {
   for (var mine of mines) {
      if (gBoard[mine.i][mine.j].isShown) {
         var elCell = document.querySelector(`.cell-${mine.i}-${mine.j}`)
         elCell.classList.remove('clicked')
      }
   }
}
