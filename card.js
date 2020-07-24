const mongoose = require('mongoose');

    const NoteSchema = mongoose.Schema({
            productName: [String],
            userID:String
        }, {
        timestamps: true
    });

    module.exports = mongoose.model('addproductincard', NoteSchema);