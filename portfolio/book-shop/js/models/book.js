'use strict'

function onInit() {
   renderBooks()
   // page amount controls
   // Keep global track of pages to books ratio
}

function renderBooks() {
   var books = getBooks()
   var bookKeys = Object.keys(...books)
   bookKeys.splice(bookKeys.length - 1)
   var elTable = document.querySelector('.table')
   var thStrs = '<tr>'
   thStrs += bookKeys.map(key => `<th class="${key}" onclick="onSetSortBy('${key}')">${key}</th>`)
   thStrs += '<th></th><th>Actions</th></tr>'
   elTable.innerHTML = thStrs.replace(/,/g, '')
   var tbodyStrs = books.map(book => {
      return `<tr><td>${book.id}</td><td>${book.title}</td><td>$${book.price}</td>
      <td><button class="btn btn-primary btn-sm" onclick="onReadBook('${book.id}')">Read</button></td><td>
      <button class="btn btn-warning btn-sm" onclick="onUpdateBook('${book.id}')">Update</button>
      <button class="btn btn-danger btn-sm" onclick="onRemoveBook('${book.id}')">Delete</button></td></tr>`
   })
   elTable.innerHTML += tbodyStrs.join('')
}

function onAddBook() {
   var elAddModal = document.querySelector('.create-book-modal')
   var elForm = elAddModal.querySelector('.add-book-form')
   elAddModal.hidden = false
   elForm.onsubmit = (ev) => {
      ev.stopPropagation()
      var formData = new FormData(ev.target)
      var bookTitle = formData.get('title')
      var bookPrice = formData.get('price')
      addBook(bookTitle, bookPrice)
      renderBooks()
   }
}

function onReadBook(bookId) {
   var elDetailsModal = document.querySelector('.book-details-modal')
   elDetailsModal.hidden = false
   var book = getBookById(bookId)
   var strHtml = `<div class="text-center"><img class="rounded" src="${book.imgUrl}" /></div>
            <div class="close-modal"><button class="btn btn-outline-danger btn-sm" onclick="onCloseModal()">X</button></div>
            <div class="h2">${book.title} <span class="text-muted">$${book.price}</span></div>
            <div class="h6">${book.desc}</div>
            <div class="mt-3 h5 text-muted">
            <p>Leave a rating:</p>
            <fieldset class="starability-basic">
               <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="1" checked />
               <input type="radio" id="first-rate1" name="rating" value="1" />
               <label for="first-rate1" title="Terrible">1 star</label>
               <input type="radio" id="first-rate2" name="rating" value="2" />
               <label for="first-rate2" title="Not good">2 stars</label>
               <input type="radio" id="first-rate3" name="rating" value="3" />
               <label for="first-rate3" title="Average">3 stars</label>
               <input type="radio" id="first-rate4" name="rating" value="4" />
               <label for="first-rate4" title="Very good">4 stars</label>
               <input type="radio" id="first-rate5" name="rating" value="5" />
               <label for="first-rate5" title="Amazing">5 stars</label>
            </fieldset>
            </div>`
   elDetailsModal.innerHTML = strHtml
}

function onCloseModal() {
   document.querySelector('.book-details-modal').hidden = true
}

function onUpdateBook(bookId) {
   var elUpdateModal = document.querySelector('.update-book-modal')
   var elForm = elUpdateModal.querySelector('.update-book-form')
   var elTitleInput = elForm.querySelector('#title')
   var elPriceInput = elForm.querySelector('#price')
   var book = getBookById(bookId)
   elUpdateModal.hidden = false
   elTitleInput.value = book.title
   elPriceInput.value = book.price
   elForm.onsubmit = (ev) => {
      ev.stopPropagation()
      var formData = new FormData(ev.target)
      var bookPrice = formData.get('price')
      updateBook(bookId, bookPrice)
      renderBooks()
   }
}

function onRemoveBook(bookId) {
   removeBook(bookId)
   renderBooks()
}

function onSetSortBy(sortBy) {
   setSort(sortBy)
   renderBooks()
}

function onChangePage(pageIdx) {
   changePage(pageIdx)
   var elPrevPage = document.querySelector('.prev-page')
   var elNextPage = document.querySelector('.next-page')
   var elPageNums = document.querySelectorAll('.page-num')

   gPageIdx > 0 ? elPrevPage.classList.toggle('disabled') : elPrevPage.classList.toggle('disabled')
   gPageIdx = elPageNums.length ? elNextPage.classList.toggle('disabled') 
   : elNextPage.classList.toggle('disabled')

   renderBooks()
}