const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Импорт CORS
const cors = require('cors');
app.use(cors());
const app = express();

// Подключение к базе данных
const db = mysql.createConnection({
    host: '127.0.0.1', // Или 'localhost'
    user: 'root', // Укажите пользователя
    password: '1perestroykA1', // Укажите ваш пароль, если он есть
    database: 'clothing_site',
    port: 3306, // Проверьте порт (по умолчанию 3306)
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключено к базе данных MySQL');
    }
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Разрешить CORS

// Роут для регистрации
app.post('/register', (req, res) => {
    const { username, email, phone, gender, password } = req.body;

    // Проверка на пустые поля
    if (!username || !email || !phone || !gender || !password) {
        return res.status(400).json({ message: "Все поля обязательны для заполнения" });
    }

    // Проверка на пробелы
    if (/\s/.test(email) || /\s/.test(phone) || /\s/.test(password)) {
        return res.status(400).json({ message: "Email, телефон и пароль не могут содержать пробелы" });
    }

    // Проверка длины пароля
    if (password.length < 8) {
        return res.status(400).json({ message: "Пароль должен быть не менее 8 символов" });
    }

    // Проверка на существующий email или телефон
    const checkQuery = 'SELECT * FROM users WHERE email = ? OR phone = ?';
    db.query(checkQuery, [email, phone], (err, results) => {
        if (err) {
            console.error('Ошибка запроса:', err);
            return res.status(500).json({ message: "Ошибка на сервере" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Пользователь с таким Email или Телефоном уже существует" });
        }

        // Добавление пользователя в базу
        const insertQuery = 'INSERT INTO users (username, email, phone, gender, password) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [username, email, phone, gender, password], (err) => {
            if (err) {
                console.error('Ошибка вставки:', err);
                return res.status(500).json({ message: "Ошибка на сервере" });
            }

            res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
        });
    });
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Ошибка запроса:', err);
            return res.status(500).send('Ошибка на сервере');
        }

        if (results.length === 0) {
            return res.status(401).send('Неправильный email или пароль');
        }

        const user = results[0];


        if (password !== user.password) {
            return res.status(401).send('Неправильный email или пароль');
        }

        res.status(200).send('Вы успешно вошли!');
    });
});




app.get('/search', (req, res) => {
    const query = req.query.query;
    connection.query('SELECT * FROM products WHERE LOWER(name) LIKE ?', [`%${query.toLowerCase()}%`], (error, results) => {
        if (error) {
            res.status(500).send('Ошибка на сервере');
        } else {
            res.json(results);
        }
    });
});


app.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const query = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.promise().query(query, [productId]); // Используем promise
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Товар не найден');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});







// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});



