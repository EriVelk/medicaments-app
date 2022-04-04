const { verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } = require("../config/token");

const { getAllMedicaments,
    createMedicament, 
    deleteMedicament, 
    updateMedicament} = require("../controller/medicaments");

const router = require("express").Router();

//Get all
router.get("/", verifyTokenAndAdmin, getAllMedicaments)

//Create medicament
router.post("/create" ,createMedicament);

//Delete medicament
router.delete("/delete/:id", verifyTokenAndAdmin, deleteMedicament);

//Update medicament
router.put("/update/:id", verifyTokenAndAdmin, updateMedicament);

module.exports = router;