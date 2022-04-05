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
    age:{
        type:Number,
        default: 0 
    },
    temp:{
        type:String,
    },
    isactive:{
        type: Boolean,
        default: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'Doctor'
    },
    listmedicament:[
        {
            type: Schema.Types.ObjectId,
            ref:'Medicament'
        }
    ]

},{
    timestamps: true
})

module.exports = model('Perscription', PrescriptionSchema);