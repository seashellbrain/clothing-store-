
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


    selectAllCheckbox.addEventListener('change', () => {
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });


    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
            selectAllCheckbox.checked = allChecked;
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {

    loadCart();


    setInterval(loadCart, 5000); 
});
