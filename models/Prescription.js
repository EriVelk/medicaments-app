const {Schema, model} = require('mongoose');

const PrescriptionSchema = new Schema({
    height:{
        type: Number,
        default: 0
    },
    weight:{
        type:Number,
        default: 0
    },
    listmedicament:[
        {
            type: Schema.Types.ObjectId,
            ref:'Medicament'
        }
    ]

})

module.exports = model('Perscription', PrescriptionSchema);