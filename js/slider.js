let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    for (let i = 0; i < totalSlides; i++) {
        slides[i].classList.remove('active');
    }
    slides[index].classList.add('active');
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

// Кнопки
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);

// Автопрокрутка каждые 3 секунды
setInterval(nextSlide, 3000);

// Показ первой картинки при загрузке
showSlide(slideIndex);