const { resolveSoa } = require('dns');
const db = require('../config/connection')

db.get('/', (req, res) => {
    res.render('index')
});

db.get('/login', (req, res) =>{
    res.render('login')
});

db.get('/register', (req, res) => {
    res.render('register')
})