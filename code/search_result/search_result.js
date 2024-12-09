// Получение параметра query из URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');

if (query) {
    fetch(`http://localhost:3000/search?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка сервера');
            return response.json();
        })
        .then(products => {
            const resultsContainer = document.querySelector('.products__cards');
            resultsContainer.innerHTML = ''; // Очистка предыдущих результатов

            if (products.length === 0) {
                resultsContainer.innerHTML = '<p>Ничего не найдено.</p>';
                return;
            }

            products.forEach(product => {
                const productElement = document.createElement('li');
                productElement.classList.add('mix', 'PC', 'fade-in');
                productElement.innerHTML = `
                    <article class="products__card" data-id="${product.id}">
                        <img class="products__card-img" src="${product.image1}" alt="${product.name}" />
                        <h4 class="products__card-title">${product.name}<br>${product.description || ''}</h4>
                        <span class="products__card-price">${product.price} <span>byn</span></span>
                    </article>
                `;
                productElement.addEventListener('click', () => {
                    window.location.href = `./../product_card/product_card.html?id=${product.id}`;
                });
                resultsContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Ошибка при поиске:', error));
} else {
    document.querySelector('.products__cards').innerHTML = '<p>Введите запрос для поиска.</p>';
}