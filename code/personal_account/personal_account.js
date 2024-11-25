

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