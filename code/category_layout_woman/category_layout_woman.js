


// Фильтры
function filterItems() {
    // Получаем состояние каждого фильтра
    const coatChecked = document.getElementById('coatFilter').checked;
    const jeansChecked = document.getElementById('jeansFilter').checked;
    const pantsChecked = document.getElementById('pantsFilter').checked;
    const skirtsShortsChecked = document.getElementById('skirtsShortsFilter').checked;
    const sweatshirtsChecked = document.getElementById('sweatshirtsFilter').checked;
    const tshirtsChecked = document.getElementById('tshirtsFilter').checked;
    const topsBodysuitsChecked = document.getElementById('topsBodysuitsFilter').checked;
    const shirtsBlousesChecked = document.getElementById('shirtsBlousesFilter').checked;
    const knitwearChecked = document.getElementById('knitwearFilter').checked;
  
    // Получаем все элементы товаров
    const products = document.querySelectorAll('.products__card');
  
    // Проверка, выбраны ли фильтры
    const noFiltersSelected = !coatChecked && !jeansChecked && !pantsChecked && !skirtsShortsChecked &&
                              !sweatshirtsChecked && !tshirtsChecked && !topsBodysuitsChecked &&
                              !shirtsBlousesChecked && !knitwearChecked;
  
    // Если фильтры не выбраны, показываем первые 9 товаров
    if (noFiltersSelected) {
      products.forEach((product, index) => {
        product.closest('li').style.display = index < 9 ? 'block' : 'none';
      });
      return;
    }
  
    // Пробегаемся по каждому товару и проверяем его соответствие фильтрам
    products.forEach(product => {
      const isCoat = product.closest('li').classList.contains('coat-trench');
      const isJeans = product.closest('li').classList.contains('jeans');
      const isPants = product.closest('li').classList.contains('pants');
      const isSkirtsShorts = product.closest('li').classList.contains('skirts-shorts');
      const isSweatshirts = product.closest('li').classList.contains('sweatshirts');
      const isTshirts = product.closest('li').classList.contains('tshirts');
      const isTopsBodysuits = product.closest('li').classList.contains('tops-bodysuits');
      const isShirtsBlouses = product.closest('li').classList.contains('shirts-blouses');
      const isKnitwear = product.closest('li').classList.contains('knitwear');
  
      // Логика отображения товаров при включенных фильтрах
      if (
        (coatChecked && isCoat) ||
        (jeansChecked && isJeans) ||
        (pantsChecked && isPants) ||
        (skirtsShortsChecked && isSkirtsShorts) ||
        (sweatshirtsChecked && isSweatshirts) ||
        (tshirtsChecked && isTshirts) ||
        (topsBodysuitsChecked && isTopsBodysuits) ||
        (shirtsBlousesChecked && isShirtsBlouses) ||
        (knitwearChecked && isKnitwear)
      ) {
        product.closest('li').style.display = 'block';
      } else {
        product.closest('li').style.display = 'none';
      }
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
  
    // Логика фильтрации товаров
    console.log(`Фильтрация товаров с минимальной ценой: ${minValue} руб.`);
  }


  document.querySelectorAll('.products__card').forEach(card => {
    card.addEventListener('click', () => {
        const productId = card.closest('li').id; // Получаем ID товара
        window.location.href = `./../product_card/product_card.html?id=${productId}`;
    });
});

// Пример добавления товаров на страницу
products.forEach(product => {
  const productHtml = `
      <div class="product-card">
          <h3>${product.name}</h3>
          <p>${product.price} $</p>
          <a href="product_card.html?id=${product.id}">Подробнее</a>
      </div>
  `;
  document.querySelector('.product-container').innerHTML += productHtml;
});
