const prescriptionController = {};
const Prescription = require('../models/Prescription');
const {body, validationResult} = require('express-validator');

prescriptionController.createPrescription = [
    
    body('height').trim().escape(),
    body('weight').trim().escape(),
    body('age').trim().escape(),
    body('temp').trim().escape(),

    async(req, res) =>{

        const errors = validationResult(req);

        if(errors.isEmpty()){
            const newPrescription = new Prescription({
                height: req.body.height,
                weight: req.body.weight,
                age: req.body.age,
                temp: req.body.age,
                user: req.body.user,
                pacient:req.body.pacient,
                listmedicament: req.body.listmedicament
            })
        
            try {
                const savedPrescription = await newPrescription.save();
                res.status(200).json(savedPrescription)
            } catch (error) {
                res.status(500).json({
                    error : {
                        message : error.message
                   }
                });
            }
        }else{
            res.status(403).json({errors: errors.array()});
        }
    }
]

prescriptionController.addMedicament = async(req, res) => {
    const prescription = await Prescription.findOne({_id:req.params.id});
    const list = req.body.list;
    
    try {
        if(prescription){
            await Prescription.updateOne({_id:req.params.id},{
                $push:{listmedicament:list}
            })
        }else{
            res.status(403).json({message:"Not found"});
        }
    } catch (error) {
        res.status(500).json({
            error : {
                message : error.message
           }
        });
    }

    const newPrescription = await Prescription.findOne({_id:req.params.id});
    res.status(200).json(newPrescription);
}

prescriptionController.getPrescription = async(req, res) =>{
    const prescription = await Prescription.findOne({_id:req.params.id})
        .populate({ path: "user", model: "Doctor" })
        .populate({ path: "listmedicament", model: "Medicament" })

        res.status(200).json(prescription);
}

prescriptionController.getPrescriptionsByDoctor = async(req, res) =>{
    const prescriptions = await Prescription.find({
        user: req.params.user
    }).populate({ path: "pacient", model: "Pacient" })    
    try {
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({
            error : {
                message : error.message
           }
        });
    }
}

module.exports = prescriptionController;