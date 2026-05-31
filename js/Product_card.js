document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.products-slider__wrapper');
    if (!wrapper) return;

    const cards = document.querySelectorAll('.product-card');
    const btnPrev = document.querySelector('.product_clider_prev-btn');
    const btnNext = document.querySelector('.product_clider_next-btn');

    if (!btnPrev || !btnNext) return;

    if (cards.length <= 4) {
        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
        return;
    }

    let counter = 0;
    let cardWidth = 227;
    let gap = 20;
    let slideStep = cardWidth + gap;
    let visibleCards = 4;

    function updateButtons() {
        const maxCounter = Math.ceil((cards.length - visibleCards) / visibleCards);
        btnPrev.style.display = counter > 0 ? 'flex' : 'none';
        btnNext.style.display = counter < maxCounter ? 'flex' : 'none';
    }

    function updateDimensions() {
        if (cards.length > 0) {
            const computedStyle = getComputedStyle(cards[0]);
            const marginRight = parseInt(computedStyle.marginRight) || 0;
            cardWidth = cards[0].offsetWidth;
            gap = marginRight;
            slideStep = cardWidth + gap;
        }
        
        const slider = document.querySelector('.products-slider');
        if (slider) {
            const containerWidth = slider.clientWidth - 80;
            visibleCards = Math.floor(containerWidth / (cardWidth + gap));
            visibleCards = Math.max(1, visibleCards);
        }
        
        updateButtons();
    }

    btnNext.addEventListener('click', () => {
        const maxCounter = Math.ceil((cards.length - visibleCards) / visibleCards);
        if (counter < maxCounter) {
            counter++;
            wrapper.style.transform = `translateX(-${counter * slideStep * visibleCards}px)`;
        }
        updateButtons();
        console.log("Сдвинули вперёд на шаг:", counter);
    });

    btnPrev.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            wrapper.style.transform = `translateX(-${counter * slideStep * visibleCards}px)`;
        }
        updateButtons();
        console.log("Сдвинули назад на шаг:", counter);
    });

    updateDimensions();
    
    window.addEventListener('resize', () => {
        updateDimensions();
        counter = 0;
        wrapper.style.transform = 'translateX(0px)';
        console.log("Окно изменено, позиция сброшена");
    });
});