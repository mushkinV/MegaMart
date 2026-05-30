document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.products-slider__wrapper');
    if (!wrapper) return;

    const cards = document.querySelectorAll('.product-card');
    const btnPrev = document.querySelector('.product_clider_prev-btn');
    const btnNext = document.querySelector('.product_clider_next-btn');

    if (!btnPrev || !btnNext) return;

    // Если карточек меньше или равно 4, скрываем кнопки (так как все помещаются на экране)
    if (cards.length <= 4) {
        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
        return;
    }

    let counter = 0;
    let cardWidth = 227;        // Фиксированная ширина карточки
    let gap = 20;               // Отступ margin-right у карточки
    let slideStep = cardWidth + gap;  // Шаг сдвига на одну карточку
    let visibleCards = 4;       // Количество видимых карточек

    // Функция обновления состояния кнопок
    function updateButtons() {
        const maxCounter = Math.ceil((cards.length - visibleCards) / visibleCards);
        btnPrev.style.display = counter > 0 ? 'flex' : 'none';
        btnNext.style.display = counter < maxCounter ? 'flex' : 'none';
    }

    // Функция обновления размеров (на случай ресайза окна)
    function updateDimensions() {
        // Получаем актуальную ширину карточки и отступ
        if (cards.length > 0) {
            const computedStyle = getComputedStyle(cards[0]);
            const marginRight = parseInt(computedStyle.marginRight) || 0;
            cardWidth = cards[0].offsetWidth;
            gap = marginRight;
            slideStep = cardWidth + gap;
        }
        
        // Вычисляем, сколько карточек помещается видимо
        const slider = document.querySelector('.products-slider');
        if (slider) {
            const containerWidth = slider.clientWidth - 80; // минус паддинги под кнопки (40px слева + 40px справа)
            visibleCards = Math.floor(containerWidth / (cardWidth + gap));
            visibleCards = Math.max(1, visibleCards); // минимум 1 карточка
        }
        
        updateButtons();
    }

    // Обработчик кнопки "Вперёд"
    btnNext.addEventListener('click', () => {
        const maxCounter = Math.ceil((cards.length - visibleCards) / visibleCards);
        if (counter < maxCounter) {
            counter++;
            wrapper.style.transform = `translateX(-${counter * slideStep * visibleCards}px)`;
        }
        updateButtons();
        console.log("Сдвинули вперёд на шаг:", counter);
    });

    // Обработчик кнопки "Назад"
    btnPrev.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            wrapper.style.transform = `translateX(-${counter * slideStep * visibleCards}px)`;
        }
        updateButtons();
        console.log("Сдвинули назад на шаг:", counter);
    });

    // Инициализация: вычисляем размеры и обновляем кнопки
    updateDimensions();
    
    // При изменении размера окна пересчитываем всё и сбрасываем позицию
    window.addEventListener('resize', () => {
        updateDimensions();
        // Сбрасываем позицию, чтобы не вылезать за границы
        counter = 0;
        wrapper.style.transform = 'translateX(0px)';
        console.log("Окно изменено, позиция сброшена");
    });
});