const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Импорт CORS
const crypto = require('crypto');

const codes = {};
const app = express(); // Сначала объявляем app
app.use(cors()); // Затем вызываем app.use(cors())
app.use(bodyParser.json());


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

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email обязателен' });
    }

    // Генерация случайного кода
    const code = crypto.randomInt(100000, 999999);
    codes[email] = code;

    console.log(`Код для ${email}: ${code}`); // Для тестирования

    // Здесь будет реальная отправка email через SMTP, например с nodemailer
    res.status(200).json({ message: 'Код отправлен' });
    
});

// Маршрут для проверки кода
app.post('/verify-code', (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    if (codes[email] && codes[email] === parseInt(code, 10)) {
        delete codes[email]; // Удаляем использованный код
        return res.status(200).json({ message: 'Код подтвержден' });
    }

    res.status(400).json({ message: 'Неправильный код' });
});
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



app.get('/api/products/:id/similar', (req, res) => {
    const productId = req.params.id;

    // Проверяем, есть ли товар с таким ID
    const queryProduct = 'SELECT * FROM products WHERE id = ?';
    db.query(queryProduct, [productId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Товар не найден или ошибка запроса:', err);
            return res.status(404).json({ message: 'Товар не найден' });
        }

        const product = results[0];
        const categoryPrefix = productId.split('-')[0]; // Определяем категорию по префиксу ID

        // Получаем похожие товары из той же категории
        const querySimilar = `
            SELECT * FROM products
            WHERE id LIKE ? AND id != ?
            LIMIT 4
        `;
        db.query(querySimilar, [`${categoryPrefix}-%`, productId], (err, similarProducts) => {
            if (err) {
                console.error('Ошибка получения похожих товаров:', err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            res.json(similarProducts);
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




// Маршрут для поиска
app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();

    // Запрос в базу данных
    const sql = 'SELECT * FROM products WHERE LOWER(name) LIKE ?';
    db.query(sql, [`%${query}%`], (error, results) => {
        if (error) {
            console.error('Ошибка выполнения запроса:', error);
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







app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + './../404/eror.html'); // Укажите путь к вашей странице eror.html
});


// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});



