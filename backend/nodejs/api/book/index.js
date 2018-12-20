const { Router } = require('express');
const controller = require('./book.controller');

const route = Router();

route.post('/add', controller.saveBook);

module.exports = route;