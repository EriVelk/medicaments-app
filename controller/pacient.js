const Pacient = require('../models/Pacient');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const pacientController = {
    pacientRegister: async (req, res) => {
        const newPacient = new Pacient({
            name: req.body.name,
            surname: req.body.surname,
            secondsurname: req.body.secondsurname,
            email: req.body.email,
            password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        })

        try {
            const savedPacient = await newPacient.save();
            res.status(201).json(savedPacient);
        } catch (error) {
            res.status(500).json("Error:::::::", error);
        }
    },

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
    }
}

module.exports = pacientController;