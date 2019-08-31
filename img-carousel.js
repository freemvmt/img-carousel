// JS specific to image carousel
// line of attack: make hidden all but the --active carousel__img element

// start by grabbing essential nodes
const leftBtn = document.querySelector('.slider__button--left');
const rightBtn = document.querySelector('.slider__button--right');
const images = [...document.querySelectorAll('.slider__img')]; // returns an array of the img nodes
const navBtns = [...document.querySelectorAll('.slider__nav-btn')]; // returns an array of navBtn nodes
console.log(document.querySelectorAll('slider__nav-btn'));
console.log(navBtns);

// write first function, for moving to next image
// be careful to code for ANY number of images (we want generality)
const slideRight = function(event) {
  if (event.target == rightBtn) { // proceed only if right button is clicked
    let activeImage = document.querySelector('.slider__img--active'); // select image currently shown
    let i = images.indexOf(activeImage); // index in array of images
    if (images[i+1]) { // if not the last image in list
      let nextImage = images[i+1];
      activeImage.setAttribute('hidden', true); // hide active image
      nextImage.removeAttribute('hidden'); // unhide next image
      activeImage.classList.remove('slider__img--active'); // remove active class from old image
      nextImage.classList.add('slider__img--active'); // add active class to new image
      navBtns[i].classList.remove('slider__nav-btn--active'); // adjust navBtns similarly
      navBtns[i+1].classList.add('slider__nav-btn--active');
    } else { // else image is last in list so we loop round to first instead
      let nextImage = images[0];
      activeImage.setAttribute('hidden', true);
      nextImage.removeAttribute('hidden')
      activeImage.classList.remove('slider__img--active');
      nextImage.classList.add('slider__img--active');
      navBtns[i].classList.remove('slider__nav-btn--active');
      navBtns[0].classList.add('slider__nav-btn--active');
    }
  }
}

// write second function, for moving to previous image
// const slideLeft = function(event) {}

addEventListener('click',slideRight); // remember not to call function when specifying it as handler!
// addEventListener('click',slideLeft);
