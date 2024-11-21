
document.getElementById('privacyPolicyLink').addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = './../../code/personal_data/personal_data.html'; 
});

function toggleAnswer(element) {
    const answer = element.nextElementSibling; // Находим блок ответа, который идет сразу после вопроса
    const button = element.querySelector(".toggle-button"); // Находим кнопку в текущем вопросе
  
    if (answer.style.display === "block") {
      // Если ответ виден, скрываем его и меняем текст кнопки на "+"
      answer.style.display = "none";
      button.textContent = "+"; 
    } else {
      // Если ответ скрыт, показываем его и меняем текст кнопки на "×"
      answer.style.display = "block";
      button.textContent = "×";
    }
  }