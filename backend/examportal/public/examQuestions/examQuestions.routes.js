var express = require('express');
var router = express.Router();
var examQuestionsController = require('../examQuestions/examQuestions.controller');

router.get('/getQuestions/:subject',examQuestionsController.getQuestions);
router.post('/addQuestions',examQuestionsController.addQuestions);

module.exports = router;