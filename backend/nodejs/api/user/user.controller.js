// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
const _ = require('underscore');
// const User = require('./user.model');
const services = require('./user.services');

exports.saveUser = (req, res) => {
  const data = req.body;
  return services.saveUserPromise(data)
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { body } = _.pick(req.body, ['email', 'password']);
  return services.updateUserPromise(id, body)
    .then(response => res.json({ ...response, ok: true }))
    .catch(err => res.status(400).json(err));
};

exports.getUsers = (req, res) => {
  const { sky } = req.query || 0;
  const { lim } = req.query || 5;
  return services.getUsersPromise(sky, lim)
    .then(response => res.json({ ...response, ok: true }))
    .catch(err => res.status(400).json(err));
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  return services.deleteUSerPromise(id)
    .then(response => res.json({ ...response, ok: true }))
    .catch(err => res.status(400).json(err));
};
