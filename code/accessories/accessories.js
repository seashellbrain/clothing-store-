function filterItems() {
    // Получаем состояние фильтров
    const filters = {
        womenBags: document.getElementById('womenBagsFilter').checked,
        womenBelts: document.getElementById('womenBeltsFilter').checked,
        womenHairAccessories: document.getElementById('womenHairAccessoriesFilter').checked,
        womenHeadwear: document.getElementById('womenHeadwearFilter').checked,
        womenGlasses: document.getElementById('womenGlassesFilter').checked,
        womenGloves: document.getElementById('womenGlovesFilter').checked,
        womenRings: document.getElementById('womenRingsFilter').checked,
        womenEarrings: document.getElementById('womenEarringsFilter').checked,
        manBags: document.getElementById('manBagsFilter').checked,
        manBelts: document.getElementById('manBeltsFilter').checked,
        manHairAccessories: document.getElementById('manHairAccessoriesFilter').checked,
        manHeadwear: document.getElementById('manHeadwearFilter').checked,
        manGlasses: document.getElementById('manGlassesFilter').checked,
        manJewelry: document.getElementById('manJewelryFilter').checked,
        manWallets: document.getElementById('manWalletsFilter').checked,
    };

    // Получаем все элементы товаров
    const products = document.querySelectorAll('.products__card');

    // Проверка, выбраны ли фильтры
    const noFiltersSelected = !Object.values(filters).includes(true);

    // Если фильтры не выбраны, показываем все товары
    if (noFiltersSelected) {
        products.forEach(product => {
            product.closest('li').style.display = 'block';
        });
        return;
    }

    // Фильтрация товаров
    products.forEach(product => {
        const parent = product.closest('li');
        const productClasses = parent.classList;

        const isMatch = (
            (filters.womenBags && productClasses.contains('women-bags')) ||
            (filters.womenBelts && productClasses.contains('women-belts')) ||
            (filters.womenHairAccessories && productClasses.contains('women-hair-accessories')) ||
            (filters.womenHeadwear && productClasses.contains('women-headwear')) ||
            (filters.womenGlasses && productClasses.contains('women-glasses')) ||
            (filters.womenGloves && productClasses.contains('women-gloves')) ||
            (filters.womenRings && productClasses.contains('women-rings')) ||
            (filters.womenEarrings && productClasses.contains('women-earrings')) ||
            (filters.manBags && productClasses.contains('man-bags')) ||
            (filters.manBelts && productClasses.contains('man-belts')) ||
            (filters.manHairAccessories && productClasses.contains('man-hair-accessories')) ||
            (filters.manHeadwear && productClasses.contains('man-headwear')) ||
            (filters.manGlasses && productClasses.contains('man-glasses')) ||
            (filters.manJewelry && productClasses.contains('man-jewelry')) ||
            (filters.manWallets && productClasses.contains('man-wallets'))
        );

        parent.style.display = isMatch ? 'block' : 'none';
    });
}

function updatePriceRange() {
    const priceRangeMin = document.getElementById('priceRangeMin');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');

    // Обновляем отображение минимальной цены
    const minValue = parseInt(priceRangeMin.value);
    priceMin.textContent = `${minValue} руб.`;

    // Устанавливаем максимальную цену
    priceMax.textContent = `2 000 руб.`;
}

function applyPriceFilter() {
    const priceRangeMin = document.getElementById('priceRangeMin');
    const minValue = parseInt(priceRangeMin.value);
    const products = document.querySelectorAll('.products__card');

    products.forEach(product => {
        const parent = product.closest('li');
        const priceText = product.querySelector('.products__card-price').textContent;
        const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));

        if (price >= minValue) {
            parent.style.display = 'block';
        } else {
            parent.style.display = 'none';
        }
    });
}

// Добавляем события
document.getElementById('priceRangeMin').addEventListener('input', () => {
    updatePriceRange();
    applyPriceFilter();
});

const filters = document.querySelectorAll('input[type="checkbox"]');
filters.forEach(filter => filter.addEventListener('change', filterItems));
