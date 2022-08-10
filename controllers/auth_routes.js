const auth_router = require('express').Router()
const { User } = require("../models");
const { isLoggedIn } = require('./helpers');


auth_router.post('/register', isLoggedIn, (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        req.session.errors = ["Please check your credentials and try again."];
        return res.redirect("/register");
    }

    User.findOne({
        where: {
            username
        }
    }).then(user => {
        console.log('err')
        if(user) {
            req.session.errors = ["somone got that username, let's try that agan."]
            console.log('stopped before creating');
            return res.redirect('/register')
        }

        else { User.create(req.body)
        .then(new_user => {
            console.log('creating user')
            req.session.save(() => {
                req.session.user_id = new_user.id;
                res.redirect("/dashboard");
            })
        })
        .catch(err => {
            req.session.errors = err.errors.map(e => e.message);
            res.redirect("/register");
        })
    }
    });

});

auth_router.post('/login', isLoggedIn, (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        req.session.errors = ['double check your login info was correct and try again'];
        return res.redirect('/login');
    }
    User.findOne({
        where: {
            username
        }
    }).then(async user => {
        
        if (!user) {
            req.session.errors = ['u do not exist yet'];
            return res.redirect('/login');
        }

        const valid_pass = await user.validatePassword(password, user.password);

        if(!valid_pass) {
            req.session.errors = ['incorrect password!'];
            res.redirect('/login');
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            res.redirect('/dashboard');
        });
    });
});

auth_router.get('/logout', (req, res) => {
    
    if(!req.session.user_id) return res.redirect('/');

    req.session.destroy(() => {
        res.redirect('/');
    })
});

module.exports = auth_router;