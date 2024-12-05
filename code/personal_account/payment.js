document.addEventListener('DOMContentLoaded', function() {
    const addressInput = document.getElementById('addressInput');
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    const editBtn = document.getElementById('editBtn-1');
    const linkCardBtn = document.getElementById('linkCardBtn');
  
    // Обработчик изменений в поле адреса
    const handleAddressChange = () => {
      saveAddressBtn.style.display = 'inline-block'; // Показываем кнопку "Сохранить"
      editBtn.style.display = 'none'; // Прячем кнопку "Изменить"
      console.log('Адрес изменен. Показана кнопка "Сохранить"');
    };
  
    // При изменении адреса показываем кнопку "Сохранить"
    addressInput.addEventListener('input', handleAddressChange);
  
    saveAddressBtn.addEventListener('click', function() {
        const address = addressInput.value;
      
        // Проверка на пустой адрес
        if (address === "") {
          alert("Адрес не может быть пустым.");
          return;
        }
      
        console.log('Попытка сохранить адрес:', address);
      
        // Получаем токен (например, из localStorage или из состояния)
        const token = localStorage.getItem('authToken');  // Или другой способ получения токена
      
        fetch('http://localhost:3000/saveAddress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Передаем токен в заголовке
          },
          body: JSON.stringify({ address })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при сохранении адреса');
          }
          return response.json();
        })
        .then(data => {
          console.log('Адрес успешно сохранен', data);
          addressInput.disabled = true;
          saveAddressBtn.style.display = 'none';
          editBtn.style.display = 'inline-block';
        })
        .catch(error => {
          console.error('Ошибка при запросе:', error);
        });
      });
      
    // Кнопка "Изменить" восстанавливает поле ввода адреса
    editBtn.addEventListener('click', function() {
      addressInput.disabled = false;
      saveAddressBtn.style.display = 'inline-block';
      editBtn.style.display = 'none';
    });
  
    // Привязка карты
    linkCardBtn.addEventListener('click', function() {
      // Убедитесь, что путь правильный для перехода на страницу с картой
      window.location.href = './../link_card/link_card.html'; // Перенаправляем на страницу привязки карты
    });
  });
  