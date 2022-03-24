const router = require("express").Router();

const {
    authControllerRegister, 
    authControllerLogin,
    getAllUsers
} = require('../controller/auth');


//Registrar
router.post("/register", authControllerRegister);

//Login
router.post("/login", authControllerLogin);

//Get all doctors
router.get("/all", getAllUsers);

module.exports = router;