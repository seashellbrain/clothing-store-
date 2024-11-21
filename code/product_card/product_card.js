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
                document.querySelector('.composition-text').innerHTML = product.composition.replace(/\n/g, '<br>');

                // Преобразуем текст ухода в элементы списка
                const careTextElement = document.querySelector('.care-text');
                const careLines = product.care_instructions.split('<br>'); // Разделяем текст по <br>
                careTextElement.innerHTML = ''; // Очищаем содержимое
                careLines.forEach(line => {
                    const listItem = document.createElement('li'); // Создаём элемент <li>
                    listItem.textContent = line.trim(); // Добавляем текст в <li>
                    careTextElement.appendChild(listItem); // Добавляем <li> в <ul>
                });

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