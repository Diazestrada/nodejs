const { Router } = require('express');
const controller = require('./user.controller');
const { verifyToken, verifyAdminRole } = require('../../server/middlewares/auth');

const router = new Router();

router.get('/', verifyToken, controller.getUsers);
router.post('/', controller.saveUser);
router.put('/:id', [verifyToken, verifyAdminRole], controller.updateUser);

module.exports = router;
