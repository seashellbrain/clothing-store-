function toggleCategories() {
      const dropdown = document.getElementById("category-dropdown");
      const button = document.querySelector(".category-button");
  
      // Переключение видимости меню и класса скругления углов
      if (dropdown.style.display === "none" || dropdown.style.display === "") {
          dropdown.style.display = "block";
          dropdown.classList.remove("rounded-corners"); // Добавляем класс для изменения скругления
          button.textContent = "Скрыть категории";
      } else {
          dropdown.style.display = "none";
          dropdown.classList.add("rounded-corners"); // Добавляем класс для изменения скругления
          button.textContent = "ВСЕ КАТЕГОРИИ";
      }
  }