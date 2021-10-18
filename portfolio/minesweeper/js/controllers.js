'use strict'

// Disable default RMB functionality

window.document.oncontextmenu = (e) => {
   e.preventDefault()
}

// Get select menu value for level and listen for change event

var elScoresLevel = document.querySelector('span')
var elLevel = document.getElementById('difficulty')
// var levelMode = elLevel.value

elLevel.addEventListener('change', (e) => {
   var levelMode = e.target.value
   if(levelMode == 4) {
      gLevel.size = 4
      gLevel.mines = 2
      elScoresLevel.innerText = 'begginer'
   } else if(levelMode == 8) {
      gLevel.size = 8
      gLevel.mines = 12
      elScoresLevel.innerText = 'medium'
   } else if(levelMode == 12) {
      gLevel.size = 12
      gLevel.mines = 30
      elScoresLevel.innerText = 'expert'
   } else if(levelMode == 'custom') {
      toggleCustomMode()
   }
   // else if (levelMode == '7th')
   resetScores()
   elBombs.innerHTML = `<p>${MINE}x${gLevel.mines}</p>`
   resetGame()
})

var gLevel = {
   size: 4,
   mines: 2,
}

// Global variables declarations

const MINE = '<img src="./misc/imgs/bomb.png" />'
const BLOWN_MINE = '<img src="./misc/imgs/clickedbomb.png">'
const FLAG = '<img style="width:30px; height:30px;" src="./misc/imgs/flag.png" />'
const HINT = '<img style="width:20px;" src="./misc/imgs/hint.png" />'
const LIFE = '<img style="width:20px;" src="./misc/imgs/life.png" />'
const SMILEY = '<img onclick="resetGame()" src="./misc/imgs/happy.png" />'
const SURPRISED = '<img onclick="resetGame()" src="./misc/imgs/surprised.png" />'
const INJURED_SMILEY = '<img onclick="resetGame()" src="./misc/imgs/injured.png" />'
const DEAD_SMILEY = '<img onclick="resetGame()" style="width:27px" src="./misc/imgs/dead.png" />'
const WIN_SMILEY = '<img onclick="resetGame()" src="./misc/imgs/win.png" />'