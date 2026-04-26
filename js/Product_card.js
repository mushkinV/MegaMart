// Product_card.js

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.products-slider__wrapper');
    
    // Если слайдера нет на странице (например, мало товаров), скрипт не запускается
    if (!wrapper) return; 

    const cards = document.querySelectorAll('.product-card');
    
    // Проверяем, нужно ли вообще включать слайдер
    if (cards.length <= 5) {
        // Если товаров мало, просто скрываем НОВЫЕ кнопки
        document.querySelector('.product_clider_prev-btn')?.style?.setProperty('display', 'none');
        document.querySelector('.product_clider_next-btn')?.style?.setProperty('display', 'none');
        return;
    }

    // --- ИЗМЕНЕНИЕ: Ищем кнопки по НОВЫМ классам ---
    const btnPrev = document.querySelector('.product_clider_prev-btn');
    const btnNext = document.querySelector('.product_clider_next-btn');

    let counter = 0;
    
    // Ширина одной карточки с учетом её правого отступа (margin-right)
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);

    btnNext.addEventListener('click', () => {
        // Проверяем, можно ли сдвинуть еще на один шаг (на 5 карточек)
        if ((counter + 1) * cardWidth * 5 <= cards.length * cardWidth) { 
            counter++;
            wrapper.style.transform = 'translateX(' + (-cardWidth * counter * 5) + 'px)';
        }
        // Скрываем/показываем кнопки в зависимости от позиции
        btnPrev.style.display = counter > 0 ? 'flex' : 'none';
        console.log("Сдвинули на", counter);
    });

    btnPrev.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            wrapper.style.transform = 'translateX(' + (-cardWidth * counter * 5) + 'px)';
        }
        btnPrev.style.display = counter > 0 ? 'flex' : 'none';
        console.log("Сдвинули на", counter);
        
        // Всегда показываем кнопку "Далее", если мы сдвинулись назад
        btnNext.style.display = 'flex';
    });
});