// Получаем ID из параметров URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Проверяем, передан ли ID
if (productId) {
    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            // Заполняем страницу данными товара
            document.querySelector('.product-title').textContent = product.name;
            document.querySelector('.product-price').textContent = `${product.price} BYN`;
            document.querySelector('.product-description').textContent = product.description;
            document.querySelector('.product-image').src = product.image1;
            // Добавьте дополнительные поля по необходимости
        })
        .catch(error => console.error('Ошибка загрузки продукта:', error));
} else {
    console.error('ID продукта не указан');
}