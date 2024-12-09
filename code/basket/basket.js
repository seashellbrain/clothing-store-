function generateRandomModel() {
    let model = '';
    for (let i = 0; i < 6; i++) {
        model += Math.floor(Math.random() * 10); // Генерация случайного числа от 0 до 9
    }
    return model;
}

function loadCart() {
    fetch('http://localhost:3000/api/cart/1') 
        .then(response => response.json())
        .then(cartItems => {
            const cartItemsContainer = document.getElementById('cart-items');
            const totalAmountElement = document.getElementById('total-amount');

            cartItemsContainer.innerHTML = '';
            let totalPrice = 0;

            if (!cartItems || cartItems.length === 0) {
                window.location.href = './../clean_basket/clean_basket.html'; 
                return;
            }

            cartItems.forEach(item => {
                const model = generateRandomModel(); // Генерация случайной модели

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
                        <p>Модель: <span class="model">${model}</span></p> <!-- Отображаем модель -->
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

            totalAmountElement.textContent = `${totalPrice} BYN`;

            attachCheckboxHandlers(cartItems);
            attachDeleteHandlers();
        })
        .catch(error => console.error('Ошибка загрузки корзины:', error));
}


function calculateSelectedItemsTotal() {
    const selectedCheckboxes = document.querySelectorAll('.select-item:checked');
    let totalAmount = 0;
    let totalCount = 0;

    if (selectedCheckboxes.length === 0) {
        const allCheckboxes = document.querySelectorAll('.select-item');
        allCheckboxes.forEach(checkbox => {
            const price = parseFloat(checkbox.dataset.price);
            const quantity = parseInt(checkbox.dataset.quantity, 10);
            totalAmount += price * quantity;
            totalCount += quantity;
        });
    } else {
        selectedCheckboxes.forEach(checkbox => {
            const price = parseFloat(checkbox.dataset.price);
            const quantity = parseInt(checkbox.dataset.quantity, 10);
            totalAmount += price * quantity;
            totalCount += quantity;
        });
    }

    localStorage.setItem('totalAmount', totalAmount);
    localStorage.setItem('totalCount', totalCount);
}

function deleteItem(itemId) {
    fetch(`http://localhost:3000/api/cart/${itemId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log(`Товар с ID ${itemId} успешно удалён`);
            loadCart(); 
        } else {
            console.error('Ошибка при удалении товара');
        }
    })
    .catch(error => console.error('Ошибка сервера:', error));
}

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

function attachCheckboxHandlers(cartItems) {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const itemCheckboxes = document.querySelectorAll('.select-item');
    const totalAmountElement = document.getElementById('total-amount');

    selectAllCheckbox.addEventListener('change', () => {
        let updatedTotal = 0;
        let totalCount = 0;
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
            if (selectAllCheckbox.checked) {
                updatedTotal += parseFloat(checkbox.dataset.price) * parseInt(checkbox.dataset.quantity, 10);
                totalCount += parseInt(checkbox.dataset.quantity, 10);
            }
        });
        totalAmountElement.textContent = `${updatedTotal} BYN`;
        localStorage.setItem('totalAmount', updatedTotal);
        localStorage.setItem('totalCount', totalCount);
    });

    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            let updatedTotal = 0;
            let totalCount = 0;
            itemCheckboxes.forEach(cb => {
                if (cb.checked) {
                    updatedTotal += parseFloat(cb.dataset.price) * parseInt(cb.dataset.quantity, 10);
                    totalCount += parseInt(cb.dataset.quantity, 10);
                }
            });
            totalAmountElement.textContent = `${updatedTotal} BYN`;
            localStorage.setItem('totalAmount', updatedTotal);
            localStorage.setItem('totalCount', totalCount);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setInterval(loadCart, 5000); 
});

document.getElementById('checkout-button').addEventListener('click', () => {
    calculateSelectedItemsTotal();
    window.location.href = './../placing_an_order/placing_an_order.html';
});
