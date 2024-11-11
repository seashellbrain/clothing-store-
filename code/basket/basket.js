document.addEventListener("DOMContentLoaded", function () {
      var checkoutButton = document.getElementById("rectangle");
      if (checkoutButton) {
          checkoutButton.addEventListener("click", function () {
              window.location.href = "./delivery_payment.html";
          });
      }
  });

// Изменение количества товара
var increaseButton = document.querySelector(".clicker-inner"); 
var decreaseButton = document.querySelector(".clicker-item"); 
var quantityDisplay = document.querySelector(".div18");

if (increaseButton && decreaseButton && quantityDisplay) {
    let quantity = parseInt(quantityDisplay.innerText) || 1;
    
    increaseButton.addEventListener("click", function () {
        quantity++;
        quantityDisplay.innerText = quantity;
        updateTotalPrice(); // Обновление итоговой цены
    });

    decreaseButton.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.innerText = quantity;
            updateTotalPrice(); // Обновление итоговой цены
        }
    });
}

// Функция для обновления итоговой цены
function updateTotalPrice() {
    let pricePerItem = 2500; // Цена за единицу товара (заменить на актуальную)
    let totalPrice = pricePerItem * quantity;
    document.querySelector(".byn").innerText = "Итого: " + totalPrice + " BYN";
}
