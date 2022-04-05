const router = require("express").Router();

const {
    authControllerRegister, 
    authControllerLogin,
    getAllUsers,
    getPacients
} = require('../controller/auth');


//Registrar
router.post("/register", authControllerRegister);

//Login
router.post("/login", authControllerLogin);

//Get all doctors
router.get("/all", getAllUsers);

//Get Pacients by Doctor
router.get("/pacients/:user", getPacients);

module.exports = router;