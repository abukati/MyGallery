'use strict'

// Board mining configuration

var gMines = []

function setMinesPos(matI, matJ, mineCount) {
   for (var i = 0; i < mineCount; i++) {
      var cell = {
         i: getRandNum(0, gLevel.size - 1),
         j: getRandNum(0, gLevel.size - 1)
      }
      if (!gGame.isOn) {
         while (matI == cell.i && matJ == cell.j) {
            cell.i = getRandNum(0, gLevel.size - 1)
            cell.j = getRandNum(0, gLevel.size - 1)
         }
      }
      gMines.push(cell)
   }
   return gMines
}


function setNewMinePos(matI, matJ, mineCount) {

   for (var i = 0; i < mineCount; i++) {
      do {
         var cell = {
            i: getRandNum(0, gLevel.size - 1),
            j: getRandNum(0, gLevel.size - 1)
         }
      } while (matI == cell.i && matJ == cell.j)
   }
   return cell
}


function setMines(board, minesPos) {
   for (var i = 0; i < minesPos.length ; i++) {
      if (!board[minesPos[i].i][minesPos[i].j].isMine) {
         board[minesPos[i].i][minesPos[i].j].isMine = true
      } else {
         var newPos = setNewMinePos(minesPos[i].i, minesPos[i].j, 1)
         board[newPos.i][newPos.j].isMine = true
      }
   }
}


function setMinesNegsCount(mat, rowIdx, colIdx) {
   var count = 0
   for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i > mat.length - 1) continue
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
         if (j < 0 || j > mat[0].length - 1) continue
         if (i == rowIdx && j == colIdx) continue
         if (mat[i][j].isMine) count++
      }
   }
   return count
}