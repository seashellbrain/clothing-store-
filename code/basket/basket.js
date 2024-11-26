document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');

    // Загружаем корзину
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
                                <input type="checkbox" class="select-item" data-id="${item.id}">
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
                    `;

                    cartItemsContainer.appendChild(itemElement);
                });

                // Обновляем итоговую сумму
                totalAmountElement.textContent = `${totalPrice} BYN`;

                // Обновляем обработчики чекбоксов
                attachCheckboxHandlers(cartItems);
            })
            .catch(error => console.error('Ошибка загрузки корзины:', error));
    }

    // Функция для обновления итоговой суммы
    function updateTotalPrice(cartItems) {
        const selectedItems = document.querySelectorAll('.select-item:checked');
        const totalAmountElement = document.getElementById('total-amount');
        let totalPrice = 0;

        selectedItems.forEach(selected => {
            const itemId = selected.getAttribute('data-id');
            const item = cartItems.find(i => i.id == itemId); // Находим товар по ID
            if (item) {
                totalPrice += item.price * item.quantity;
            }
        });

        totalAmountElement.textContent = `${totalPrice} BYN`;
    }

    // Обработчики чекбоксов
    function attachCheckboxHandlers(cartItems) {
        const itemCheckboxes = document.querySelectorAll('.select-item');

        // Обработчик для выбора всех товаров
        selectAllCheckbox.addEventListener('change', (event) => {
            const isChecked = event.target.checked;

            itemCheckboxes.forEach((checkbox) => {
                checkbox.checked = isChecked; // Отмечаем/снимаем все
            });

            // Обновляем итоговую сумму
            updateTotalPrice(cartItems);
        });

        // Обработчик для каждого чекбокса
        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateTotalPrice(cartItems); // Обновляем итоговую сумму
            });
        });
    }

    // Загружаем корзину при загрузке страницы
    loadCart();

    // Автоматически обновляем корзину каждые 5 секунд
    setInterval(loadCart, 5000); // Вызов функции loadCart каждые 5 секунд
});
