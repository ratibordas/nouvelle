const navigationPages = document.querySelector('.navigation__pages');
const navigationButton = document.querySelector('.navigation__button');

navigationButton.addEventListener('click', event => {
    navigationPages.classList.toggle('navigation__pages--active');
});
