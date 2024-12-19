document.addEventListener('DOMContentLoaded', function() {
  const addressInput = document.getElementById('addressInput');
  const saveAddressBtn = document.getElementById('saveAddressBtn');
  const editAddressBtn = document.getElementById('editBtn-1');
  const email = localStorage.getItem('userEmail');

  if (email) {
      fetch(`http://localhost:3000/user?email=${encodeURIComponent(email)}`)
          .then(response => response.json())
          .then(data => {
              if (data.address) {
                  addressInput.value = data.address;
                  addressInput.disabled = true;
                  saveAddressBtn.style.display = 'none';
                  editAddressBtn.style.display = 'block';
              }
          })
          .catch(error => console.error('Ошибка загрузки адреса:', error));
  } else {
      alert('Ошибка: email не найден.');
  }

  saveAddressBtn.addEventListener('click', function() {
      const address = addressInput.value.trim();

      if (!address) {
          alert('Адрес не может быть пустым.');
          return;
      }

      fetch('http://localhost:3000/saveAddress', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({ address, email })
      })
      .then(response => {
          if (!response.ok) throw new Error('Ошибка при сохранении адреса');
          return response.json();
      })
      .then(data => {
          alert('Адрес успешно сохранён!');
          addressInput.disabled = true;
          saveAddressBtn.style.display = 'none';
          editAddressBtn.style.display = 'block';
      })
      .catch(error => console.error('Ошибка при сохранении адреса:', error));
  });

  editAddressBtn.addEventListener('click', function() {
      addressInput.disabled = false;
      saveAddressBtn.style.display = 'block';
      editAddressBtn.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const cardNumberInput = document.getElementById('newCard');
  const email = localStorage.getItem('userEmail');

  if (email) {
      fetch(`http://localhost:3000/user?email=${encodeURIComponent(email)}`)
          .then(response => response.json())
          .then(data => {
              if (data.card_number) {
                  const formattedCard = data.card_number.replace(/(\d{4})(?=\d)/g, '$1 ');
                  cardNumberInput.value = formattedCard;
                  cardNumberInput.disabled = true;
              }
          })
          .catch(error => console.error('Ошибка загрузки карты:', error));
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const cardNumberInput = document.getElementById('newCard');
  const email = localStorage.getItem('userEmail');

  if (email) {
      fetch(`http://localhost:3000/user?email=${encodeURIComponent(email)}`)
          .then(response => response.json())
          .then(data => {
              if (data.card_number) {
                  const formattedCard = data.card_number.replace(/(\d{4})(?=\d)/g, '$1 ');
                  cardNumberInput.value = formattedCard;
              } else {
                  cardNumberInput.value = 'Карта не привязана';
              }
              cardNumberInput.disabled = true;
          })
          .catch(error => console.error('Ошибка загрузки карты:', error));
  }

  const linkCardBtn = document.getElementById('linkCardBtn');
  linkCardBtn.addEventListener('click', function() {
      window.location.href = './../link_card/link_card.html';
  });
});