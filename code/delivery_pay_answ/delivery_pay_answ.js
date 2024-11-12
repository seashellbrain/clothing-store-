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