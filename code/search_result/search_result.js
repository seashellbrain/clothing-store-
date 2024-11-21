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
                resultsContainer.innerHTML += `
                    <li class="mix PC fade-in" id="product-${product.id}">
                        <article class="products__card">
                            <img class="products__card-img" src="${product.image1}" alt="${product.name}" />
                            <h4 class="products__card-title">${product.name}
                                <br>${product.description || ''}</h4>
                            <span class="products__card-price">${product.price} <span>byn</span></span>
                        </article>
                    </li>
                `;
            });
        })
        .catch(error => console.error('Ошибка при поиске:', error));
} else {
    document.querySelector('.products__cards').innerHTML = '<p>Введите запрос для поиска.</p>';
}
