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
        window.location.href = "./../../code/registration/registration.html";
    } else if (userStatus === "registered") {
        // Если пользователь зарегистрирован, но не вошел, перенаправляем на страницу входа
        window.location.href = "./login_account.html";
    } else if (userStatus === "loggedIn") {
        // Если пользователь уже вошел, перенаправляем в личный кабинет
        window.location.href = "./personal_cabinet.html";
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

document.querySelector('.header-search-btn').addEventListener('click', function() {
    const searchInput = document.querySelector('.header-search input').value; // Получаем текст из поля
    if (searchInput) {
        window.location.href = `./../../code/search_result/search_result.html?query=${encodeURIComponent(searchInput)}`; // Перенаправляем с текстом поиска
    }
});
// Функция для извлечения параметров из URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Функция для запуска поиска по тексту из URL
function performSearchFromURL() {
    const searchQuery = getQueryParam('query'); // Получаем текст из параметра query
    if (searchQuery) {
        document.querySelector('.header-search input').value = searchQuery; // Устанавливаем текст в поле поиска
        searchProducts(); // Выполняем поиск
    }
}

// Выполняем поиск при загрузке страницы
document.addEventListener('DOMContentLoaded', performSearchFromURL);