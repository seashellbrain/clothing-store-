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





// Функция для анимации подсчета
function animateCounter(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Вызов функции для каждого счетчика
window.onload = function() {
    animateCounter("counter1", 0, 100, 2000); // 100 тысяч доставок в год
    animateCounter("counter2", 0, 20, 2000);  // 20 великих компаний
    animateCounter("counter3", 0, 2, 2000);   // 2 тысячи сотрудников
    animateCounter("counter4", 0, 10, 2000);  // 10 миллионов продукции
};