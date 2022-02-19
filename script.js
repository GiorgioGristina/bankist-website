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
// selector for fading animation
const navContainer = document.querySelector('.nav');
// selector for sticky nav
const header = document.querySelector('.header');

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
  
  
  // menu fade animation
  const handlHover = function(e){
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').
      querySelectorAll('.nav__link');
    const logo = link.closest('.nav').
    querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

navContainer.addEventListener('mouseover', handlHover.bind(0.5));

navContainer.addEventListener('mouseout', handlHover.bind(1));


// sticky nav: intersection observer api
const navHeight = navContainer.getBoundingClientRect().height


// console.log(navHeight);
const stickyNav = function(entries){
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) navContainer.classList.add('sticky')
  else navContainer.classList.remove('sticky')
}

const observerOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
};
const headerObserver = new IntersectionObserver(stickyNav, observerOption);
headerObserver.observe(header)

// REVEAL SECTION
const allSection= document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting)return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
};

const sectionObserver = new IntersectionObserver
(revealSection,{
  root: null,
  threshold: 0.15,
});

allSection.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy image 
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, 
  {
    root:null,
    threshold:0,
    rootMargin: '-200px'
  })

imgTarget.forEach(function(img){
  imgObserver.observe(img);
});

// SLIDER
const slider = function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0
  const maxSlide = slides.length;



  // functions
  const createDots = function(){
    slides.forEach((_,i) => {
      dotContainer.insertAdjacentHTML('beforeend', 
      `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };



  const activateDots = function(slide){
    document.querySelectorAll('.dots__dot').forEach(el => {
      el.classList.remove('dots__dot--active');
    });
    
    document.querySelector(`[data-slide='${slide}']`)
    .classList.add('dots__dot--active')
  };



  const goToSlide = function(slide){
    slides.forEach((s, i) => s.style.transform =
  `translateX(${100 * (i - slide)}%)` )
  };

  const nextSlide = function(){
    if (curSlide === maxSlide - 1){
      curSlide = 0
    } else {
      curSlide++
    }  
    goToSlide(curSlide);
    activateDots(curSlide);
  }


  const prevSlide = function(){
    if (curSlide === 0){
      curSlide = maxSlide - 1
    } else {
      curSlide--
    }  
    goToSlide(curSlide);
    activateDots(curSlide);
  };



  const init = function(){
    createDots();
    activateDots(0);
    goToSlide(0);
  };

  init()

  // event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e){
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();  
  });


  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')) {    
      
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);

    }
  });
};

slider();
