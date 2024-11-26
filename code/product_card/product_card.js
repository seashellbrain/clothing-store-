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


if (productId) {
    // Получение текущего товара
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            if (product) {
                // Отображение информации о текущем товаре
                document.querySelector('.product-title').textContent = product.name;
                document.querySelector('.product-price').textContent = `${product.price} BYN`;
                document.querySelector('.composition-text').innerHTML = product.composition.replace(/\n/g, '<br>');
                document.querySelector('.origin-text').textContent = product.origin;
                document.querySelector('.product-image').src = product.image1;
                document.querySelector('.product-image-secondary').src = product.image2;

                // Получение похожих товаров
                fetch(`http://localhost:3000/api/products/${productId}/similar`)
                .then(response => response.json())
                .then(similarProducts => {
                    const similarContainer = document.querySelector('.products__cards');
                    similarContainer.innerHTML = ''; // Очищаем контейнер
        
                    // Оставляем только 4 карточки
                    const productsToShow = similarProducts.slice(0, 4);
        
                    productsToShow.forEach(similarProduct => {
                        const card = document.createElement('li');
                        card.classList.add('products__card');
                    
                        card.innerHTML = `
                            <a href="./product_card.html?id=${similarProduct.id}" class="products__card-link">
                                <img class="products__card-img" src="${similarProduct.image1}" alt="${similarProduct.name}" />
                                <h4 class="products__card-title">${similarProduct.name}</h4>
                                <p class="products__card-price">${similarProduct.price} BYN</p>
                            </a>
                        `;
                    
                        similarContainer.appendChild(card);
                    });
                })
                .catch(err => console.error('Ошибка загрузки похожих товаров:', err));
            } else {
                console.error('Товар не найден');
            }
        })
        .catch(error => console.error('Ошибка загрузки товара:', error));
}



document.addEventListener('DOMContentLoaded', () => {
    const sizeOptions = document.querySelectorAll('.size-options');

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Снимаем выделение со всех кнопок
            sizeOptions.forEach(opt => opt.classList.remove('selected'));

            // Добавляем класс "selected" на выбранную кнопку
            option.classList.add('selected');
        });
    });

    const addToCartButton = document.querySelector('.product-button-child');
    addToCartButton.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-options.selected');
        if (!selectedSize) {
            alert('Пожалуйста, выберите размер.');
            return;
        }

        // ID товара из URL
        const productId = new URLSearchParams(window.location.search).get('id');

        fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1, // Замените на текущего пользователя
                productId: productId,
                size: selectedSize.textContent, // Передаем выбранный размер
                quantity: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Ошибка добавления в корзину:', error));
    });
});