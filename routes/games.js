const express = require('express');
const router = express.Router();
const passport = require('passport');
const gameController = require('../controllers/controller.game');
const auth = require('../middlewares/auth'); 

// passport init
passport.use(auth.bearer);
const authCheck = passport.authenticate('bearer', { session: false });

/* GET games listing. */
router.get('/protected', authCheck, auth.adminCheck, gameController.getGames);
router.get('/free', gameController.getGames);
// routes/games.js
router.post('/create-room', authCheck, gameController.createRoom);
router.post('/fight/:room_id', authCheck, gameController.playGame);

module.exports = router;
