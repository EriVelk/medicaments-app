const {Schema, model} = require('mongoose');

const TimetableSchema = new Schema({
    datestart:{
        type: Date
    },
    dateend:{
        type: Date
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Pacient'
    },
    medicament:{
        type:Schema.Types.ObjectId,
        ref:'Medicament'
    }
});

module.exports = model('Timetable', TimetableSchema)