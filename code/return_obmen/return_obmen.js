document.getElementById('privacyPolicyLink').addEventListener('click', function(event) {
    event.preventDefault(); 
    window.location.href = './../../code/personal_data/personal_data.html'; 
});

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const button = element.querySelector(".toggle-button");
  
    if (answer.style.display === "block") {
      answer.style.display = "none";
      button.textContent = "+"; 
    } else {
      answer.style.display = "block";
      button.textContent = "×";
    }
  }