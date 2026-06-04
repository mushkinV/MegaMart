document.addEventListener('DOMContentLoaded', () => {
    // DOM-элементы
    const modal = document.getElementById('authModal');
    const authBtn = document.querySelector('.auth-btn');
    const closeBtn = document.querySelector('.close-btn');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
    function clearErrors(formElement) {
        formElement.querySelectorAll('.error-message').forEach(err => err.remove());
        formElement.querySelectorAll('input').forEach(input => {
            input.classList.remove('input-error');
            input.style.borderColor = '';
        });
    }

    function showError(input, message) {
        clearErrors(input.closest('form')); // очищаем старые ошибки только для этой формы
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '1.2rem';
        errorDiv.style.marginTop = '4px';
        input.classList.add('input-error');
        input.style.borderColor = '#e74c3c';
        input.after(errorDiv); // вставляем после поля
    }

    // === ВАЛИДАЦИЯ ===
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[0-9]{10,15}$/; // цифры, может начинаться с +, всего от 10 до 15 символов
        return phoneRegex.test(phone);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return re.test(email);
    }

    function validateName(name) {
        return /^[A-Za-zА-Яа-яЁё\s\-]{2,}$/.test(name.trim());
    }

    // === ОТКРЫТИЕ / ЗАКРЫТИЕ МОДАЛКИ ===
    function openModal() {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            if (!modal.classList.contains('show')) modal.style.display = 'none';
        }, 300);
    }

    authBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    closeBtn?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('show')) closeModal(); });

    // === ПЕРЕКЛЮЧЕНИЕ МЕЖДУ ФОРМАМИ ===
    showRegister?.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        clearErrors(loginForm);
        clearErrors(registerForm);
    });
    showLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
        clearErrors(loginForm);
        clearErrors(registerForm);
    });

    // === ФОРМА ВХОДА (телефон + пароль) ===
    const loginSubmitBtn = loginForm?.querySelector('.submit-btn');
    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearErrors(loginForm);
            
            const phoneInput = loginForm.querySelector('input[name="phone"]');
            const passwordInput = loginForm.querySelector('input[name="password"]');
            const phone = phoneInput?.value.trim() || '';
            const password = passwordInput?.value || '';

            let isValid = true;
            if (!phone) {
                showError(phoneInput, 'Введите номер телефона');
                isValid = false;
            } else if (!validatePhone(phone)) {
                showError(phoneInput, 'Номер должен содержать 10–15 цифр, можно начать с +');
                isValid = false;
            }
            if (!password) {
                showError(passwordInput, 'Введите пароль');
                isValid = false;
            } else if (password.length < 6 || password.length > 20) {
                showError(passwordInput, 'Пароль от 6 до 20 символов');
                isValid = false;
            }

            if (isValid) {
                console.log('Вход:', { phone, password });
                alert('Форма входа отправлена (демо)');
                closeModal(); // опционально закрыть окно
            }
        });
    }

    // === ФОРМА РЕГИСТРАЦИИ (имя, email, пароль, подтверждение) ===
    const registerSubmitBtn = registerForm?.querySelector('.submit-btn');
    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearErrors(registerForm);

            const nameInput = registerForm.querySelector('input[name="name"]');
            const emailInput = registerForm.querySelector('input[name="email"]');
            const passInput = registerForm.querySelector('input[name="password"]');
            const confirmInput = registerForm.querySelector('input[name="confirm_password"]');
            const name = nameInput?.value.trim() || '';
            const email = emailInput?.value.trim() || '';
            const password = passInput?.value || '';
            const confirm = confirmInput?.value || '';

            let isValid = true;
            if (!name) {
                showError(nameInput, 'Введите имя');
                isValid = false;
            } else if (!validateName(name)) {
                showError(nameInput, 'Имя должно содержать только буквы (от 2 символов)');
                isValid = false;
            }
            if (!email) {
                showError(emailInput, 'Введите email');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailInput, 'Некорректный email (пример: name@domain.com)');
                isValid = false;
            }
            if (!password) {
                showError(passInput, 'Введите пароль');
                isValid = false;
            } else if (password.length < 6 || password.length > 20) {
                showError(passInput, 'Пароль от 6 до 20 символов');
                isValid = false;
            }
            if (!confirm) {
                showError(confirmInput, 'Подтвердите пароль');
                isValid = false;
            } else if (password !== confirm) {
                showError(confirmInput, 'Пароли не совпадают');
                isValid = false;
            }

            if (isValid) {
                console.log('Регистрация:', { name, email, password });
                alert('Форма регистрации отправлена (демо)');
                closeModal();
            }
        });
    }
});