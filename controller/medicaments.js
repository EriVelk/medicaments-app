const medicamentController = {};
const Medicament = require('../models/Medicament')

medicamentController.createMedicament = async(req, res) =>{
    
    const newMedicament = new Medicament({
        name:req.body.name,
        description:req.body.description,
        size: req.body.size,
        user: req.user.id
    })

    try {
        const savedMeciament = await newMedicament.save();
        res.status(201).json(savedMeciament);
    } catch (error) {
        res.status(500).json("Error::::: ", error);
    }
}


medicamentController.getAllMedicaments = async(req, res) => {
    try {
        const medicaments = await Medicament.find()
        .populate({path:"user", model:"Doctor", match:{ isactive : true }});
        res.status(201).json(medicaments);
    } catch (error) {
        res.status(401).json(error);
    }
}

medicamentController.deleteMedicament = async(req, res) =>{
    const medicament = await Medicament.findOne({_id:req.params.id})
    if(medicament){   
        try {
            await Medicament.findByIdAndDelete(req.params.id);
            res.status(200).json({"message":"Medicamento eliminado."});
        } catch (error) {
            res.status(401).json(error); 
        }
    }else{
        res.status(404).json({"message":"Medicamento no existe."});
    }
}

medicamentController.updateMedicament = async(req, res) =>{
    const medicament = await Medicament.findOne({_id:req.params.id})    
    if(medicament){
        try {
            const updateMedicament = await Medicament.findByIdAndUpdate(req.params.id,{
                $set: req.body
            }, {new:true})

            res.status(200).json(updateMedicament)
        } catch (error) {
            res.status(401).json(error); 
        }        
    }else{
        res.status(404).json({"message":"Medicamento no existe."});
    }
}

module.exports = medicamentController;