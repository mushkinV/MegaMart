
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('authModal');
    const authBtn = document.querySelector('.auth-btn');
    const closeBtn = document.querySelector('.close-btn');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Очистка ошибок
    function clearErrors(form) {
        const errorDivs = form.querySelectorAll('.error-message');
        errorDivs.forEach(div => div.remove());
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('input-error');
            input.style.borderColor = '';
        });
    }

    function showError(input, message) {
        let existing = input.parentNode.querySelector('.error-message');
        if (existing) existing.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '1.2rem';
        errorDiv.style.marginTop = '4px';
        input.style.borderColor = 'red';
        input.classList.add('input-error');
        input.parentNode.appendChild(errorDiv);
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return re.test(email);
    }

    function isValidName(name) {
        return /^[A-Za-zА-Яа-яЁё\s\-]{2,}$/.test(name);
    }

    // --- Анимированное открытие / закрытие ---
    function openModal() {
        if (!modal) return;
        modal.style.display = 'flex';
        // Небольшая задержка для запуска CSS-перехода
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modal.style.display = 'none';
            }
        }, 300);
    }

    // Обработчики открытия
    if (authBtn) {
        authBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Переключение форм
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
            clearErrors(loginForm);
            clearErrors(registerForm);
        });
    }
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
            clearErrors(loginForm);
            clearErrors(registerForm);
        });
    }

    // Форма входа
    if (loginForm) {
        const loginSubmit = loginForm.querySelector('.submit-btn');
        if (loginSubmit) {
            loginSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                clearErrors(loginForm);
                const emailInput = loginForm.querySelector('input[type="email"]');
                const passwordInput = loginForm.querySelector('input[type="password"]');
                const email = emailInput ? emailInput.value.trim() : '';
                const password = passwordInput ? passwordInput.value : '';
                let valid = true;

                if (email === '') {
                    showError(emailInput, 'Введите email');
                    valid = false;
                } else if (!isValidEmail(email)) {
                    showError(emailInput, 'Введите корректный email (name@domain.com)');
                    valid = false;
                }
                if (password === '') {
                    showError(passwordInput, 'Введите пароль');
                    valid = false;
                } else if (password.length < 6 || password.length > 20) {
                    showError(passwordInput, 'Пароль должен быть от 6 до 20 символов');
                    valid = false;
                }
                if (valid) {
                    console.log('Вход:', { email, password });
                    alert('Форма входа отправлена (демо)');
                }
            });
        }
    }

    // Форма регистрации
    if (registerForm) {
        const registerSubmit = registerForm.querySelector('.submit-btn');
        if (registerSubmit) {
            registerSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                clearErrors(registerForm);
                const nameInput = registerForm.querySelector('input[type="text"]');
                const emailInput = registerForm.querySelector('input[type="email"]');
                const passwordInput = registerForm.querySelector('input[type="password"]');
                const confirmInput = registerForm.querySelector('#confirm_password');
                const name = nameInput ? nameInput.value.trim() : '';
                const email = emailInput ? emailInput.value.trim() : '';
                const password = passwordInput ? passwordInput.value : '';
                const confirm = confirmInput ? confirmInput.value : '';
                let valid = true;

                if (name === '') {
                    showError(nameInput, 'Введите имя');
                    valid = false;
                } else if (!isValidName(name)) {
                    showError(nameInput, 'Имя должно содержать только буквы (от 2 символов)');
                    valid = false;
                }
                if (email === '') {
                    showError(emailInput, 'Введите email');
                    valid = false;
                } else if (!isValidEmail(email)) {
                    showError(emailInput, 'Введите корректный email');
                    valid = false;
                }
                if (password === '') {
                    showError(passwordInput, 'Введите пароль');
                    valid = false;
                } else if (password.length < 6 || password.length > 20) {
                    showError(passwordInput, 'Пароль должен быть от 6 до 20 символов');
                    valid = false;
                }
                if (confirmInput) {
                    if (confirm === '') {
                        showError(confirmInput, 'Подтвердите пароль');
                        valid = false;
                    } else if (password !== confirm) {
                        showError(confirmInput, 'Пароли не совпадают');
                        valid = false;
                    }
                }
                if (valid) {
                    console.log('Регистрация:', { name, email, password });
                    alert('Форма регистрации отправлена (демо)');
                }
            });
        }
    }
});