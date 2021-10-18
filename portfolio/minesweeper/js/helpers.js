'use strict'

var elHintsCon = document.querySelector('.hints')
var elHints = elHintsCon.getElementsByTagName('img')


function renderHints(hints) { 
   var strHTML = ''
   gHints = []
   for (var i = 0; i < hints; i++) {
      gHints.push(`hint${i}`)
      strHTML += HINT
   }
   elHintsCon.innerHTML = strHTML
   for (var hint of elHints) {
      hint.addEventListener('click', useHint)
   }
}

function useHint() {
   gGame.isHint = true
   gHintCount--
   gHints.pop()
   renderHints(gHintCount)
}

function showHint(matI, matJ) {
   for (var i = matI - 1; i <= matI + 1; i++) {
      if (i < 0 || i > gBoard.length - 1) continue
      for (var j = matJ - 1; j <= matJ + 1; j++) {
         if (j < 0 || j > gBoard[0].length - 1) continue
         var cell = gBoard[i][j]
         if (!cell.isShown && !cell.isMarked) {
            var negCount = setMinesNegsCount(gBoard, i, j)
            renderCell(negCount, i, j)
            if (cell.isMine) renderCell(MINE, i, j)
         }
      }
   }
}

function undoMove() {
   if (gGame.isHint) return
   if (!gGame.isOn) return
   if (!gUndo.boardStat.length) return
   var info = gUndo.cellInf.pop()
   if (gLevel.mines == 2 && gLives.length != 2) gLives.push(info.lives++)
   else if (gLevel.mines > 2 && gLives.length != 3) gLives.push(info.lives++)
   renderLives(gLives.length)
   gBoard = gUndo.boardStat.pop()
   renderUndoBoard(gBoard)
}

function renderUndoBoard(board) {
   for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
         var elCell = document.querySelector(`.cell-${i}-${j}`)
         if (board[i][j].isShown) {
            elCell.classList.remove('clicked')
            elCell.innerHTML = ''
            gGame.shownCount--
            board[i][j].isShown = false
         }
      }
   }
}