const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const crypto = require('crypto');

const codes = {};
const app = express(); 
app.use(cors());
app.use(bodyParser.json());



const db = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root', 
    password: '1perestroykA1', 
    database: 'clothing_site',
    port: 3306, 
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


    const code = crypto.randomInt(100000, 999999);
    codes[email] = code;

    console.log(`Код для ${email}: ${code}`); 


    res.status(200).json({ message: 'Код отправлен' });
    
});


app.post('/verify-code', (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    if (codes[email] && codes[email] === parseInt(code, 10)) {
        delete codes[email]; 
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

app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cart WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Ошибка удаления товара из корзины:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json({ message: 'Товар успешно удалён из корзины.' });
    });
});

app.post('/api/cart', (req, res) => {
    const { userId, productId, quantity, size } = req.body;
    if (!userId || !productId || !size) {
        return res.status(400).json({ message: 'Все поля обязательны.' });
    }

    const query = `
        INSERT INTO cart (user_id, product_id, quantity, size)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
    db.query(query, [userId, productId, quantity, size], (err) => {
        if (err) {
            console.error('Ошибка добавления товара в корзину:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json({ message: 'Товар добавлен в корзину.' });
    });
});

app.get('/api/cart/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT c.id, c.quantity, c.size, p.name, p.price, p.image1
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Ошибка получения корзины:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json(results);
    });
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Маршрут для получения данных пользователя по email
app.get('/user', (req, res) => {
    const userEmail = req.query.email.trim().toLowerCase();  // Приводим email к нижнему регистру

    console.log('Запрос на получение данных пользователя с email:', userEmail);  // Логируем email

    // Используем LOWER() в SQL запросе для сравнения email без учета регистра
    const query = 'SELECT id, username, email, phone, gender, birthDate FROM users WHERE LOWER(email) = LOWER(?)'; // Убираем loginName
    db.query(query, [userEmail], (err, results) => {
        if (err) {
            console.error('Ошибка запроса:', err);
            return res.status(500).send('Ошибка на сервере');
        }

        if (results.length === 0) {
            return res.status(404).send('Пользователь с таким email не найден');
        }

        console.log('Данные пользователя:', results[0]);  // Логируем данные пользователя
        res.json(results[0]);  // Возвращаем данные пользователя
    });
});

// Маршрут для обновления данных пользователя
app.post('/user/update', (req, res) => {
    const { email, username, phone, birthDate, gender } = req.body;
    console.log('Запрос на обновление данных пользователя:', req.body);  // Логируем данные для обновления

    const query = `UPDATE users SET username = ?, phone = ?, birthDate = ?, gender = ? WHERE email = ?`;
    db.query(query, [username, phone, birthDate, gender, email], (err) => {
        if (err) {
            console.error('Ошибка запроса:', err);
            return res.status(500).send('Ошибка на сервере');
        }
        res.status(200).send('Данные успешно обновлены');
    });
});



app.get('/api/products/:id/similar', (req, res) => {
    const productId = req.params.id;

    
    const queryProduct = 'SELECT * FROM products WHERE id = ?';
    db.query(queryProduct, [productId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Товар не найден или ошибка запроса:', err);
            return res.status(404).json({ message: 'Товар не найден' });
        }

        const product = results[0];
        const categoryPrefix = productId.split('-')[0]; 


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





app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();


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
        const [rows] = await db.promise().query(query, [productId]);
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
    res.status(404).sendFile(__dirname + './../404/eror.html'); 
});


// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});



