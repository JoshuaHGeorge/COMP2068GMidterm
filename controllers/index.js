// link to express package
var express = require('express');

// instantiate new express router to handle http requests
var router = express.Router();


//var usersRouter = require('./controllers/users');
// add mongoose
const mongoose = require('mongoose');
//const globals = require('./config/globals.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Pizza', message: "Order a pizza" });
});



// expose this file as public
module.exports = router;
