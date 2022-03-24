const router = require("express").Router();

const {
    pacientRegister, pacientLogin
} = require('../controller/pacient');


//Registrar
router.post("/register", pacientRegister);

//Login
router.post("/login", pacientLogin)


module.exports = router;