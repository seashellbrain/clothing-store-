document.addEventListener('DOMContentLoaded', () => {
    const orderNumber = localStorage.getItem('orderNumber');
    if (orderNumber) {
        document.getElementById('order-number').textContent = orderNumber;
    } else {
        console.error('Номер заказа не найден в localStorage');
    }
});