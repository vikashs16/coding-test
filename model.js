const mongoose = require('mongoose');

    const teacherSchema = mongoose.Schema({
            teachers: String,
            students: [String],
        }, {
        timestamps: true
    });

   let teacher =  mongoose.model('Teacher', teacherSchema);

    const studentSchema = mongoose.Schema({
            students: String,
            teachers: [String],
        }, {
        timestamps: true
    });

    let student =  mongoose.model('Student', studentSchema);

    const suspendSchema = mongoose.Schema({
            teachers: String,
            students: String,
        }, {
        timestamps: true
    });

    let suspend =  mongoose.model('Suspend', suspendSchema);

    module.exports = {
        teacher:teacher,
        student:student,
        suspend:suspend
    }