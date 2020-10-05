const db = require('../models');

exports.login = async (req, res) => {
  // menerima request body email dan password, lalu cek di database. apabila matching, return json berupa token yang di generate dengan fungsi tertentu.

  try {
    // validasi input
    if (!req.body.email || !req.body.password) {
      res.status(400).json({message: "bad request. missing parameters"});
    }

    // cek di database
    const user = await db.User.findAll({
      where: { 
        email: req.body.email,
        password: req.body.password //WARNING, jangan menyimpan password dalam bentuk plaintext
      }
    });
    if (user.length > 0) {
      // output jika matching
      res.status(200).json({message: "login success"});
    } else {
      //output jika tidak matching
      res.status(401).json({message: "401 Unauthorized"})
    }  
  } catch (error) {
      //output jika tidak matching
      res.status(500).json({message: error})
  }
}