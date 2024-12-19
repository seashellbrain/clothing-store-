function loginSuccess() {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = './../../code/personal_account/data.html'; 
}

document.querySelector('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!email || !password) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert('Вы успешно вошли!');
            localStorage.setItem('userEmail', email);
            loginSuccess();
        } else {
            const error = await response.text();
            alert(`Ошибка: ${error}`);
        }
    } catch (err) {
        console.error('Ошибка запроса:', err);
        alert('Ошибка соединения с сервером');
    }
});