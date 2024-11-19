document.getElementById('registrationform').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверка на пустые поля
    if (!username || !email || !phone || !gender || !password || !confirmPassword) {
        alert("Все поля обязательны для заполнения");
        return;
    }

    // Проверка на пробелы в email, телефоне и пароле
    if (/\s/.test(email) || /\s/.test(phone) || /\s/.test(password)) {
        alert("Email, телефон и пароль не могут содержать пробелы");
        return;
    }

    // Проверка длины пароля
    if (password.length < 8) {
        alert("Пароль должен быть не менее 8 символов");
        return;
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
    }

    // Отправка данных на сервер
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, phone, gender, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Регистрация успешна!");
            window.location.href = './../login_account/login_account.html';
        } else {
            alert(data.message || "Ошибка при регистрации");
        }
    } catch (error) {
        alert("Ошибка соединения с сервером");
    }
});
