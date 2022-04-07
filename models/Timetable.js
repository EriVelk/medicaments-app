const {Schema, model} = require('mongoose');

const TimetableSchema = new Schema({
    datestart:{
        type: Date
    },
    dateend:{
        type: Date
    },
    pacient:{
        type:Schema.Types.ObjectId,
        ref:'Pacient'
    },
    medicament:{
        type:Schema.Types.ObjectId,
        ref:'Medicament'
    },
    prescription:{
        type:Schema.Types.ObjectId,
        ref:'Perscription' 
    }
},{
    timestamps: true
});

module.exports = model('Timetable', TimetableSchema)