
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const crypto = require('crypto');

const codes = {};
const express = require('express');
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
app.post('/register', (req, res) => {
    const { loginName, email, phone, gender, password } = req.body;

    // Проверка данных (например, на пустые поля)
    if (!loginName || !email || !phone || !gender || !password) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    // Пример SQL-запроса для добавления нового пользователя
    const query = 'INSERT INTO users (loginName, email, phone, gender, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [loginName, email, phone, gender, password], (err, result) => {
        if (err) {
            console.error('Ошибка при регистрации:', err);
            return res.status(500).json({ message: 'Ошибка при регистрации' });
        }

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
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

// Обработчик для получения данных пользователя по email
app.get('/user', (req, res) => {
    const { email } = req.query;  // Получаем email из query-параметра

    if (!email) {
        return res.status(400).json({ message: 'Email не указан' });
    }

    // SQL-запрос для получения данных пользователя по email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Ошибка при запросе данных пользователя:', err);
            return res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Возвращаем данные пользователя
        res.status(200).json(result[0]);
    });
});

app.post('/user/update', (req, res) => {
    const { email, full_name, phone, birthDate, loginName, gender } = req.body;

    // Проверяем, что все необходимые поля присутствуют
    if (!email || !full_name || !phone || !birthDate || !loginName || !gender) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    // SQL-запрос для обновления данных пользователя
    const query = `UPDATE users SET full_name = ?, phone = ?, birthDate = ?, loginName = ?, gender = ? WHERE email = ?`;
    db.query(query, [full_name, phone, birthDate, loginName, gender, email], (err, result) => {
        if (err) {
            console.error('Ошибка при обновлении данных:', err);
            return res.status(500).json({ message: 'Ошибка при обновлении данных' });
        }

        res.status(200).json({ message: 'Данные успешно обновлены' });
    });
});

app.post('/logout', (req, res) => {
    // Логика для выхода (например, удаление сессии)
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Ошибка выхода');
        }
        res.status(200).send('Выход успешен');
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


app.post('/saveAddress', (req, res) => {
    const token = req.headers['authorization'];  // Получаем токен
  
    if (!token) {
      return res.status(403).json({ success: false, message: 'Необходима авторизация' });
    }
  
    // Получаем email из запроса (или из токена, если используете JWT)
    const { address, email } = req.body;  // Убедитесь, что email передается с запросом
  
    if (!address || address.trim() === '') {
      return res.status(400).json({ success: false, message: 'Адрес не может быть пустым' });
    }
  
    // Если email не передан в теле запроса, вы можете взять его из токена или сессии
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email обязателен' });
    }
  
    const query = 'UPDATE users SET address = ? WHERE email = ?';
    db.query(query, [address, email], (err, result) => {
      if (err) {
        console.error('Ошибка при сохранении адреса в базе данных:', err);
        return res.status(500).json({ success: false, message: 'Ошибка при сохранении адреса' });
      }
      console.log('Адрес успешно сохранен в базе данных');
      res.json({ success: true });
    });
  });

  
  
  // Маршрут для сохранения номера карты
  app.post('/saveCard', (req, res) => {
    const { cardNumber } = req.body;
    const email = 'user@example.com'; // Здесь можно использовать email из сессии или токена
  
    // Проверка корректности номера карты (должен быть 16 символов)
    if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
      return res.status(400).json({ success: false, message: 'Неверный номер карты' });
    }
  
    const query = 'UPDATE users SET card_number = ? WHERE email = ?';
    db.query(query, [cardNumber, email], (err, result) => {
      if (err) {
        console.error('Ошибка при сохранении карты в базе данных:', err);
        return res.status(500).json({ success: false, message: 'Ошибка при сохранении карты' });
      }
      console.log('Карта успешно привязана в базе данных');
      res.json({ success: true });
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



