document.getElementById('sendCodeBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();

    if (!email) {
        alert('Введите ваш email');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
            alert('Код отправлен на вашу почту');
        } else {
            const error = await response.json();
            alert(error.message || 'Ошибка при отправке кода');
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка соединения с сервером');
    }
});

document.getElementById('verifyCodeBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const code = document.getElementById('code').value.trim();

    if (!email || !code) {
        alert('Заполните все поля');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code }),
        });

        if (response.ok) {
            alert('Код подтвержден. Вы будете перенаправлены для смены пароля.');
            window.location.href = './reset_password.html';
        } else {
            const error = await response.json();
            alert(error.message || 'Неправильный код');
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка соединения с сервером');
    }
});
