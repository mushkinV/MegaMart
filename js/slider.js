
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.banner-slider');
    
    //Проверка если слайдер в проекте
    if (!slider) return; 

    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    //Боковые кнопки
    const nextBtn = slider.querySelector('.next-btn');
    const prevBtn = slider.querySelector('.prev-btn');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (totalSlides > 1) {
        setInterval(nextSlide, 7000); 
    }
    
    if (totalSlides > 0) {
        showSlide(currentIndex);
    }
});