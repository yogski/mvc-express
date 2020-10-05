const express = require('express');
const router = express.Router();
const passport = require('passport');
const gameController = require('../controllers/controller.game');
const authToken = require('../middlewares/auth'); 

passport.use(authToken.bearer);
const authCheck = passport.authenticate('bearer', { session: false });

/* GET games listing. */
router.get('/', authCheck, gameController.getGames);

module.exports = router;
