const mongoose = require('mongoose');

    const NoteSchema = mongoose.Schema({
            name: String,
            password: String,
            email:String
        }, {
        timestamps: true
    });

    module.exports = mongoose.model('user', NoteSchema);