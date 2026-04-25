// Файл: js/slider.js

// 1. Ждём, пока весь HTML загрузится
document.addEventListener('DOMContentLoaded', function() {

    // 2. Находим все нужные элементы
    const slider = document.querySelector('.banner-slider');
    
    // Проверяем, что слайдер вообще есть на странице
    if (!slider) return; 

    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // 3. Находим кнопки
    const nextBtn = slider.querySelector('.next-btn');
    const prevBtn = slider.querySelector('.prev-btn');

    // --- Функции ---
    function showSlide(index) {
        // Убираем класс 'active' у всех слайдов
        slides.forEach(slide => slide.classList.remove('active'));
        // Добавляем класс 'active' только текущему
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        // Эта формула позволяет зациклить слайдер назад
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // --- Логика ---

    // Если есть кнопки, вешаем на них обработчики клика
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Если слайдов больше одного, запускаем автопрокрутку
    if (totalSlides > 1) {
        setInterval(nextSlide, 7000); // Меняем каждые 3 секунды
    }

    // Показываем первый слайд при загрузке страницы, если слайды есть
    if (totalSlides > 0) {
        showSlide(currentIndex);
    }
});