const db = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.login = async (req, res) => {
  // menerima request body email dan password, lalu cek di database. apabila matching, return json berupa token yang di generate dengan fungsi tertentu.

  try {
    // validasi input
    if (!req.body.email || !req.body.password) {
      res.status(400).json({message: "bad request. missing parameters"});
    }

    // cek di database
    const user = await db.User.findOne({ // async, karena dilakukan oleh Sequelize
      where: {
        email: req.body.email
      }
    });
    // jika user ketemu
    if (user) {
      // cek password
      const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password); // async, dikerjakan oleh bcrypt
      if (isPasswordCorrect) {
        // create standard token, not JWT
        const accessToken = await crypto.randomBytes(24).toString('hex'); // async, karena dikerjakan oleh crypto

        // save token to user
        user.token = accessToken; // assign value
        await user.save(); // async, dilakukan oleh Sequelize

        // send response
        res.status(200).json({
          message : "login success",
          token : accessToken
        })
      } else {
        // password salah
        res.status(401).json({message: "401 Unauthorized"})
      }
    } else {
      // email tidak ditemukan
      res.status(401).json({message: "401 Unauthorized"})
    }  
  } catch (error) {
      // jika terjadi error
      res.status(500).json({message: error.message})
  }
}

exports.register = async (req, res) => {
  try {
    // validasi request body
    if (!req.body.email || !req.body.password) {
      res.status(400).json({message: "bad request. missing parameters"});
    }

    // cek email, tolak jika email sudah terdaftar
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    }); 
    if (user) {
      res.status(401).json({
        message : "Email already taken"
      })
    }

    // buat user baru
    const newUser = await db.User.create({ 
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      is_active: true,
      token: '',
      role: 'PlayerUser',
      createdAt: new Date(),
      updatedAt: new Date()    
    });

    res.status(201).json({
      message : "New User Created",
      user_id : newUser.id
    })

  } catch (error) {
    // jika terjadi error
    res.status(500).json({message: error.message})
  }

}