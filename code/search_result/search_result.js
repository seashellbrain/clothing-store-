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


document.querySelector('#search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.querySelector('#search-input').value;

    fetch(`http://localhost:3000/search?query=${query}`)
        .then(response => response.json())
        .then(products => {
            const resultsContainer = document.querySelector('.results-container');
            resultsContainer.innerHTML = '';
            products.forEach(product => {
                resultsContainer.innerHTML += `
                    <div class="product-card">
                        <h3>${product.name}</h3>
                        <p>${product.price} $</p>
                        <a href="product_card.html?id=${product.id}">Подробнее</a>
                    </div>
                `;
            });
        });
});