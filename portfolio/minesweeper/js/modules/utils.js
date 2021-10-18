function getRandNum(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createMat(size) {
   var mat = []
   for (var i = 0; i < size; i++) {
      mat[i] = []
      for (var j = 0; j < size; j++) {
         mat[i][j] = gCell = {
            minesAroundCount: 0,
            isShown: false,
            isMine: false,
            isMarked: false,
            isHint: false
         }
      }
   }
   return mat
}


function copyMat(mat) {
   var newMat = []
   for (var i = 0; i < mat.length; i++) {
      newMat[i] = []
      for (var j = 0; j < mat[0].length; j++) {
         newMat[i][j] = mat[i][j]
      }
   }
   return newMat
}


function printMat(mat, selector) {
   var strHTML = '<table class="board-container"><tbody>'
   for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>'
      for (var j = 0; j < mat[0].length; j++) {
         var className = `cell cell-${i}-${j}`
         strHTML += `<td class="${className}" id="${i}${j}" onclick="cellClicked(this, ${i}, ${j})" 
         oncontextmenu="cellMarked(this, ${i}, ${j})"></td>`
      }
      strHTML += '</tr>'
   }
   strHTML += '</tbody></table>'
   var elContainer = document.querySelector(selector)
   elContainer.innerHTML = strHTML
}