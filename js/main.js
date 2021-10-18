'use strict'

$(document).ready(initPage)

function initPage() {
   renderGallry()
}

$('.contact').click(() => {
   var email = $('.email').val()
   var subject = $('.subject').val()
   var body = $('.body').val()
   window.open(`mailto:${email}?subject=${subject}&body=${body}`)
})

function renderGallry() {
   const projects = getProjects()
   const strHtml = projects.map(project => {
      return `<div class="col-md-4 col-sm-6 portfolio-item">
                  <a class="portfolio-link" data-toggle="modal" data-id="${project.id}" href="#portfolioModal1">
                  <div class="portfolio-hover">
                     <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                     </div>
                  </div>
                  <img class="img-fluid d-flex align-items-center" src="../img/portfolio/${project.id}.jpg" alt="">
                  </a>
                  <div class="portfolio-caption">
                  <h4>${project.name}</h4>
                  <p class="text-muted">${project.labels}</p>
                  </div>
               </div>`
   }).join('')
   $('.portfolio-thumbnail').html(strHtml)
   
   var elModalLink = $('.portfolio-link')
   elModalLink.click(function() {
      renderModal($(this).data('id'))
   })
}

function renderModal(id) {
   $('.portfolio-modal').show().css('opacity', 1)
   var project = getProjectById(id)
   const strHtml = `<h2>${project.name}</h2>
         <p class="item-intro text-muted">${project.title}</p>
         <img class="img-fluid d-block mx-auto" src="../img/portfolio/${project.id}.jpg" alt="">
         <p>${project.description}</p>
         <ul class="list-inline">
         <li>Date: ${project.publishedAt}</li>
         <li>Client: ${project.client}</li>
         <li>Categories: ${project.labels}</li>
         </ul>
         <button class="btn btn-outline-success checkout">See it in action</button>
         <button class="btn btn-primary mt-3 dismiss" data-dismiss="modal" type="button">
         <i class="fa fa-times"></i>
         Close Project</button>`

   $('.modal-body').html(strHtml)
   $('.dismiss').click(() => $('.portfolio-modal').hide().css('opacity', 0))
   $('.checkout').click(() => window.open(project.url))
}