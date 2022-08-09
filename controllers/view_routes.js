const User = require('../models/User');
const Post = require('../models/Post')

const view_routes = require('express').Router();


view_routes.get('/', (req, res) => {
    if(req.session.user_id) {
        return User.findByPk(req.session.user_id, {
            include: Post
        }).then(user => {
            console.log(user)
            const userData = user.dataValues
            res.render('dashboard', {user: {...user}})
        })
    }
    res.render('index')
});

view_routes.get('/login', (req, res) =>{
    res.render('login')
});

view_routes.get('/register', (req, res) => {
    res.render('register')
});

view_routes.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

view_routes.get('/new_post', (req, res) => {
    res.render('new_post')
})


module.exports = view_routes;