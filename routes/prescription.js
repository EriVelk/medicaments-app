const router = require("express").Router();

const { verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } = require("../config/token");

const {
    createPrescription, addMedicament, getPrescription, getPrescriptionsByDoctor
} = require('../controller/prescription');


//Create prescription 
router.post("/create", createPrescription);

//Add medicaments
router.put("/update/:id", addMedicament);

//Add medicaments
router.get("/:id", getPrescription);

//Get Prescripttion by doctor
router.get("/all/:user", getPrescriptionsByDoctor);


module.exports = router;