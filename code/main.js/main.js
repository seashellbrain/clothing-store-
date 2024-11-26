//кнопка все категории

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


// Проверка статуса пользователя
function checkUserStatus() {
    // Допустим, у нас есть функция, которая возвращает статус пользователя
    // Пример: getUserStatus() возвращает "guest", "registered" или "loggedIn"
    const userStatus = getUserStatus();

    if (userStatus === "guest") {
        // Если пользователь гость (незарегистрирован), перенаправляем на страницу регистрации
        window.location.href = "./../../code/login_account/login_account.html";
    } else if (userStatus === "registered") {
        // Если пользователь зарегистрирован, но не вошел, перенаправляем на страницу входа
        window.location.href = "./../../code/login_account/login_account.html";
    } else if (userStatus === "loggedIn") {
        // Если пользователь уже вошел, перенаправляем в личный кабинет
        window.location.href = "./../personal_account/data.html";
    }
}

// Имитируем функцию получения статуса пользователя
function getUserStatus() {
    // Здесь логика определения статуса пользователя, например, через cookies, sessionStorage или запрос к серверу.
    // Вернем статус для примера. Замените на реальную проверку статуса.
    return "guest"; // возможные значения: "guest", "registered", "loggedIn"
}

// Назначаем функцию на клик по кнопке "Личный кабинет"
document.getElementById("text1").addEventListener("click", checkUserStatus);






// Добавление слушателя для кнопки поиска
document.querySelector('.header-search-btn').addEventListener('click', function () {
    const searchInput = document.querySelector('.header-search input').value.trim(); // Получаем текст из поля
    if (searchInput) {
        // Перенаправляем на страницу результатов поиска
        window.location.href = `./../../code/search_result/search_result.html?query=${encodeURIComponent(searchInput)}`;
    } else {
        alert('Введите текст для поиска.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-container'); // Находим блок корзины

    // Функция проверки состояния корзины и перенаправления
    function checkCartAndRedirect() {
        fetch('http://localhost:3000/api/cart/1') // Замените `1` на текущий userId
            .then(response => response.json())
            .then(cart => {
                if (!cart || cart.length === 0) {
                    // Если корзина пуста, перенаправляем на clean_basket.html
                    window.location.href = './../clean_basket/clean_basket.html';
                } else {
                    // Если есть товары, перенаправляем на страницу корзины
                    window.location.href = './../basket/basket.html';
                }
            })
            .catch(error => console.error('Ошибка проверки корзины:', error));
    }

    // Навешиваем обработчик клика на блок корзины
    cartContainer.addEventListener('click', checkCartAndRedirect);

    // Функция обновления данных в корзине
    function updateCartInfo() {
        fetch('http://localhost:3000/api/cart/1') // Замените `1` на текущий userId
            .then(response => response.json())
            .then(cart => {
                let itemCount = 0;
                let totalPrice = 0;

                if (cart && cart.length > 0) {
                    itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
                    totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
                }

                // Обновляем значения в HTML
                document.getElementById('cart-item-count').textContent = itemCount;
                document.getElementById('cart-total-price').textContent = totalPrice.toFixed(2);
            })
            .catch(error => console.error('Ошибка загрузки корзины:', error));
    }

    // Вызываем обновление корзины при загрузке страницы
    updateCartInfo();

    // Автоматически обновляем данные корзины каждые 5 секунд
    setInterval(updateCartInfo, 5000);
});
