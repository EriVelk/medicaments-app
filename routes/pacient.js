const router = require("express").Router();

const {
    pacientRegister, pacientLogin, getAllPacients, getPacientById
} = require('../controller/pacient');


//Registrar
router.post("/register", pacientRegister);

//Login
router.post("/login", pacientLogin)

//Get all
router.get("/pacients/:id", getAllPacients);

//Get pacient
router.get("/:id", getPacientById);


module.exports = router;