const bcrypt = require('bcrypt');

// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
// const _ = require('underscore');

const User = require('./user.model');

exports.saveUserPromise = data => new Promise((resolve, reject) => {
  const temp = {
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  };
  const user = new User(temp);
  user.save((err, userDB) => {
    if (err) {
      const error = {
        ok: false,
        err,
        status: 400,
      };
      return reject(error);
    }
    const ok = {
      userDB,
      ok: true,
    };
    return resolve(ok);
  });
});

exports.updateUserPromise = (id, body) => new Promise((resolve, reject) => {
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
    if (err) {
      const error = {
        ok: false,
        err,
        status: 400,
      };
      return reject(error);
    }
    return resolve(userDB);
  });
});

exports.getUsersPromise = (sky, lim) => new Promise((resolve, reject) => {
  User.find({ estado: true }, 'nombre email role estado google img')
    .skip(Number(sky))
    .limit(Number(lim))
    .exec((err, users) => {
      if (err) {
        return reject.status(400).json({
          ok: false,
          err,
        });
      }
      return User.countDocuments({ estado: true }, (errCount, count) => {
        if (errCount) {
          const error = {
            ok: false,
            errCount,
            status: 400,
          };
          return reject(error);
        }
        return resolve(count, users, { ok: true });
      });
    });
});

exports.deleteUSerPromise = id => new Promise((resolve, reject) => {
  User.findByIdAndUpdate(id, { state: false }, { new: true }, (err, userDB) => {
    if (err) {
      return reject.status(400).json({
        ok: false,
        err,
      });
    }
    if (!userDB) {
      return reject.status(400).json({
        status: 400,
        ok: false,
        err: {
          message: 'El usuario no existe padre',
        },
      });
    }
    return resolve.json({
      ok: true,
      delete: userDB,
    });
  });
});
