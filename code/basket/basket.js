// Функция для загрузки корзины
function loadCart() {
    fetch('http://localhost:3000/api/cart/1') // Замените 1 на текущего пользователя
        .then(response => response.json())
        .then(cartItems => {
            const cartItemsContainer = document.getElementById('cart-items');
            const totalAmountElement = document.getElementById('total-amount');

            cartItemsContainer.innerHTML = ''; // Очищаем контейнер
            let totalPrice = 0;

            if (!cartItems || cartItems.length === 0) {
                // Если корзина пуста, перенаправляем на страницу "пустой корзины"
                window.location.href = './../clean_basket/clean_basket.html'; // Убедитесь, что путь правильный
                return;
            }

            // Добавляем товары
            cartItems.forEach(item => {
                totalPrice += item.price * item.quantity;

                const itemElement = document.createElement('div');
                itemElement.className = 'row border-bottom pb-3 mb-3 align-items-center';

                itemElement.innerHTML = `
                    <div class="col-1 d-flex align-items-start">
                        <label class="custom-checkbox">
                            <input type="checkbox" class="select-item" data-id="${item.id}" data-price="${item.price}" data-quantity="${item.quantity}">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="col-2">
                        <img src="${item.image1}" alt="${item.name}" class="img-fluid">
                    </div>
                    <div class="col-5 d-flex flex-column product-info">
                        <h5>${item.name}</h5>
                        <p>Модель: ${item.model || 'Не указана'}</p>
                        <p>Размер: <span class="product-size">${item.size}</span></p>
                        <p>Цена: <strong>${item.price} BYN</strong></p>
                    </div>
                    <div class="col-1">
                        <button class="delete-item-btn" data-id="${item.id}">
                            <img src="./../../img/basket/icons_basket.svg" alt="Удалить" class="trash-icon">
                        </button>
                    </div>
                `;

                cartItemsContainer.appendChild(itemElement);
            });

            // Обновляем итоговую сумму
            totalAmountElement.textContent = `${totalPrice} BYN`;

            // Обновляем обработчики чекбоксов и кнопок удаления
            attachCheckboxHandlers(cartItems);
            attachDeleteHandlers();
        })
        .catch(error => console.error('Ошибка загрузки корзины:', error));
}

// Функция удаления элемента
function deleteItem(itemId) {
    fetch(`http://localhost:3000/api/cart/${itemId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log(`Товар с ID ${itemId} успешно удалён`);
                loadCart(); // Перезагружаем корзину после удаления
            } else {
                console.error('Ошибка при удалении товара');
            }
        })
        .catch(error => console.error('Ошибка сервера:', error));
}

// Функция для привязки событий к кнопкам удаления
function attachDeleteHandlers() {
    const deleteButtons = document.querySelectorAll('.delete-item-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', event => {
            const itemId = event.target.closest('.delete-item-btn').getAttribute('data-id');
            console.log('Кнопка нажата! ID товара:', itemId);
            deleteItem(itemId);
        });
    });
}

// Функция для обработки чекбоксов (если есть)
function attachCheckboxHandlers(cartItems) {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const itemCheckboxes = document.querySelectorAll('.select-item');
    const totalAmountElement = document.getElementById('total-amount');

    // Обработчик для чекбокса "Выбрать все"
    selectAllCheckbox.addEventListener('change', () => {
        let updatedTotal = 0;
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
            if (selectAllCheckbox.checked) {
                updatedTotal += parseFloat(checkbox.dataset.price) * parseInt(checkbox.dataset.quantity, 10);
            }
        });
        totalAmountElement.textContent = `${updatedTotal} BYN`;
    });

    // Обновление состояния "Выбрать все" и итоговой суммы
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            let updatedTotal = 0;
            const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
            selectAllCheckbox.checked = allChecked;

            itemCheckboxes.forEach(cb => {
                if (cb.checked) {
                    updatedTotal += parseFloat(cb.dataset.price) * parseInt(cb.dataset.quantity, 10);
                }
            });
            totalAmountElement.textContent = `${updatedTotal} BYN`;
        });
    });
}

// Выполняем действия при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем корзину при загрузке страницы
    loadCart();

    // Автоматически обновляем корзину каждые 5 секунд
    setInterval(loadCart, 5000); // Вызов функции loadCart каждые 5 секунд
});
