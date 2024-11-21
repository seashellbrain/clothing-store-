const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // Извлечение ID из URL

if (!productId) {
    console.error('ID товара не указан в URL');
}

if (productId) {
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            if (product) {
                // Заполняем данные товара
                document.querySelector('.product-title').textContent = product.name;
                document.querySelector('.product-price').textContent = `${product.price} BYN`;
                document.querySelector('.composition-text').innerHTML = product.composition; // Используем innerHTML для обработки <br>
                document.querySelector('.care-text').innerHTML = product.care_instructions; // Используем innerHTML для обработки <br>
                document.querySelector('.origin-text').textContent = product.origin;
                document.querySelector('.product-image').src = product.image1;
                document.querySelector('.product-image-secondary').src = product.image2;
            } else {
                console.error('Товар не найден');
            }
        })
        .catch(error => console.error('Ошибка загрузки товара:', error));
} else {
    console.error('ID товара не указан в URL');
}
