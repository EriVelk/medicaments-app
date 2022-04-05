const router = require("express").Router();

const {
    pacientRegister, pacientLogin, getAllPacients
} = require('../controller/pacient');


//Registrar
router.post("/register", pacientRegister);

//Login
router.post("/login", pacientLogin)

//Get all
router.get("/pacients/:id", getAllPacients);


module.exports = router;