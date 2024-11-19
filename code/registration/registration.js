document.querySelector('#registration-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    const gender = document.querySelector('#gender').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;
    const errorMessage = document.querySelector('#error-message');

    // Очистка предыдущего сообщения об ошибке
    errorMessage.textContent = '';

    // Проверка на совпадение паролей
    if (password !== passwordConfirm) {
        errorMessage.textContent = 'Пароли не совпадают!';
        return;
    }

    // Проверка на длину пароля
    if (password.length < 8) {
        errorMessage.textContent = 'Пароль должен содержать не менее 8 символов!';
        return;
    }

    // Проверка формата email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Введите корректный email!';
        return;
    }

    // Пример проверки телефона (можно адаптировать)
    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
        errorMessage.textContent = 'Введите корректный номер телефона!';
        return;
    }

    alert('Регистрация прошла успешно!');
});

// Обработчик для переключения видимости пароля
document.querySelectorAll('.toggle-password').forEach((button) => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const passwordField = document.getElementById(targetId);
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            button.textContent = '🙈'; // Меняем иконку на "закрытый глаз"
        } else {
            passwordField.type = 'password';
            button.textContent = '👁️'; // Меняем иконку на "открытый глаз"
        }
    });
});