const auth_router = require('express').Router()

const User = require("../models/User");

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
        req.session.errors = ["somone got that username, let's try that agan."]
        return res.redirect('/')
    });

    // User.create(req.body)
    //     .then(new_user => {
    //         req.session.save(() => {
    //           req.session.user_id = new_user.id;
    //           res.redirect("/");
    //         });
    //       })
    //       .catch(err => {
    //         req.session.errors = err.errors.map(e => e.message);
    //         res.redirect("/register");
    //       })

});

module.exports = auth_router;