const jwt = require('jsonwebtoken');
const User = require('../user/user.model');
const verify = require('../../server/middlewares/google');
const services = require('./login.services.js');

exports.login = (req, res) => {
  const { email, password } = req.body;

  services.loginUserPromise(email, password)
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
};

exports.google = async (req, res) => {
  let { token } = req.body;
  const googleUser = await verify(token).catch(e => res.status(403).json({
    ok: false,
    err: e,
  }));
  const {
    nombre, email, img, google,
  } = googleUser;

  return User.findOne({ email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (userDB) {
      if (userDB.google === false) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Debe de usar su autenticacion normal',
          },
        });
      }
      token = jwt.sign({
        user: userDB,
      }, process.env.SEED_TOKEN, { expiresIn: process.env.EXP_TOKEN }); // expira en 30 dias
      return res.json({
        ok: true,
        userDB,
        token,
      });
    }
    // si el usuario no existe en la BD
    const user = new User({
      nombre,
      email,
      img,
      password: ';)',
      google,
    });
    return user.save((errSave, saveDB) => {
      if (errSave) {
        return res.status(500).json({
          ok: false,
          errSave,
        });
      }
      token = jwt.sign({
        user: saveDB,
      }, process.env.SEED_TOKEN, { expiresIn: process.env.EXP_TOKEN }); // expira en 30 dias
      return res.json({
        ok: true,
        saveDB,
        token,
      });
    });
  });
};
