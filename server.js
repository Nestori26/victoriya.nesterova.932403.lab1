const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lab1.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
const crypto = require('crypto');
app.get('/api/uuid', (req, res) => {
    let count = req.query.count;
    if (count === undefined || count === '') {
        count = 1;
    } else {
        count = Number(count);
    }
    if (!Number.isInteger(count) || count < 1 || count > 10) {
        return res.status(400).json({
            error: 'Invalid count parameter. Must be integer 1..10.',
            received: req.query.count
        });
    }
    const uuids = [];
    for (let i = 0; i < count; i++) {
        uuids.push(crypto.randomUUID());
    }
    res.json({
        count: count,
        uuids: uuids,
        timestamp: new Date().toISOString()
    });
});
// 404: маршрут не найден
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});
// 500: общая обработка ошибок
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

