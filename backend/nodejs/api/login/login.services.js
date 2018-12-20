const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

exports.loginUserPromise = (email, password) => new Promise((resolve, reject) => {

  User.findOne({
    email,
  }, (err, userDB) => {
    if (err) {
      return reject.status(500).json({
        ok: false,
        err,
      });
    }
    if (!userDB || !bcrypt.compareSync(password, userDB.password)) {
      return reject.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrectos',
        },
      });
    }
    const token = jwt.sign({
      user: userDB,
    }, process.env.SEED_TOKEN, {
      expiresIn: process.env.EXP_TOKEN,
    }); // expira en 30 dias
    return resolve.json({
      ok: true,
      userDB,
      token,
    });
  });
});
