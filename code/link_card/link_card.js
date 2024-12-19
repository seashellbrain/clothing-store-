document.addEventListener('DOMContentLoaded', function() {
  const cardNumberInput = document.getElementById('cardNumber');
  const submitCardBtn = document.getElementById('submitCardBtn');
  const email = localStorage.getItem('userEmail');

  if (!email) {
      alert('Ошибка: email не найден.');
      return;
  }

  submitCardBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
    const email = localStorage.getItem('userEmail');

    console.log('Отправляем данные:', { cardNumber, email });

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
        if (data.success) {
            alert('Карта успешно привязана!');
            window.location.href = './../../code/placing_an_order/placing_an_order.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Ошибка при привязке карты:', error));
});
});

document.getElementById('cardNumber').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
});

document.getElementById('cvv').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('expiryDate').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').replace(/(\d{2})(\d{1,2})/, '$1/$2').substring(0, 5);
});