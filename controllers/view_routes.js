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

view_routes.get('/posts', (req, res) => {
    res.render('posts')
});


module.exports = view_routes;