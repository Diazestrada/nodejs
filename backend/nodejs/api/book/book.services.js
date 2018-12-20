const modelBook = require('./book.model');
const servi = {};

servi.saveBookPromise = (data) => new Promise((resolve, reject) =>{
    
    const booksave = new modelBook(data);
    booksave.save((err, book) =>{
        if (!err)
        {
            const okBook = {
                ok: true,
                book,
                status: 200
            }

            return resolve(okBook);

        }else{
            const error = {
                ok: false,
                err,
                status: 400
            }
          return reject(error);
        }
    });

});

module.exports = servi;