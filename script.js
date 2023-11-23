////////////////////////////////////////////////////////////////////////////
// Mobile Navigation
const btnNav = document.querySelector('.btn--mobile-nav');
const header = document.querySelector('.header');

btnNav.addEventListener('click', function () {
  header.classList.toggle('nav--open');
});

////////////////////////////////////////////////////////////////////////////
// Sticky Navigation
const heroSec = document.querySelector('.section__hero');
const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) document.body.classList.add('sticky');
  else document.body.classList.remove('sticky');
};

const heroSecObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
heroSecObserver.observe(heroSec);

////////////////////////////////////////////////////////////////////////////
// Page Navigation
const navLinksContainer = document.querySelector('.nav__links');

navLinksContainer.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

    if (header.classList.contains('nav--open'))
      header.classList.toggle('nav--open');
  }
});

////////////////////////////////////////////////////////////////////////////
// Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const scrollToTop = function (el) {
  const element = document.querySelector(`.${el}__logo`);

  element.addEventListener('click', function (e) {
    e.preventDefault();
    const clicked = e.target.closest(`.${el}__logo`);

    if (!clicked) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};

scrollToTop('nav');
scrollToTop('footer');

////////////////////////////////////////////////////////////////////////////
// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSec = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSec, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(sec => {
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
});

////////////////////////////////////////////////////////////////////////////
// Lazy Load
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });

      observer.unobserve(entry.target);
    }
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////////////////////////////
// Testimonial Section (Slider)
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnSliderLeft = document.querySelector('.slider__btn-left');
  const btnSliderRight = document.querySelector('.slider__btn-right');
  const dotsContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__btn" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__btn')
      .forEach(dot => dot.classList.remove('dots__btn-active'));

    document
      .querySelector(`.dots__btn[data-slide="${slide}"]`)
      .classList.add('dots__btn-active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${110 * (i - slide)}%)`)
    );
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activeDot(0);
  };
  init();

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  btnSliderRight.addEventListener('click', nextSlide);
  btnSliderLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__btn')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();

////////////////////////////////////////////////////////////////////////////
// Overview Section (Tabbed Component)
const tabsContainer = document.querySelector('.overview__tab-container');
const tabs = document.querySelectorAll('.overview__tab');
const tabsContent = document.querySelectorAll('.overview__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.overview__tab');

  if (!clicked) return;

  // Remove active items
  tabs.forEach(tab => tab.classList.remove('overview__tab--active'));
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('overview__content--active')
  );

  // Active Tab
  clicked.classList.add('overview__tab--active');

  // Active Tab Content
  document
    .querySelector(`.overview__content--${clicked.dataset.tab}`)
    .classList.add('overview__content--active');
});

////////////////////////////////////////////////////////////////////////////
// FAQS section (Accordion)
const faqsBtn = document.querySelectorAll('.faqs--item');

faqsBtn.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const clicked = e.target.closest('.faqs--item');
    const clickedLastChild = clicked.lastElementChild;

    if (!clicked) return;

    if (clickedLastChild.classList.contains('faqs--hidden')) {
      clicked.classList.add('open');
      clickedLastChild.classList.remove('faqs--hidden');
      clickedLastChild.style.marginTop = `2.4rem`;
      clickedLastChild.style.height = `${clickedLastChild.scrollHeight}px`;
    } else {
      clicked.classList.remove('open');
      clickedLastChild.classList.add('faqs--hidden');
      clickedLastChild.style.marginTop = `0`;
      clickedLastChild.style.height = `0`;
    }
  });
});

////////////////////////////////////////////////////////////////////////////
// Modal Window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const showModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnShowModal.forEach(btn => btn.addEventListener('click', showModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////
// Set Current Year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
