'use strict'

const KEY = 'books'
const PAGE_SIZE = 5

var gTitles = ['Forrest Gump', 'JavaScript for Dummies', 'SQL for Dummies', 'Max OS X for Dummies',
      'The Great Gatsby', 'Moby Dick','The Little Prince', 'Sapiens a Brief History of Humankind']
var gPageIdx = 0
var gBooks
var gSortBy = ''

_createBooks()


function setSort(sortBy) {
   gSortBy = sortBy
   switch (gSortBy) {
      case 'title': {
         return gBooks.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
      }
      case 'price': {
         return gBooks.sort((a,b) => a.price - b.price)
      }
      case 'id': {
         return gBooks.sort((a,b) => a.id > b.id ? 1 : -1)
      }
      default: break
   }
}

function addBook(title, price) {
   var book = _createBook(title, price)
   gBooks.push(book)
   _saveBooksToStorage()
}

function updateBook(bookId, price) {
   var bookIdx = getBookIdx(bookId)
   gBooks[bookIdx].price = price
   _saveBooksToStorage()
}

function removeBook(bookId) {
   var bookIdx = gBooks.findIndex(book => bookId === book.id)
   gBooks.splice(bookIdx, 1)
   _saveBooksToStorage()
}

function getBookIdx(bookId) {
   return gBooks.findIndex(book => book.id === bookId)
}

function getBookById(bookId) {
   var book = gBooks.find(book => bookId === book.id)
   return book
}

function changePage(idx) {
   if (idx === '--' && gPageIdx > 0) gPageIdx--
   else if (idx === '++' && gPageIdx < elPageNums.length) gPageIdx++
   else gPageIdx = parseInt(idx)

   if (gBooks.length > 10) addPages()
}

function addPages() {
   var elPageNums = document.querySelectorAll('.page-num')
   var currLastPage = elPageNums[elPageNums.length-1]
   var elLi = document.createElement('li')
   elLi.setAttribute('class', 'page-item page-num')
   var elAnchor = document.createElement('a')
   elAnchor.setAttribute('class', 'page-link')
   elAnchor.setAttribute('href', '#')
   elAnchor.setAttribute('onclick', `onChangePage('${gPageIdx+1}')`)
   elAnchor.innerText = gPageIdx + 2
   elLi.appendChild(elAnchor)
   currLastPage.after(elLi)
}

function getBooks() {
   var elPageNums = document.querySelectorAll('.page-num')
   elPageNums.forEach(elPage => elPage.innerText == (gPageIdx+1) ? elPage.classList.add('active') 
   : elPage.classList.remove('active'))
   // move to controller

   var books = gBooks
   if (gSortBy) books = setSort(gSortBy)
   const fromIdx = gPageIdx * PAGE_SIZE
   books = books.slice(fromIdx, fromIdx + PAGE_SIZE)
   return books
}

function _createBook(title, price = getRandomIntInclusive(5,20)) {
   return {
      id: makeId(),
      title,
      price,
      desc: makeLorem(),
      imgUrl: `./imgs/${title}.jpg`
   }
}

function _createBooks() {
   var books = loadFromStorage(KEY)
   if (!books || !books.length) books = gTitles.map(title => _createBook(title))
   gBooks = books
   _saveBooksToStorage()
}

function _saveBooksToStorage() {
   saveToStorage(KEY, gBooks)
}