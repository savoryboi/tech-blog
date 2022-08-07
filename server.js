const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3333;

const db = require('./config/connection')
const { engine } = require("express-handlebars");
const sesh = require('express-session');

// use front end files
app.use(express.static(path.join("front")));

// set up engine with hbs
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// allow json to be used
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
