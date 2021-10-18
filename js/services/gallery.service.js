'use strict'

const gProjects = [
   {
      id: 'minesweeper',
      name: 'MineSweeper',
      title: 'Renewal for a pure classic with extra features to match the new age',
      desc: makeLorem(),
      url: '../portfolio/minesweeper',
      publishedAt: _makeDate(),
      labels: ['Matrix', 'DOM Manipulation'],
      client: makeLorem(1),
      img: '../img/portfolio/minesweeper.jpg'
   },
   {
      id: 'pacman',
      name: 'Pacman',
      title: 'Remake for one of the most iconic arcade games ever',
      desc: makeLorem(),
      url: '../portfolio/pacman',
      publishedAt: _makeDate(),
      labels: ['Matrix', 'Key events'],
      client: makeLorem(1),
      img: '../img/portfolio/pacman.jpg'
   },
   {
      id: 'bookshop',
      name: 'Bookshop',
      title: 'Bookshop menagment with basic CRUD functionality',
      desc: makeLorem(),
      url: '../portfolio/book-shop',
      publishedAt: _makeDate(),
      labels: ['CRUD', 'DOM Manipulation'],
      client: makeLorem(1),
      img: '../img/portfolio/bookshop.jpg'
   }
]

function getProjects() { 
   return gProjects 
}

function getProjectById(id) {
   return gProjects.find(project => project.id === id)
}

function makeLorem(size = 20) {
   var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
   var txt = ''
   while (size > 0) {
      size--
      txt += words[Math.floor(Math.random() * words.length)] + ' '
   }
   return txt
}

function _makeDate() { 
   return Date().slice(0,24)
}