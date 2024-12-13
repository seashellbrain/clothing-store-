function filterItems() {
    // Получаем все выбранные фильтры (женские и мужские)
    const filters = [
        'womenBagsFilter', 'womenBeltsFilter', 'womenHairAccessoriesFilter', 'womenHeadwearFilter', 'womenGlassesFilter', 'womenGlovesFilter', 'womenRingsFilter', 'womenEarringsFilter',
        'manBagsFilter', 'manBeltsFilter', 'manHairAccessoriesFilter', 'manHeadwearFilter', 'manGlassesFilter', 'manJewelryFilter', 'manWalletsFilter'
    ];

    // Получаем все активные фильтры
    const activeFilters = filters.filter(filterId => document.getElementById(filterId).checked);

    // Получаем все элементы товаров
    const products = document.querySelectorAll('.products__card');

    // Проверка, выбраны ли фильтры
    const noFiltersSelected = activeFilters.length === 0;

    // Если фильтры не выбраны, показываем первые 9 товаров
    if (noFiltersSelected) {
        products.forEach((product, index) => {
            product.closest('li').style.display = index < 9 ? 'block' : 'none';
        });
        return;
    }

    // Пробегаемся по каждому товару и проверяем его соответствие активным фильтрам
    products.forEach(product => {
        const productClasses = Array.from(product.closest('li').classList);
        const matchesFilter = activeFilters.some(filterId => productClasses.includes(filterId.replace('Filter', '').toLowerCase()));

        product.closest('li').style.display = matchesFilter ? 'block' : 'none';
    });
}

function updatePriceRange() {
    const priceRangeMin = document.getElementById('priceRangeMin');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');

    // Обновляем отображение минимальной цены
    const minValue = parseInt(priceRangeMin.value);
    priceMin.textContent = `${minValue} руб.`;

    // Предполагаем, что максимальная цена остается фиксированной
    priceMax.textContent = `2 000 руб.`;
}

function applyPriceFilter() {
    const priceRangeMin = document.getElementById('priceRangeMin');
    const minValue = parseInt(priceRangeMin.value);

    // Получаем все элементы товаров
    const products = document.querySelectorAll('.products__card');

    products.forEach(product => {
        const priceElement = product.querySelector('.products__card-price');
        if (priceElement) {
            const price = parseFloat(priceElement.textContent);
            product.closest('li').style.display = price >= minValue ? 'block' : 'none';
        }
    });
}

// Оптимизация работы фильтра для всех чекбоксов
const filterCheckboxes = document.querySelectorAll('.filter-form input[type="checkbox"]');
filterCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterItems));

// Подключение ползунка цены
const priceSlider = document.getElementById('priceRangeMin');
if (priceSlider) {
    priceSlider.addEventListener('input', updatePriceRange);
    priceSlider.addEventListener('change', applyPriceFilter);
} 

// Инициализация начального состояния фильтра при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    filterItems(); // Отобразить первые 9 товаров при загрузке
    updatePriceRange(); // Установить значения диапазона цен
});
