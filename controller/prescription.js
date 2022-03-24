const prescriptionController = {};
const Prescription = require('../models/Prescription');

prescriptionController.createPrescription = async(req, res) =>{
    const newPrescription = new Prescription({
        height: req.body.height,
        weight: req.body.weight,
        listmedicament: req.body.listmedicament
    })

    try {
        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription)
    } catch (error) {
        res.status(500).json("Error:::::::: ", error);
    }
}



module.exports = prescriptionController;