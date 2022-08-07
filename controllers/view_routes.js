const view_routes = require('express').Router();


view_routes.get('/', (req, res) => {
    res.render('index')
});

view_routes.get('/login', (req, res) =>{
    res.render('login')
});

view_routes.get('/register', (req, res) => {
    res.render('register')
});

module.exports = view_routes;