function sendEmail(event) {
  event.preventDefault();

  var phone = document.getElementById('phoneNumber').value;
  var recipientName = document.getElementById('recipientName').value;
  var senderName = document.getElementById('senderName').value;
  var greetingText = document.getElementById('greetingText').value;

  var subject = "Заявка на подарочную карту";
  var body = "Здравствуйте!\n\nЯ хочу заказать подарочную карту.\n\n" +
             "Номер телефона: " + phone + "\n" +
             "Имя получателя: " + recipientName + "\n" +
             "Имя отправителя: " + senderName + "\n" +
             "Текст поздравления: " + greetingText;

  var mailtoLink = "mailto:RoyalAttue@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

  window.location.href = mailtoLink;
}