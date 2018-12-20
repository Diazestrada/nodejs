const controller = {};
const service = require('./book.services');

controller.saveBook = (req, res) => {
    const data = req.body;
    return service.saveBookPromise(data)
    .then(book => res.json(book))
    .catch(error => res.status(400).json(error));
};


module.exports = controller;