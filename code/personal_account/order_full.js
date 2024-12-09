document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('userEmail');

    if (!email) {
        alert('Пожалуйста, войдите в аккаунт.');
        window.location.href = './../login.html';
        return;
    }

    fetch(`http://localhost:3000/api/orders?email=${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            return response.json();
        })
        .then(orders => {
            const orderList = document.getElementById('order-list');
            if (!orders || orders.length === 0) {
                window.location.href = './order_empty.html';
                return;
            }

            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.order_number}</td>
                    <td>${new Date(order.order_date).toLocaleString()}</td>
                    <td>${order.total_count} товар(ов)</td>
                    <td>${order.total_amount} BYN</td>
                `;
                orderList.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка при загрузке заказов:', error));
});