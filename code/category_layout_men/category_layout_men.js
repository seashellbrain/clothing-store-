function filterItems() {
    // Получаем состояние каждого фильтра
    const outerwearChecked = document.getElementById('outerwearFilter').checked; // Куртки и пальто
    const sweatshirtsChecked = document.getElementById('sweatshirtsFilter').checked; // Толстовки
    const sweatersCardigansChecked = document.getElementById('sweatersCardigansFilter').checked; // Свитеры и кардиганы
    const tshirtsChecked = document.getElementById('tshirtsFilter').checked; // Футболки
    const shirtsChecked = document.getElementById('shirtsFilter').checked; // Рубашки
    const jeansChecked = document.getElementById('jeansFilter').checked; // Джинсы
    const pantsChecked = document.getElementById('pantsFilter').checked; // Брюки
    const shortsChecked = document.getElementById('shortsFilter').checked; // Шорты

    // Получаем все элементы товаров
    const products = document.querySelectorAll('.products__card');

    // Проверка, выбраны ли фильтры
    const noFiltersSelected =
        !outerwearChecked &&
        !sweatshirtsChecked &&
        !sweatersCardigansChecked &&
        !tshirtsChecked &&
        !shirtsChecked &&
        !jeansChecked &&
        !pantsChecked &&
        !shortsChecked;

    // Если фильтры не выбраны, показываем первые 9 товаров
    if (noFiltersSelected) {
        products.forEach((product, index) => {
            product.closest('li').style.display = index < 9 ? 'block' : 'none';
        });
        return;
    }

    // Пробегаемся по каждому товару и проверяем его соответствие фильтрам
    products.forEach(product => {
        const productElement = product.closest('li');
        const isOuterwear = productElement.classList.contains('outerwear'); // Куртки и пальто
        const isSweatshirts = productElement.classList.contains('sweatshirts'); // Толстовки
        const isSweatersCardigans = productElement.classList.contains('sweaters-cardigans'); // Свитеры и кардиганы
        const isTshirts = productElement.classList.contains('tshirts'); // Футболки
        const isShirts = productElement.classList.contains('shirts'); // Рубашки
        const isJeans = productElement.classList.contains('jeans'); // Джинсы
        const isPants = productElement.classList.contains('pants'); // Брюки
        const isShorts = productElement.classList.contains('shorts'); // Шорты

        // Логика отображения товаров при включенных фильтрах
        if (
            (outerwearChecked && isOuterwear) ||
            (sweatshirtsChecked && isSweatshirts) ||
            (sweatersCardigansChecked && isSweatersCardigans) ||
            (tshirtsChecked && isTshirts) ||
            (shirtsChecked && isShirts) ||
            (jeansChecked && isJeans) ||
            (pantsChecked && isPants) ||
            (shortsChecked && isShorts)
        ) {
            productElement.style.display = 'block';
        } else {
            productElement.style.display = 'none';
        }
    });
}
