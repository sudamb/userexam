var express = require('express');
var router = express.Router();

module.exports = function(app){
    app.use('/api/user',require('../public/user/user.routes'));
    app.use('/api/exam',require('../public/examQuestions/examQuestions.routes'));
};