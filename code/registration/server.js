const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Настройки базы данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ваш_пароль',
    database: 'clothing_site'
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Подключение к базе данных успешно установлено');
});

app.use(bodyParser.json());

// Маршрут для регистрации
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Заполните все поля');
    }

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.error('Ошибка при добавлении пользователя:', err);
            return res.status(500).send('Ошибка на сервере');
        }
        res.status(200).send('Регистрация успешна');
    });
});

// Маршрут для авторизации
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Заполните все поля');
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Ошибка при авторизации пользователя:', err);
            return res.status(500).send('Ошибка на сервере');
        }

        if (results.length > 0) {
            res.status(200).send('Авторизация успешна');
        } else {
            res.status(401).send('Неверные данные');
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
