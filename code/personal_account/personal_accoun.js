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

document.querySelectorAll('.filter-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Отключаем стандартное поведение
        document.querySelectorAll('.filter-link').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        // Логика для перехода на другую страницу
        // window.location.href = this.href; // если переход нужен
    });
});

