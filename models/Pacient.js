const { Schema, model} = require("mongoose");

const PacientSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        surname:{
            type: String,
            required: true
        },
        secondsurname:{
            type:String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type:String,
            required: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'Doctor'
        },
        listpresciption:[
            {
                type: Schema.Types.ObjectId,
                ref:'Perscription'
            }
        ],
        isactive:{
            type: Boolean,
            default: true
        },
        isadmin:{
            type:Boolean,
            default: false
        }
    },{
        timestamps: true
    }
)

module.exports = model("Pacient", PacientSchema);