// JS specific to image carousel
// line of attack: make hidden all but the --active carousel__img element
// NB. be careful to code for ANY number of images (we want generality)

// start by grabbing essential target nodes
const leftBtn = document.querySelector('.slider__button--left');
const rightBtn = document.querySelector('.slider__button--right');

// write first function, for moving to next image
const slideRight = function(event) {
  let images = [...document.querySelectorAll('.slider__img')]; // returns an array of the img nodes
  let navBtns = [...document.querySelectorAll('.slider__nav-btn')]; // returns an array of navBtn nodes
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
// can just repeat the above function but logically inverted
const slideLeft = function(event) {
  let images = [...document.querySelectorAll('.slider__img')];
  let navBtns = [...document.querySelectorAll('.slider__nav-btn')];
  if (event.target == leftBtn) {
    let activeImage = document.querySelector('.slider__img--active');
    let i = images.indexOf(activeImage);
    let n = images.length;
    if (images[i-1]) {
      let prevImage = images[i-1];
      activeImage.setAttribute('hidden', true);
      prevImage.removeAttribute('hidden');
      activeImage.classList.remove('slider__img--active');
      prevImage.classList.add('slider__img--active');
      navBtns[i].classList.remove('slider__nav-btn--active');
      navBtns[i-1].classList.add('slider__nav-btn--active');
    } else {
      let prevImage = images[n-1];
      activeImage.setAttribute('hidden', true);
      prevImage.removeAttribute('hidden')
      activeImage.classList.remove('slider__img--active');
      prevImage.classList.add('slider__img--active');
      navBtns[i].classList.remove('slider__nav-btn--active');
      navBtns[n-1].classList.add('slider__nav-btn--active');
    }
  }
}

// attach these functions as handlers to click events
// remember not to call a function when specifying it as the event handler
addEventListener('click',slideRight);
addEventListener('click',slideLeft);

// write function which shows img corresponding to nav-btn clicked on
const nav = function(event) {
  let images = [...document.querySelectorAll('.slider__img')];
  let navBtns = [...document.querySelectorAll('.slider__nav-btn')];
  if (navBtns.includes(event.target)) { // only proceed if target is a nav-btn
    let i = navBtns.indexOf(event.target); // get index of nav-btn clicked on
    let target = navBtns[i]; // obviously target == event.target
    let classLengths = navBtns.map(x => x.classList.length);
    // use number of classes of each nav-btn to determine if active or inactive
    if (classLengths[i]>1) { // if button clicked is already active
      return null; // do nothing
    } else { // else button clicked is not active, and nor is the corresponding image
      let a = classLengths.indexOf(2); // get index of active button (and image)
      let activeBtn = navBtns[a]; // we could use querySelector but this is more fun
      let activeImage = images[a];
      let newImage = images[i];
      activeBtn.classList.remove('slider__nav-btn--active'); // make active button inactive
      target.classList.add('slider__nav-btn--active'); // make targeted button active
      activeImage.setAttribute('hidden', true); // then image adjustments as before
      newImage.removeAttribute('hidden');
      activeImage.classList.remove('slider__img--active');
      newImage.classList.add('slider__img--active');
    }
  }
}

// finally we attach nav function to another event handler for clicks
addEventListener('click',nav);
