const db = require('../models');

exports.getGames = async function (req, res) { 
    try {
        var games = await db.Game.findAll();
        return res.status(200).json({ status: 200, data: games, message: "Games found." });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}