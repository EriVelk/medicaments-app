const { verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } = require("../config/token");

const { getAllMedicaments,
    createMedicament, 
    deleteMedicament, 
    updateMedicament} = require("../controller/medicaments");

const router = require("express").Router();

//Get all
router.get("/", getAllMedicaments)

//Create medicament
router.post("/create" ,createMedicament);

//Delete medicament
router.delete("/delete/:id", deleteMedicament);

//Update medicament
router.put("/update/:id",updateMedicament);

module.exports = router;