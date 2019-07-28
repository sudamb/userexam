var express = require('express');
var router = express.Router();
var userController = require('../user/user.controller');

router.post('/addUser',userController.addUser);
router.get('/getUser',userController.getUser);
router.post('/updateUser/:id',userController.updateUser);

module.exports = router;