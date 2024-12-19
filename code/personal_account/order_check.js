document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('userEmail');

    if (!email) {
        alert('Вы не авторизованы. Пожалуйста, войдите в аккаунт.');
        window.location.href = './../login.html';
        return;
    }

    fetch(`http://localhost:3000/api/check-orders?email=${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            if (data.hasOrders) {
                if (!window.location.href.includes('order_full.html')) {
                    window.location.href = './order_full.html'; 
                }
            } else {
                if (!window.location.href.includes('order_empty.html')) {
                    window.location.href = './order_empty.html'; 
                }
            }
        })
        .catch(error => console.error('Ошибка при проверке заказов:', error));
});