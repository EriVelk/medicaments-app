const Doctor = require('../models/Doctor');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const authController = {
    authControllerRegister: async (req, res) => {
        const email = req.body.email;
        const exist = await Doctor.findOne({email:email});

        console.log(exist)

        if(exist){
            res.status(403).json({"message":"El correo ya esta registrado."})
        }else{
            const newDoctor = new Doctor({
                name: req.body.name,
                surname: req.body.surname,
                secondsurname: req.body.secondsurname,
                email: email,
                password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
            })
    
            try {
                const savedDoctor = await newDoctor.save();
                res.status(201).json(savedDoctor);
            } catch (error) {
                res.status(500).json("Error:::: ", error);
            }
        }
    },
    
    authControllerLogin: async (req, res) => {
        try {
            const doctor = await Doctor.findOne({
                email: req.body.email
            })
            
            !doctor && res.status(401).json({"message":"Wrong credentials"});

            const hashedPassword = cryptoJS.AES.decrypt(
                doctor.password,
                process.env.PASS_SEC
            )

            const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

            originalPassword !== req.body.password && res.status(401).json({"message":"Wrong credentials"});

            const accessToken = jwt.sign(
                {
                    id:doctor._id,
                    isadmin: doctor.isadmin
                },
                process.env.JWT_SEC,
                {
                    expiresIn:"3d"
                }
            )

            const{password, ...others} = doctor._doc;
            
            res.status(200).cookie('access_token','Bearer ' + accessToken, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
              }).json({...others, accessToken})

        } catch (error) {
            
            res.status(500).json(error);
            console.log(error);
        
        }
    },

    getAllUsers: async(req, res) =>{
        try {
            const doctors = await Doctor.find().populate({path:"listPacient", model:"Pacient"});
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json(error);
            console.log(error)
        }
    }
};

module.exports = authController;