let slidePosition = 0;
const slides = document.getElementsByClassName('carousel__item');
const dots = document.getElementsByClassName('dot');
const totalSlides = slides.length;

document.
  getElementById('carousel__button--next')
  .addEventListener("click", function() {
    moveToNextSlide();
  });
document.
  getElementById('carousel__button--prev')
  .addEventListener("click", function() {
    moveToPrevSlide();
  });

Array.from(dots).forEach(function(element, index) {
  element.setAttribute('data-index', index);
  element.addEventListener('click', updateSlideOnDotClick);
});

function updateSlideOnDotClick(){
  slidePosition = parseInt(this.getAttribute('data-index'));
  updateSlidePosition();
}

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove('carousel__item--visible');
    slide.classList.add('carousel__item--hidden');
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }

  slides[slidePosition].classList.add('carousel__item--visible');
  dots[slidePosition].classList.add('active');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}

// Swipe logic
let touchstartX = 0,
  touchstartY = 0,
  touchendX = 0,
  touchendY = 0;

const carousel = document.getElementsByClassName('carousel')[0];

carousel.addEventListener('touchstart', function(event) {
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
}, false);

carousel.addEventListener('touchend', function(event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleSwipe();
}, false);

function handleSwipe() {
  // swipe left
  if (touchendX < touchstartX) {
    moveToNextSlide();
  }

  // swipe right
  if (touchendX > touchstartX) {
    moveToPrevSlide();
  }

  // swipe up
  if (touchendY < touchstartY) {

  }

  // swipe down
  if (touchendY > touchstartY) {

  }

  // tap
  if (touchendY === touchstartY) {

  }
}

// Check if carousel is in viewport
function carouselInViewport(){
  let carouselTop = carousel.getBoundingClientRect().top + document.body.scrollTop,
      carouselBottom = carouselTop + carousel.offsetHeight,
      viewportTop = window.scrollY,
      viewportBottom = viewportTop + window.innerHeight;

  return carouselBottom > viewportTop && carouselTop < viewportBottom;
};

// Arrow Key Detection
document.addEventListener('keydown', function(event){
  if (carouselInViewport()){
    // left arrow key
    if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();
      moveToPrevSlide();
    }
    // right arrow key
    if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();
      moveToNextSlide();
    }
  } else {
  return false;
  }
});
