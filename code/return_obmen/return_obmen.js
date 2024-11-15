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

document.getElementById('privacyPolicyLink').addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = './../../code/personal_data/personal_data.html'; 
});

function toggleAnswer(element) {
    const answer = element.nextElementSibling; // Находим блок ответа, который идет сразу после вопроса
    const button = element.querySelector(".toggle-button"); // Находим кнопку в текущем вопросе
  
    if (answer.style.display === "block") {
      // Если ответ виден, скрываем его и меняем текст кнопки на "+"
      answer.style.display = "none";
      button.textContent = "+"; 
    } else {
      // Если ответ скрыт, показываем его и меняем текст кнопки на "×"
      answer.style.display = "block";
      button.textContent = "×";
    }
  }