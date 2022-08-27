window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // hamburger
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const closeElem = document.querySelector('.menu__close');


    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });
    
    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    // click phone
    const headerPhone = document.querySelector('.header__phone');
    const headerHandset = document.querySelector('.header__handset');

    headerHandset.addEventListener('click', () => headerPhone.click());

    // slider
    const slides = document.querySelector('.examples__slides');
    const slider = document.querySelector('.examples__slider');
    const sliderBlock = document.querySelector('.examples__block');
    const task = document.querySelector('.examples__task');
    const decision = document.querySelector('.examples__decision');
    const arrowLeft = document.querySelector('.examples__arrow-left');
    const arrowRight = document.querySelector('.examples__arrow-right');
    const countSlider = document.querySelector('.examples__count');
    const slidesLength = document.querySelectorAll('.examples__slide').length;
    const blocksLength = document.querySelectorAll('.examples__task-item').length;
    
    let offsetSlider = 0;
    let offsetTask = 0;
    let count = 1;
    let widthSlider = +getComputedStyle(slider).width.replace(/\D/g, ''); // 306
    let widthBlock = +getComputedStyle(sliderBlock).width.replace(/\D/g, ''); // 740

    function moveToRight() {
        offsetSlider += widthSlider;
        offsetTask += widthBlock;

        if (offsetSlider == widthSlider * slidesLength) {
            offsetSlider = widthSlider * (slidesLength - 1); //918
            offsetTask = widthBlock * (blocksLength - 1); // 2200
        }

        slides.style.left = `-${offsetSlider}px`;
        task.style.left = `-${offsetTask}px`;
        decision.style.left = `-${offsetTask}px`;
    }

    function moveToLeft() {
        offsetSlider -= widthSlider;
        offsetTask -= widthBlock;

        if (offsetSlider < 0) {
            offsetSlider = 0;
            offsetTask = 0;
        }

        slides.style.left = `-${offsetSlider}px`;
        task.style.left = `-${offsetTask}px`;
        decision.style.left = `-${offsetTask}px`;
    }


    arrowRight.addEventListener('click', () => {
        moveToRight();
        count += 1;
    
        if (count == slidesLength) {
            document.querySelectorAll('.examples__arrow-right path')[0]
                                    .attributes.fill.nodeValue = '#C4C4C4';
        }

        if (count > 1) {
            document.querySelectorAll('.examples__arrow-left path')[0]
                                    .attributes.fill.nodeValue = '#1A3D8A';
        }
        
        if (count > slidesLength) {
            count = slidesLength;
        }

        countSlider.innerHTML = `${count}/4`;
    });

    arrowLeft.addEventListener('click', () => {
        moveToLeft();
        count -= 1;

        if (count < slidesLength) {
            document.querySelectorAll('.examples__arrow-right path')[0]
                                    .attributes.fill.nodeValue = '#1A3D8A';
        }

        if (count == 1) {
            document.querySelectorAll('.examples__arrow-left path')[0]
                                    .attributes.fill.nodeValue = '#C4C4C4';
        }
        if (count <= 1) {
            count = 1;
        }

        countSlider.innerHTML = `${count}/4`;
    });

    const circleBlock = document.querySelector('.examples__circles');
    const circle = document.querySelectorAll('.examples__circle');

    circleBlock.addEventListener('click', event => {
        let target = event.target;
        
        if (target && target.classList.contains('examples__circle')) {
            circle.forEach(item => {
                item.classList.remove('examples__circle-active');
            });

            target.classList.add('examples__circle-active');
            let itemNumber = [...circle].indexOf(target); // индекс активного элемента

            slides.style.left = `-${widthSlider * itemNumber}px`;
            task.style.left = `-${widthBlock * itemNumber}px`;
            decision.style.left = `-${widthBlock * itemNumber}px`;
        }
    });

    // Accordion
    const pluses = document.querySelectorAll('.questions__plus');

    pluses.forEach(function(item) {
        item.addEventListener('click', function() { 
            if (this.classList.contains('questions__plus-active')) {
                this.classList.remove('questions__plus-active');
                this.parentNode.classList.remove('questions__head-active');
                this.parentNode.nextElementSibling.classList.remove('questions__content-active');

                this.parentNode.nextElementSibling.style.maxHeight = '0px'; 
            } else {
                pluses.forEach(item => {
                    item.classList.remove('questions__plus-active');
                    item.parentNode.classList.remove('questions__head-active');
                    item.parentNode.nextElementSibling.classList.remove('questions__content-active');

                    item.parentNode.nextElementSibling.style.maxHeight = '0px';
                });
                
                this.classList.add('questions__plus-active');
                this.parentNode.classList.add('questions__head-active');
                this.parentNode.nextElementSibling.classList.add('questions__content-active');

                this.parentNode.nextElementSibling.style.maxHeight = this.parentNode.
                    nextElementSibling.scrollHeight + 80 + 'px';
            }
        });
    });

    // Form 

    const phoneInput = document.querySelector('input[name="phone"]');
    const inputs = document.querySelectorAll('input');
    const form = document.querySelector('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с Вами свяжется специалист!',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.feedback__status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.addEventListener('submit', event => {
        event.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('feedback__status');
        form.appendChild(statusMessage);

        const formData = new FormData();

        postData('/server.php', formData)
        .then(res => {
            console.log(res);
            statusMessage.textContent = message.success;
        })
        .catch(() => {
            statusMessage.textContent = message.failure;
        })
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        });
    });

    // Mask phone

    function setCursorPosition (pos, elem) {
        elem.focus();
        
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __';
        let i = 0;
        let def = matrix.replace(/\D/g, '');
        let val = phoneInput.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        phoneInput.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (phoneInput.value.length == 2) {
                phoneInput.value = '';
            }
        } else {
            setCursorPosition(phoneInput.value.length, phoneInput);
        }
    }

    phoneInput.addEventListener('input', createMask);
    phoneInput.addEventListener('focus', createMask);
    phoneInput.addEventListener('blur', createMask);
});