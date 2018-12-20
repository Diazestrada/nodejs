const  mongoose = require('mongoose');

const { Schema } = mongoose;

const boookSchema = new Schema ({
    name_book:{
        type: String
    },
    num_page: {
        type: String
    }
});

module.exports = mongoose.model('Books', boookSchema);