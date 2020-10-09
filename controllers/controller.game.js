const db = require('../models');

exports.getGames = async function (req, res) { 
    try {
        var games = await db.Game.findAll();
        return res.status(200).json({ status: 200, data: games, message: "Games found." });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// endpoint untuk buat room
exports.createRoom = async function (req, res) {
    try {
        // bikin 6 baris di tabel Rooms. Untuk 3 ronde x 2 player
        for (var i=0; i<6; i++){
            var newRoom = await db.Room.create({
            
            })        
        }
    } catch (error) {
        
    }
}

// endpoint untuk bermain di game/room
exports.playGame = async function (req, res) {
    // update misal ronde 1 untuk player 1, keluarkan suit
}
