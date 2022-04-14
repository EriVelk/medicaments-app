const Pacient = require('../models/Pacient');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { body, validationResult, check } = require('express-validator')

const pacientController = {
    pacientRegister: [
        body('name').trim().isLength({ min: 3 }).escape(),
        body('surname').trim().isLength({ min: 3 }).escape(),
        body('secondsurname').trim().isLength({ min: 3 }).escape(),
        body('password').trim().not().isEmpty().escape(),
        check('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email').custom(async(email) => {
            const emailPacient = await Pacient.findOne({ email: email });
            if (emailPacient) {
                throw new Error('Email al ready in use.');
            }
        }),

        async (req, res) => {

            const errors = validationResult(req);

            if (errors.isEmpty()) {
                const newPacient = new Pacient({
                    name: req.body.name,
                    surname: req.body.surname,
                    secondsurname: req.body.secondsurname,
                    email: req.body.email,
                    user: req.body.user,
                    password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
                })

                try {
                    const savedPacient = await newPacient.save();
                    res.status(201).json(savedPacient);
                } catch (error) {
                    res.status(500).json("Error:::: ", error);
                }
                
            }else{
                res.status(403).json({errors: errors.array()});
            }
        }
    ],

    pacientLogin: async (req, res) => {
        try {
            const pacient = await Pacient.findOne({
                email: req.body.email
            })

            !pacient && res.status(401).json({ "message": "Wrong credentials" });

            const hashedPassword = cryptoJS.AES.decrypt(
                pacient.password,
                process.env.PASS_SEC
            )

            const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

            originalPassword !== req.body.password && res.status(401).json({ "message": "Wrong credentials" });

            const accessToken = jwt.sign(
                {
                    id: pacient._id,
                    isadmin: pacient.isadmin
                },
                process.env.JWT_SEC,
                {
                    expiresIn: "3d"
                }
            )

            const { password, ...others } = pacient._doc;

            res.status(200).cookie('access_token', 'Bearer ' + accessToken, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            }).json({ ...others, accessToken })

        } catch (error) {

            res.status(500).json(error);
            console.log(error);

        }
    },
    getAllPacients: async(req, res) =>{
        const pacients = await Pacient.find({user:req.params.id}).populate({path:"user", model:"Doctor", match:{ isactive : true }})
        if(pacients.length > 0){
            try {
                res.status(200).json(pacients);
            } catch (error) {
                res.status(401).json(error);
            }
        }else{
            res.status(404).json({"message":"Doctor no tiene pacientes."});
        }
        
    },
    getPacientById: async(req, res) => {
        const pacient = await Pacient.findById(req.params.id);
        if(pacient){
            try {
                res.status(200).json(pacient);
            } catch (error) {
                res.status(401).json(error);
            }
        }else{
            res.status(404).json({"message":"No existe el paciente."});
        }
    }
}

module.exports = pacientController;