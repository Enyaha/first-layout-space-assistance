const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      slides = document.querySelector('.examples__slides'),
      slide = document.querySelectorAll('.examples__slide'),
      task = document.querySelector('.examples__task'),
      decision = document.querySelector('.examples__decision'),
      arrowLeft = document.querySelector('.examples__arrow-left'),
      arrowRight = document.querySelector('.examples__arrow-right'),
      countSlider = document.querySelector('.examples__count');

// hamburger
hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

// slider desktop
let offsetSlider = 0;
let offsetTask = 0;
let count = 1;

arrowRight.addEventListener('click', () => {
    offsetSlider += 306;
    offsetTask += 740;
    count += 1;
    if (offsetSlider > 918) {
        offsetSlider = 918;
        offsetTask = 2220;
        count = 4;
    } 
    if (count == 4) {
        document.querySelectorAll('.examples__arrow-right path')[0]
                                   .attributes.fill.nodeValue = '#C4C4C4';
    }
    if (count > 1) {
        document.querySelectorAll('.examples__arrow-left path')[0]
                                   .attributes.fill.nodeValue = '#1A3D8A';
    }

    slides.style.left = `-${offsetSlider}px`;
    task.style.left = `-${offsetTask}px`;
    decision.style.left = `-${offsetTask}px`;
    countSlider.innerHTML = `${count}/4`;
});

arrowLeft.addEventListener('click', () => {
    offsetSlider -= 306;
    offsetTask -= 740;
    count -= 1;
    if (offsetSlider < 0) {
        offsetSlider = 0;
        offsetTask = 0;
        count = 1;
    }
    if (count < 4) {
        document.querySelectorAll('.examples__arrow-right path')[0]
                                   .attributes.fill.nodeValue = '#1A3D8A';
    }
    if (count == 1) {
        document.querySelectorAll('.examples__arrow-left path')[0]
                                   .attributes.fill.nodeValue = '#C4C4C4';
    }

    slides.style.left = `-${offsetSlider}px`;
    task.style.left = `-${offsetTask}px`;
    decision.style.left = `-${offsetTask}px`;
    countSlider.innerHTML = `${count}/4`;
});
