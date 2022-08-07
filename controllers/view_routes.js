const db = require('../config/connection')

db.get('/', (req, res) => {
    res.render('index')
})