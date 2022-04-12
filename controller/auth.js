const Doctor = require('../models/Doctor');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const Pacient = require('../models/Pacient');
const { body, validationResult, check } = require('express-validator')

const authController = {
    authControllerRegister: [
        body('name').trim().isLength({ min: 3 }).escape(),
        body('surname').trim().isLength({ min: 3 }).escape(),
        body('secondsurname').trim().isLength({ min: 3 }).escape(),
        body('password').trim().not().isEmpty().escape(),
        check('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email').custom(async(email) => {
            const emailDoctor = await Doctor.findOne({ email: email });
            if (emailDoctor) {
                throw new Error('Email al ready in use.');
            }
        }),

        async (req, res) => {

            const errors = validationResult(req);

            if (errors.isEmpty()) {
                const email = req.body.email;
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
                
            }else{
                res.status(403).json({errors: errors.array()});
            }
        }
    ],

    authControllerLogin: [
        check('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email').custom(async(email) => {
            const emailBody = await Doctor.findOne({ email: email });
            if (!emailBody) {
                throw new Error('Wrong credentials.');
            }
        }),
        body('password').trim().not().isEmpty().escape().custom(async(password, {req}) => {
            const user = await Doctor.findOne({ email: req.body.email });
            const hashedPassword = cryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            )

            const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

            if(originalPassword !== password) {
                throw new Error('Wrong credentials.');
            }
        }),

        async (req, res) => {
            const errors = validationResult(req);

            if(errors.isEmpty()){
                try {
                    const doctor = await Doctor.findOne({
                        email: req.body.email
                    })
    
                    const accessToken = jwt.sign(
                        {
                            id: doctor._id,
                            isadmin: doctor.isadmin
                        },
                        process.env.JWT_SEC,
                        {
                            expiresIn: "3d"
                        }
                    )
    
                    const { password, ...others } = doctor._doc;
    
                    res.status(200).json({ ...others, accessToken })
    
                } catch (error) {
    
                    res.status(500).json({"error":error.message});
                    console.log(error);
    
                }
            }else{
                res.status(403).json({errors: errors.array()});
            }
            
        }

    ],

    getAllUsers: async (req, res) => {
        try {
            const doctors = await Doctor.find();
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json(error);
            console.log(error)
        }
    },

    getPacients: async(req, res) => {
        try{
            const pacients = await Pacient.find({user:req.params.user})
            .populate({ path: "listpresciption", model: "Perscription" });
            res.status(200).json(pacients);
        }catch(erro){
            res.status(500).json(error);
            console.log(error)
        }
    }
};

module.exports = authController;