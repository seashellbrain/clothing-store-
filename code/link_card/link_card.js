document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    const submitCardBtn = document.getElementById('submitCardBtn');
  
    // Форматирование номера карты (вставка пробела)
    function formatCardNumber(input) {
      let value = input.value.replace(/\D/g, ''); // Убираем все нецифровые символы
      if (value.length <= 16) {
        input.value = value.replace(/(.{4})(?=.)/g, '$1 '); // Разделяем на блоки по 4 цифры
      }
    }
  
    // Обработчик отправки данных карты
    submitCardBtn.addEventListener('click', function() {
      const cardNumber = cardNumberInput.value.replace(/\s+/g, ''); // Убираем пробелы из номера карты
  
      // Проверяем, что номер карты введен корректно
      if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        alert('Неверный номер карты');
        return;
      }
  
      console.log('Попытка привязать карту:', cardNumber);
  
      // Отправляем номер карты на сервер
      fetch('/saveCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardNumber })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при сохранении карты');
        }
        return response.json();
      })
      .then(data => {
        // После успешного сохранения
        console.log('Карта успешно привязана', data);
        // Перенаправляем на страницу с оплатой
        window.location.href = './../personal_account/payment_delivary.html';
      })
      .catch(error => {
        console.error('Ошибка при запросе:', error);
        alert('Произошла ошибка при привязке карты');
      });
    });
  });
  