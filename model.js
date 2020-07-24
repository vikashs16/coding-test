const mongoose = require('mongoose');

    const NoteSchema = mongoose.Schema({
            name: String,
            description: String,
            price:String,
            make:Number,
        }, {
        timestamps: true
    });

    module.exports = mongoose.model('product', NoteSchema);