'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// selector for 'learn more' button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');



const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener
  ('click', openModal));



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// SCROLLING when you click on learn more
btnScrollTo.addEventListener('click', function(e){
  section1.scrollIntoView({behavior: 'smooth'});
  
});



// 1.add event lister to common parent element
document.querySelector('.nav__links').addEventListener
('click', function(e){
  e.preventDefault()
  const target = e.target;
  if ( target.classList.contains('nav__link')){
    // 2. determine what element originate the event
    const id = target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    console.log(e.target);
  }
});





tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.btn');
  // guard clause
  if(!clicked) return;
  // active tab
  tabs.forEach((el) => 
  el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // active content area
  tabsContent.forEach((el) => 
  el.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked
    .dataset.tab}`).classList.add('operations__content--active')
  
})
