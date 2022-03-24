const router = require("express").Router();

const { verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } = require("../config/token");

const {
    createPrescription
} = require('../controller/prescription');


//Create time 
router.post("/create", createPrescription);


module.exports = router;