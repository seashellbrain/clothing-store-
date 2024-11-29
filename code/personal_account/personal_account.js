

document.querySelectorAll('.filter-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Отключаем стандартное поведение
        document.querySelectorAll('.filter-link').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        // Логика для перехода на другую страницу
        // window.location.href = this.href; // если переход нужен
    });
});


document.getElementById('fullName').addEventListener('input', function (e) {
    // Разрешаем только буквы, пробелы и дефисы
    const regex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;
    const value = e.target.value;

    // Если введенный текст не соответствует разрешенным символам, удаляем его
    if (!regex.test(value)) {
        e.target.value = value.replace(/[^а-яА-ЯёЁa-zA-Z\s-]/g, '');
    }
});


// Кнопки "Сразу" и "При получении"
function togglePaymentMethod(button) {
    // Убираем класс "active" у всех кнопок
    const buttons = document.querySelectorAll('.payment-method');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // класс "active"
    button.classList.add('active');
    
   
    const selectedMethod = button.getAttribute('data-method');
    console.log('Выбран способ оплаты:', selectedMethod);

    // "selectedMethod"
}

// Ввод новой карты
function formatCardNumber(input) {
    
    let cardNumber = input.value;

    cardNumber = cardNumber.replace(/\D/g, '');
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    if (cardNumber.length > 19) {
        cardNumber = cardNumber.substring(0, 19);
    }

    input.value = cardNumber;
}
