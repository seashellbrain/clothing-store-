function sendEmail(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения из полей формы
  var phone = document.getElementById('phoneNumber').value;
  var recipientName = document.getElementById('recipientName').value;
  var senderName = document.getElementById('senderName').value;
  var greetingText = document.getElementById('greetingText').value;

  // Формируем тело письма
  var subject = "Заявка на подарочную карту";
  var body = "Здравствуйте!\n\nЯ хочу заказать бонусную программу.\n\n" +
             "Номер телефона: " + phone + "\n" +
             "Имя получателя: " + recipientName + "\n" +
             "Имя отправителя: " + senderName + "\n" +
             "Текст поздравления: " + greetingText;

  // Формируем ссылку для отправки письма через почтовый клиент
  var mailtoLink = "mailto:RoyalAttue@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

  // Открываем почтовый клиент с готовым письмом
  window.location.href = mailtoLink;
}