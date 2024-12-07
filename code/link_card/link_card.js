document.addEventListener('DOMContentLoaded', function() {
  const cardNumberInput = document.getElementById('cardNumber');
  const submitCardBtn = document.getElementById('submitCardBtn');
  const email = localStorage.getItem('userEmail'); // Получаем email пользователя

  if (!email) {
      alert('Ошибка: email не найден.');
      return;
  }

  submitCardBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const cardNumber = cardNumberInput.value.replace(/\s+/g, ''); // Убираем пробелы
    const email = localStorage.getItem('userEmail'); // Получаем email пользователя

    console.log('Отправляем данные:', { cardNumber, email }); // Лог для проверки

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        alert('Введите корректный номер карты.');
        return;
    }

    fetch('http://localhost:3000/saveCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber, email })
    })
    .then(response => {
        if (!response.ok) throw new Error('Ошибка при сохранении карты');
        return response.json();
    })
    .then(data => {
        console.log('Ответ сервера:', data);
        alert('Карта успешно привязана!');
        window.location.href = './../personal_account/payment_delivary.html';
    })
    .catch(error => console.error('Ошибка при привязке карты:', error));
});
});