function filterItems() {
	// Получаем состояние каждого фильтра
	const bagsChecked = document.getElementById('womenBagsFilter').checked;
	const beltsChecked = document.getElementById('womenBeltsFilter').checked;
	const hairAccessoriesChecked = document.getElementById('womenHairAccessoriesFilter').checked;
	const headwearChecked = document.getElementById('womenHeadwearFilter').checked;
	const glassesChecked = document.getElementById('womenGlassesFilter').checked;
	const glovesChecked = document.getElementById('womenGlovesFilter').checked;
	const ringsChecked = document.getElementById('womenRingsFilter').checked;
	const earringsChecked = document.getElementById('womenEarringsFilter').checked;
  
	// Получаем все элементы товаров
	const products = document.querySelectorAll('.products__card');
  
	// Проверка, выбраны ли фильтры
	const noFiltersSelected = !bagsChecked && !beltsChecked && !hairAccessoriesChecked && !headwearChecked &&
							  !glassesChecked && !glovesChecked && !ringsChecked && !earringsChecked;
  
	// Если фильтры не выбраны, показываем первые 9 товаров
	if (noFiltersSelected) {
	  products.forEach((product, index) => {
		product.closest('li').style.display = index < 9 ? 'block' : 'none';
	  });
	  return;
	}
  
	// Пробегаемся по каждому товару и проверяем его соответствие фильтрам
	products.forEach(product => {
	  const isBags = product.closest('li').classList.contains('women-bags');
	  const isBelts = product.closest('li').classList.contains('women-belts');
	  const isHairAccessories = product.closest('li').classList.contains('women-hair-accessories');
	  const isHeadwear = product.closest('li').classList.contains('women-headwear');
	  const isGlasses = product.closest('li').classList.contains('women-glasses');
	  const isGloves = product.closest('li').classList.contains('women-gloves');
	  const isRings = product.closest('li').classList.contains('women-rings');
	  const isEarrings = product.closest('li').classList.contains('women-earrings');
  
	  // Логика отображения товаров при включенных фильтрах
	  if (
		(bagsChecked && isBags) ||
		(beltsChecked && isBelts) ||
		(hairAccessoriesChecked && isHairAccessories) ||
		(headwearChecked && isHeadwear) ||
		(glassesChecked && isGlasses) ||
		(glovesChecked && isGloves) ||
		(ringsChecked && isRings) ||
		(earringsChecked && isEarrings)
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
  
  

  function filterItems() {
	// Получаем состояние каждого фильтра для мужчин
	const bagsChecked = document.getElementById('manBagsFilter').checked;
	const beltsChecked = document.getElementById('manBeltsFilter').checked;
	const hairAccessoriesChecked = document.getElementById('manHairAccessoriesFilter').checked;
	const headwearChecked = document.getElementById('manHeadwearFilter').checked;
	const glassesChecked = document.getElementById('manGlassesFilter').checked;
	const jewelryChecked = document.getElementById('manJewelryFilter').checked;
	const walletsChecked = document.getElementById('manWalletsFilter').checked;
  
	// Получаем все элементы товаров
	const products = document.querySelectorAll('.products__card');
  
	// Проверка, выбраны ли фильтры
	const noFiltersSelected = !bagsChecked && !beltsChecked && !hairAccessoriesChecked && !headwearChecked &&
							  !glassesChecked && !jewelryChecked && !walletsChecked;
  
	// Если фильтры не выбраны, показываем первые 9 товаров
	if (noFiltersSelected) {
	  products.forEach((product, index) => {
		product.closest('li').style.display = index < 9 ? 'block' : 'none';
	  });
	  return;
	}
  
	// Пробегаемся по каждому товару и проверяем его соответствие фильтрам
	products.forEach(product => {
	  const isBags = product.closest('li').classList.contains('man-bags');
	  const isBelts = product.closest('li').classList.contains('man-belts');
	  const isHairAccessories = product.closest('li').classList.contains('man-hair-accessories');
	  const isHeadwear = product.closest('li').classList.contains('man-headwear');
	  const isGlasses = product.closest('li').classList.contains('man-glasses');
	  const isJewelry = product.closest('li').classList.contains('man-jewelry');
	  const isWallets = product.closest('li').classList.contains('man-wallets');
  
	  // Логика отображения товаров при включенных фильтрах
	  if (
		(bagsChecked && isBags) ||
		(beltsChecked && isBelts) ||
		(hairAccessoriesChecked && isHairAccessories) ||
		(headwearChecked && isHeadwear) ||
		(glassesChecked && isGlasses) ||
		(jewelryChecked && isJewelry) ||
		(walletsChecked && isWallets)
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
  