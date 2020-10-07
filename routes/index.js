var express = require('express');
var router = express.Router();
const authController = require('../controllers/controller.auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
