const router = require("express").Router();

const { verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } = require("../config/token");

const {
    createPrescription, addMedicament, getPrescription
} = require('../controller/prescription');


//Create prescription 
router.post("/create", createPrescription);

//Add medicaments
router.put("/update/:id", addMedicament);

//Add medicaments
router.get("/:id", getPrescription);


module.exports = router;