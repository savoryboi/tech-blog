const {User} = require('../models');
const {Post} = require('../models')

const view_routes = require('express').Router();


view_routes.get('/', (req, res) => {
    if(req.session.user_id) {
        return User.findByPk(req.session.user_id)
        .then(user => {
            console.log(user)
            res.redirect('/dashboard'); // use redirect 
            // const userData = user.dataValues
            // res.render('index', {user: {...user}})
        })
    } else {
        res.render('index')
    }
});

view_routes.get('/login', (req, res) =>{
    res.render('login')
});

view_routes.get('/register', (req, res) => {
    res.render('register')
});

view_routes.get('/dashboard', (req, res) => {
    if(req.session.user_id) {
        console.log('fired')
        return Post.findAll()
        .then(posts => {
            console.log({...posts})
            res.render('dashboard', {post: {...posts}})
        })
    }
    res.render('dashboard')
});

view_routes.get('/new_post', (req, res) => {
    res.render('new_post')
})


module.exports = view_routes;