function toggleCategories() {
    const dropdown = document.getElementById("category-dropdown");
    const button = document.querySelector(".category-button");

    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
        dropdown.classList.remove("rounded-corners"); // Убираем верхние скругления
        button.classList.add("button-opened"); // Добавляем класс для открытой кнопки
        dropdown.classList.add("dropdown-opened"); // Добавляем класс для открытого меню
        button.textContent = "Скрыть категории";
    } else {
        dropdown.style.display = "none";
        button.classList.remove("button-opened"); // Убираем класс для закрытой кнопки
        dropdown.classList.remove("dropdown-opened"); // Убираем класс для закрытого меню
        button.textContent = "ВСЕ КАТЕГОРИИ";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".container");
    const emptyCartMessage = `
        <main class="container text-center my-5">
            <img src="./../../img/empty_basket/basket.png" alt="Пустая корзина" class="cart-icon5">
            <h2 class="empty-cart-message">В КОРЗИНЕ ПОКА ПУСТО =(</h2>
            <p class="empty-cart-text">Воспользуйтесь поиском или каталогом, чтобы найти и добавить товары.<br> Если в корзине были товары, авторизируйтесь.</p>
        </main>`;

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = emptyCartMessage;
    } else {
        displayCartItems(cartItems);
    }
});

// Функция для отображения товаров в корзине
function displayCartItems(cartItems) {
    const cartContainer = document.querySelector(".container");
    cartContainer.innerHTML = "";

    cartItems.forEach((item) => {
        const itemHTML = `
        <div class="row border-bottom pb-3 mb-3 align-items-center">
            <div class="col-2">
                <img src="${item.image}" alt="${item.name}" class="img-fluid">
            </div>
            <div class="col-5 d-flex flex-column product-info">
                <h5>${item.name}</h5>
                <p>Модель: ${item.model}</p>
                <p>Размер: <span class="product-size">${item.size}</span></p>
            </div>
            <div class="col-4 text-end">
                <h4 class="total-price">${item.price} BYN</h4>
                <button class="btn btn-danger remove-item" data-id="${item.id}">Удалить</button>
            </div>
        </div>`;
        cartContainer.innerHTML += itemHTML;
    });

    // Назначаем обработчики кнопкам удаления
    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (event) => {
            const itemId = event.target.dataset.id;
            removeItemFromCart(itemId);
        });
    });
}

// Удаление товара из корзины
function removeItemFromCart(itemId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload(); // Обновляем страницу
}
