document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.products-slider__wrapper');
    if (!wrapper) return; 
    const cards = document.querySelectorAll('.product-card');
    if (cards.length <= 5) {
        document.querySelector('.product_clider_prev-btn')?.style?.setProperty('display', 'none');
        document.querySelector('.product_clider_next-btn')?.style?.setProperty('display', 'none');
        return;
    }
    const btnPrev = document.querySelector('.product_clider_prev-btn');
    const btnNext = document.querySelector('.product_clider_next-btn');

    let counter = 0;
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);

    btnNext.addEventListener('click', () => {
        if ((counter + 1) * cardWidth * 5 <= cards.length * cardWidth) { 
            counter++;
            wrapper.style.transform = 'translateX(' + (-cardWidth * counter * 5) + 'px)';
        }
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
        btnNext.style.display = 'flex';
    });
});