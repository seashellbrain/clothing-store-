function createCartItem(item) {
    return `
        <div class="row border-bottom pb-3 mb-3 align-items-center">
            <div class="col-1 d-flex align-items-start">
                <label class="custom-checkbox">
                    <input type="checkbox">
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
                <button class="button_tabl">Таблица размеров</button>
            </div>
            <div class="col-4 text-end order-summary">
                <h4 class="total-price">Итого: <strong>${item.price * item.quantity} BYN</strong></h4>
                <button class="btn btn-danger remove-item" data-id="${item.id}">Удалить</button>
                <p class="order-terms mt-3 consent-text">
                    Оформляя заказ, вы соглашаетесь с обработкой персональных данных в соответствии с политикой обработки персональных данных, а также принимаете условия пользовательского соглашения.
                </p>
                <div class="delivery-options">
                    <div class="delivery-option">
                        <img src="./../../img/basket/icons_car.svg" alt="Courier Icon" class="delivery-icon">
                        <span>Курьер сегодня</span>
                    </div>
                    <div class="delivery-option">
                        <img src="./../../img/basket/icons_letter.svg" alt="Mail Icon" class="delivery-icon">
                        <span>Почта с 12 октября</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    function loadCart() {
        fetch('http://localhost:3000/api/cart/1') // Замените `1` на текущего пользователя (userId)
            .then(response => response.json())
            .then(cartItems => {
                const cartItemsContainer = document.getElementById('cart-items');
                cartItemsContainer.innerHTML = '';

                if (cartItems.length === 0) {
                    cartItemsContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
                    return;
                }

                cartItems.forEach(item => {
                    cartItemsContainer.innerHTML += createCartItem(item);
                });

                // Добавляем обработчики удаления
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', () => {
                        const itemId = button.getAttribute('data-id');
                        removeFromCart(itemId);
                    });
                });
            })
            .catch(error => console.error('Ошибка загрузки корзины:', error));
    }

    function removeFromCart(itemId) {
        fetch(`http://localhost:3000/api/cart/item/${itemId}`, { method: 'DELETE' })
            .then(() => loadCart())
            .catch(error => console.error('Ошибка удаления товара:', error));
    }

    // Загрузка корзины при загрузке страницы
    loadCart();
});
