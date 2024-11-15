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




// Фильтры
function filterItems() {
    // Получаем состояние каждого фильтра
    const coatChecked = document.getElementById('coatFilter').checked;
    const jeansChecked = document.getElementById('jeansFilter').checked;
    const pantsChecked = document.getElementById('pantsFilter').checked;
    const skirtsShortsChecked = document.getElementById('skirtsShortsFilter').checked;
    const sweatshirtsChecked = document.getElementById('sweatshirtsFilter').checked;
    const tshirtsChecked = document.getElementById('tshirtsFilter').checked;
    const topsBodysuitsChecked = document.getElementById('topsBodysuitsFilter').checked;
    const shirtsBlousesChecked = document.getElementById('shirtsBlousesFilter').checked;
    const knitwearChecked = document.getElementById('knitwearFilter').checked;
  
    // Получаем все элементы товаров
    const products = document.querySelectorAll('.products__card');
  
    // Проверка, выбраны ли фильтры
    const noFiltersSelected = !coatChecked && !jeansChecked && !pantsChecked && !skirtsShortsChecked &&
                              !sweatshirtsChecked && !tshirtsChecked && !topsBodysuitsChecked &&
                              !shirtsBlousesChecked && !knitwearChecked;
  
    // Если фильтры не выбраны, показываем первые 9 товаров
    if (noFiltersSelected) {
      products.forEach((product, index) => {
        product.closest('li').style.display = index < 9 ? 'block' : 'none';
      });
      return;
    }
  
    // Пробегаемся по каждому товару и проверяем его соответствие фильтрам
    products.forEach(product => {
      const isCoat = product.closest('li').classList.contains('coat-trench');
      const isJeans = product.closest('li').classList.contains('jeans');
      const isPants = product.closest('li').classList.contains('pants');
      const isSkirtsShorts = product.closest('li').classList.contains('skirts-shorts');
      const isSweatshirts = product.closest('li').classList.contains('sweatshirts');
      const isTshirts = product.closest('li').classList.contains('tshirts');
      const isTopsBodysuits = product.closest('li').classList.contains('tops-bodysuits');
      const isShirtsBlouses = product.closest('li').classList.contains('shirts-blouses');
      const isKnitwear = product.closest('li').classList.contains('knitwear');
  
      // Логика отображения товаров при включенных фильтрах
      if (
        (coatChecked && isCoat) ||
        (jeansChecked && isJeans) ||
        (pantsChecked && isPants) ||
        (skirtsShortsChecked && isSkirtsShorts) ||
        (sweatshirtsChecked && isSweatshirts) ||
        (tshirtsChecked && isTshirts) ||
        (topsBodysuitsChecked && isTopsBodysuits) ||
        (shirtsBlousesChecked && isShirtsBlouses) ||
        (knitwearChecked && isKnitwear)
      ) {
        product.closest('li').style.display = 'block';
      } else {
        product.closest('li').style.display = 'none';
      }
    });
  }
  
  