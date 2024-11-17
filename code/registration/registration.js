const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ваш_пароль',
    database: 'user_auth'
});

// Проверка подключения
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Функция регистрации пользователя
async function registerUser(username, email, password) {
    const passwordHash = await bcrypt.hash(password, 10); // Хэширование пароля
    const query = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;

    db.query(query, [username, email, passwordHash], (err, results) => {
        if (err) {
            console.error('Error while registering:', err);
        } else {
            console.log('User registered successfully:', results);
        }
    });
}

// Функция входа пользователя
async function loginUser(email, password) {
    const query = `SELECT * FROM users WHERE email = ?`;

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error while logging in:', err);
            return;
        }

        if (results.length === 0) {
            console.log('User not found.');
            return;
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (isPasswordValid) {
            console.log('Login successful.');
        } else {
            console.log('Invalid password.');
        }
    });
}

// Тест регистрации и входа
(async () => {
    await registerUser('Danya', 'danya@example.com', 'my_secure_password');
    await loginUser('danya@example.com', 'my_secure_password');
})();