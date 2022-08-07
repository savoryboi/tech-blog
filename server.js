const path = require('path');
const express = require('express');
const { engine } = require("express-handlebars");

const PORT = process.env.PORT || 3333;

const db = require('./config/connection')
const sesh = require('express-session');
const {view_routes, auth_routes} = require('./controllers/view_routes');

const SeqStore = require("connect-session-sequelize")(sesh.Store);

const app = express();


// use front end files
app.use(express.static(path.join("front")));


// set up engine with hbs
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// allow json to be used
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// app.use(
//     sesh({
//       // secret string to compare to
//       secret: process.env.SESSION_SECRET,
//       // store sesh data to DB
//       store: new SeqStore({ db }),
//       // if nothing is saved drop the session
//       saveUninitialized: false,
//       // prevent sequelize store from destroying idle sesh data
//       resave: false,
//       cookie: {
//         // httpOnly: true
//       }
//     })
//   );
  

app.use('/', view_routes);


// db.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}!`)
    });
// })