document.querySelectorAll('.filter-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Отключаем стандартное поведение
        document.querySelectorAll('.filter-link').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        // Логика для перехода на другую страницу
        // window.location.href = this.href;
    });
});

document.getElementById('fullName').addEventListener('input', function (e) {
    const regex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;
    const value = e.target.value;

    if (!regex.test(value)) {
        e.target.value = value.replace(/[^а-яА-ЯёЁa-zA-Z\s-]/g, '');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Удаляем email из localStorage
            localStorage.removeItem('userEmail');
            
            window.location.href = './../login_account/login_account.html';
        });
    }
});

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

function toggleEdit(isEditing) {
    const fields = document.querySelectorAll('.editable');
    fields.forEach(field => {
        field.disabled = !isEditing;
    });

    document.querySelector('#saveBtn').style.display = isEditing ? 'inline-block' : 'none';
    document.querySelector('#editBtn').style.display = isEditing ? 'none' : 'inline-block';
}

window.onload = function () {
    const defaultAvatar = './../../img/personal_account/avatar.png';
    const savedAvatar = localStorage.getItem('avatar') || defaultAvatar;
    document.getElementById('avatar').src = savedAvatar;

    const savedData = JSON.parse(localStorage.getItem('profileData')) || {};
    document.getElementById('fullName').value = savedData.fullName || '';
    document.getElementById('phoneNumber').value = savedData.phoneNumber || '';
    document.getElementById('birthDate').value = savedData.birthDate || '';
    document.getElementById('email').value = savedData.email || '';
    document.getElementById('loginName').value = savedData.loginName || '';
    document.getElementById('gender').value = savedData.gender || '';
};

document.getElementById('saveBtn').addEventListener('click', function () {
    const profileData = {
        fullName: document.getElementById('fullName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        birthDate: document.getElementById('birthDate').value,
        email: document.getElementById('email').value,
        loginName: document.getElementById('loginName').value,
        gender: document.getElementById('gender').value,
    };

    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Изменения успешно сохранены!');
    toggleEdit(false);
});

document.getElementById('avatar-upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const avatar = document.getElementById('avatar');
            avatar.src = e.target.result;
            localStorage.setItem('avatar', e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Пожалуйста, выберите изображение.');
    }
});

document.getElementById('editBtn').addEventListener('click', function () {
    toggleEdit(true);
});

document.getElementById('logout').addEventListener('click', function () {
    alert('Вы вышли из аккаунта!');
    window.location.href = 'login.html';
});