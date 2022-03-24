const {Schema, model} = require('mongoose');

const MedicamentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    size:{
        type: Number,
        required:true,
        default: 1
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps : true
})

module.exports = model('Medicament', MedicamentSchema)