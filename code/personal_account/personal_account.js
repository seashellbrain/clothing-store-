

document.querySelectorAll('.filter-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Отключаем стандартное поведение
        document.querySelectorAll('.filter-link').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        // Логика для перехода на другую страницу
        // window.location.href = this.href; // если переход нужен
    });
});


document.getElementById('fullName').addEventListener('input', function (e) {
    // Разрешаем только буквы, пробелы и дефисы
    const regex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;
    const value = e.target.value;

    // Если введенный текст не соответствует разрешенным символам, удаляем его
    if (!regex.test(value)) {
        e.target.value = value.replace(/[^а-яА-ЯёЁa-zA-Z\s-]/g, '');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    
    // Проверяем наличие кнопки "Выйти"
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Удаляем email из localStorage
            localStorage.removeItem('userEmail');
            
            // Перенаправляем на страницу входа
            window.location.href = './../login_account/login_account.html'; // Здесь указываем путь к странице входа
        });
    }
});
// Кнопки "Сразу" и "При получении"
function togglePaymentMethod(button) {
    // Убираем класс "active" у всех кнопок
    const buttons = document.querySelectorAll('.payment-method');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // класс "active"
    button.classList.add('active');
    
   
    const selectedMethod = button.getAttribute('data-method');
    console.log('Выбран способ оплаты:', selectedMethod);

    // "selectedMethod"
}

// Ввод новой карты
function formatCardNumber(input) {
    
    let cardNumber = input.value;

    cardNumber = cardNumber.replace(/\D/g, '');
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    if (cardNumber.length > 19) {
        cardNumber = cardNumber.substring(0, 19);
    }

    input.value = cardNumber;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Получаем email из localStorage
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
        alert('Пожалуйста, войдите в систему');
        window.location.href = './../login_account/login_account.html'; // Перенаправляем на страницу входа, если email не найден
        return;
    }

    try {
        // Отправляем запрос на сервер для получения данных пользователя по email
        const response = await fetch(`http://localhost:3000/user?email=${encodeURIComponent(userEmail)}`);
        
        if (response.ok) {
            const user = await response.json();

            console.log('Данные пользователя:', user); // Логируем данные пользователя

            // Заполняем поля данными пользователя
            document.querySelector('#fullName').value = user.full_name || ''; // Заполняем full_name
            document.querySelector('#phoneNumber').value = user.phone || ''; // Заполняем номер телефона
            document.querySelector('#birthDate').value = user.birthDate ? user.birthDate.split('T')[0] : ''; // Формат YYYY-MM-DD
            document.querySelector('#email').value = user.email || ''; // Заполняем email
            document.querySelector('#loginName').value = user.loginName || ''; // Заполняем loginName
            document.querySelector('#gender').value = user.gender === 'male' ? 'Мужской' : 'Женский'; // Заполняем пол
        } else {
            alert('Пользователь с таким email не найден');
        }
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        alert('Ошибка при загрузке данных пользователя');
    }

    // Логика для кнопки "Изменить"
    document.querySelector('#editBtn').addEventListener('click', () => {
        toggleEdit(true); // Включаем редактирование
    });

    // Логика для кнопки "Сохранить"
    document.querySelector('#saveBtn').addEventListener('click', async () => {
        const updatedUser = {
            email: userEmail, // Отправляем email, чтобы найти пользователя
            full_name: document.querySelector('#fullName').value,
            phone: document.querySelector('#phoneNumber').value,
            birthDate: document.querySelector('#birthDate').value,
            loginName: document.querySelector('#loginName').value,
            gender: document.querySelector('#gender').value === 'Мужской' ? 'male' : 'female',
        };

        try {
            const response = await fetch('http://localhost:3000/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                alert('Данные успешно обновлены');
                toggleEdit(false); // Блокируем редактирование
            } else {
                alert('Ошибка при обновлении данных');
            }
        } catch (err) {
            console.error('Ошибка запроса:', err);
            alert('Ошибка соединения с сервером');
        }
    });
});

// Функция для включения/выключения редактирования
function toggleEdit(isEditing) {
    const fields = document.querySelectorAll('.editable');
    fields.forEach(field => {
        field.disabled = !isEditing;
    });

    document.querySelector('#saveBtn').style.display = isEditing ? 'inline-block' : 'none';
    document.querySelector('#editBtn').style.display = isEditing ? 'none' : 'inline-block';
}

