document.addEventListener('DOMContentLoaded', function() {
    const addressInput = document.getElementById('addressInput');
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    const editAddressBtn = document.getElementById('editBtn-1');
    const email = localStorage.getItem('userEmail'); // Получаем email пользователя
  
    // Загрузка сохраненного адреса
    if (email) {
        fetch(`http://localhost:3000/user?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.address) {
                    addressInput.value = data.address; // Устанавливаем сохраненный адрес
                    addressInput.disabled = true; // Блокируем поле
                    saveAddressBtn.style.display = 'none'; // Скрываем кнопку "Сохранить"
                    editAddressBtn.style.display = 'block'; // Показываем кнопку "Изменить"
                }
            })
            .catch(error => console.error('Ошибка загрузки адреса:', error));
    } else {
        alert('Ошибка: email не найден.');
    }
  
    // Обработчик для кнопки "Сохранить"
    saveAddressBtn.addEventListener('click', function() {
        const address = addressInput.value.trim();
  
        if (!address) {
            alert('Адрес не может быть пустым.');
            return;
        }
  
        fetch('http://localhost:3000/saveAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Если используется токен
            },
            body: JSON.stringify({ address, email })
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка при сохранении адреса');
            return response.json();
        })
        .then(data => {
            alert('Адрес успешно сохранён!');
            addressInput.disabled = true;
            saveAddressBtn.style.display = 'none';
            editAddressBtn.style.display = 'block';
        })
        .catch(error => console.error('Ошибка при сохранении адреса:', error));
    });
  
    // Обработчик для кнопки "Изменить"
    editAddressBtn.addEventListener('click', function() {
        addressInput.disabled = false; // Разблокируем поле ввода
        saveAddressBtn.style.display = 'block'; // Показываем кнопку "Сохранить"
        editAddressBtn.style.display = 'none'; // Скрываем кнопку "Изменить"
    });
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('newCard');
    const email = localStorage.getItem('userEmail'); // Получаем email пользователя
  
    // Загрузка сохраненного номера карты
    if (email) {
        fetch(`http://localhost:3000/user?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.card_number) {
                    const formattedCard = data.card_number.replace(/(\d{4})(?=\d)/g, '$1 '); // Форматируем номер
                    cardNumberInput.value = formattedCard;
                    cardNumberInput.disabled = true; // Блокируем поле
                }
            })
            .catch(error => console.error('Ошибка загрузки карты:', error));
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('newCard');
    const email = localStorage.getItem('userEmail'); // Получаем email пользователя
  
    if (email) {
        fetch(`http://localhost:3000/user?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.card_number) {
                    const formattedCard = data.card_number.replace(/(\d{4})(?=\d)/g, '$1 '); // Форматируем номер
                    cardNumberInput.value = formattedCard;
                } else {
                    cardNumberInput.value = 'Карта не привязана';
                }
                cardNumberInput.disabled = true; // Поле всегда заблокировано
            })
            .catch(error => console.error('Ошибка загрузки карты:', error));
    }
  
    // Обработчик кнопки привязки карты
    const linkCardBtn = document.getElementById('linkCardBtn');
    linkCardBtn.addEventListener('click', function() {
        window.location.href = './../link_card/link_card.html'; // Редирект на страницу привязки карты
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const totalAmount = localStorage.getItem('totalAmount') || 0;
    const totalCount = localStorage.getItem('totalCount') || 0;

    document.getElementById('order-total-price').textContent = `${totalAmount} BYN`;
    document.querySelector('.kol').textContent = `${totalCount} товар(ов)`;
});

document.getElementById('place-order-button').addEventListener('click', () => {
    const email = localStorage.getItem('userEmail');
    const totalAmount = localStorage.getItem('totalAmount');
    const totalCount = localStorage.getItem('totalCount');
    const orderItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (!email) {
        alert('Пожалуйста, убедитесь, что вы авторизованы.');
        return;
    }

    const randomModels = [];
    for (let i = 0; i < totalCount; i++) {
        randomModels.push(generateRandomModel());
    }

    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            totalAmount,
            totalCount,
            models: randomModels.join(', '),
            orderItems
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            localStorage.setItem('orderNumber', data.orderNumber);
            window.location.href = './../tht_order/tht_order.html';
        } else {
            alert('Ошибка при оформлении заказа.');
        }
    })
    .catch(error => console.error('Ошибка оформления заказа:', error));
});

function generateRandomModel() {
    let model = '';
    for (let i = 0; i < 6; i++) {
        model += Math.floor(Math.random() * 10);
    }
    return model;
}