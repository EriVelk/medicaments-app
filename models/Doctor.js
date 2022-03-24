const { Schema, model} = require("mongoose");

const DoctorSchema = new Schema(
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
        isadmin:{
            type:Boolean,
            default: true
        },
        isactive:{
            type: Boolean,
            default: true
        },
        listPacient:[
            {
                type: Schema.Types.ObjectId,
                ref:'Pacient'
            }
        ]
    },{
        timestamps: true
    }
)

DoctorSchema.virtual('name_complete').get(function(){
    return this.surname + ', ' + this.name;
})

module.exports = model("Doctor", DoctorSchema);