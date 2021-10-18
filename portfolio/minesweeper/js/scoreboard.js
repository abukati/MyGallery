'use strict'

function timeToString(time) {
   var diffInHrs = time / 3600000
   var hh = Math.floor(diffInHrs)
 
   var diffInMin = (diffInHrs - hh) * 60
   var mm = Math.floor(diffInMin)
 
   var diffInSec = (diffInMin - mm) * 60
   var ss = Math.floor(diffInSec)
 
   var diffInMs = (diffInSec - ss) * 100
   var ms = Math.floor(diffInMs)
   
   var formattedMM = mm.toString().padStart(2, '0')
   var formattedSS = ss.toString().padStart(2, '0')
   
   return `${formattedMM}:${formattedSS}`
}

var startTime
var elapsedTime = 0
var timerInterval

function print(txt) {
   document.querySelector('.timer').innerHTML = txt
}

function startTimer() {
   startTime = Date.now() - elapsedTime
   timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime
      print(timeToString(elapsedTime))
   })
}


function pauseTimer() {
   clearInterval(timerInterval)
   renderScoreboard()
   timerInterval = null
}


function resetTimer() {
   clearInterval(timerInterval)
   print('00:00')
   elapsedTime = 0
   timerInterval = null
}


function renderScoreboard() {
   var begginerScores = []
   var mediumScores = []
   var expertScores = []

   var elScoreCon = document.querySelector('.best-scores')
   var elBestScores = elScoreCon.querySelector('ul')
   var timeStr = timeToString(elapsedTime)
   var li = document.createElement('li')
   var elList = document.querySelectorAll('li')

   if (gGame.isWin) {
      if (elList.length && elList[0].innerHTML > timeStr) {
         localStorage.setItem(`${gLevel.size}`, timeStr)
         gLevel.size == 4 ? begginerScores.push(timeStr)
         : gLevel.size == 8 ? mediumScores.push(timeStr)
         : expertScores.push(timeStr)
      } else if (!localStorage.bestScore){
         localStorage.setItem(`${gLevel.size}`, timeStr)
         gLevel.size == 4 ? begginerScores.push(timeStr)
         : gLevel.size == 8 ? mediumScores.push(timeStr)
         : expertScores.push(timeStr)
      }
   }
   if (gLevel.size == 4) {
      for (var begScore of begginerScores) {
         li.innerText = begScore;
         (elList.length && elList[0].innerHTML > timeStr)
         ? elBestScores.insertBefore(li, elList[0])
         : elBestScores.appendChild(li)
      }
   } else if (gLevel.size == 8) {
      for (var medScore of mediumScores) {
         li.innerText = medScore;
         (elList.length && elList[0].innerHTML > timeStr) 
         ? elBestScores.insertBefore(li, elList[0])
         : elBestScores.appendChild(li)
      }
   } else if (gLevel.size == 12) {
      for (var expScore of expertScores) {
         li.innerText = expScore;
         (elList.length && elList[0].innerHTML > timeStr) 
         ? elBestScores.insertBefore(li, elList[0])
         : elBestScores.appendChild(li)
      }
   }
}


function resetScores() {
   var elScoreCon = document.querySelector('.best-scores')
   var elBestScores = elScoreCon.querySelector('ul')
   var elList = elBestScores.querySelectorAll('li')
   for (var li of elList) {
      elBestScores.removeChild(li)
   }
}