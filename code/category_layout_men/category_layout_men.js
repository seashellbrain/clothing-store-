
// Фильтры
function filterItems() {
	// Получаем состояние каждого фильтра
	const outerwearChecked = document.getElementById('outerwearFilter').checked;
	const jacketsChecked = document.getElementById('jacketsFilter').checked;
	const pantsChecked = document.getElementById('pantsFilter').checked;
	const shirtsChecked = document.getElementById('shirtsFilter').checked;
	const knitwearChecked = document.getElementById('knitwearFilter').checked;
	const tshirtsPoloChecked = document.getElementById('tshirtsPoloFilter').checked;
	const beachwearChecked = document.getElementById('beachwearFilter').checked;
  
	// Получаем все элементы товаров
	const products = document.querySelectorAll('.products__card');
  
	// Проверка, выбраны ли фильтры
	const noFiltersSelected = !outerwearChecked && !jacketsChecked && !pantsChecked &&
							  !shirtsChecked && !knitwearChecked && !tshirtsPoloChecked &&
							  !beachwearChecked;
  
	// Если фильтры не выбраны, показываем первые 9 товаров
	if (noFiltersSelected) {
	  products.forEach((product, index) => {
		product.closest('li').style.display = index < 9 ? 'block' : 'none';
	  });
	  return;
	}
  
	// Пробегаемся по каждому товару и проверяем его соответствие фильтрам
	products.forEach(product => {
	  const isOuterwear = product.closest('li').classList.contains('outerwear');
	  const isJacket = product.closest('li').classList.contains('jackets');
	  const isPants = product.closest('li').classList.contains('pants');
	  const isShirt = product.closest('li').classList.contains('shirts');
	  const isKnitwear = product.closest('li').classList.contains('knitwear');
	  const isTshirtPolo = product.closest('li').classList.contains('tshirts-polo');
	  const isBeachwear = product.closest('li').classList.contains('beachwear');
  
	  // Логика отображения товаров при включенных фильтрах
	  if (
		(outerwearChecked && isOuterwear) ||
		(jacketsChecked && isJacket) ||
		(pantsChecked && isPants) ||
		(shirtsChecked && isShirt) ||
		(knitwearChecked && isKnitwear) ||
		(tshirtsPoloChecked && isTshirtPolo) ||
		(beachwearChecked && isBeachwear)
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
    priceMax.textContent = `10 000 руб.`;
  }
  
  function applyPriceFilter() {
    const priceRangeMin = document.getElementById('priceRangeMin');
    const minValue = parseInt(priceRangeMin.value);
  
    // Логика фильтрации товаров
    console.log(`Фильтрация товаров с минимальной ценой: ${minValue} руб.`);
  }