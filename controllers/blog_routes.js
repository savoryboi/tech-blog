const blog_router = require('express').Router()
const {User} = require("../models/");
const {Post} = require("../models/");




blog_router.post('/', (req, res) => {

    Post.create(req.body) 
    .then(new_post => {
        console.log('blog post added successfully')
    });

    res.redirect('/dashboard')
});



module.exports = blog_router;