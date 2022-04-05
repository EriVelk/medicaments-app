const timetableController = {};
const Timetable = require('../models/Timetable');

timetableController.createTime = async (req, res) => {
    const newTime = new Timetable({
        datestart: req.body.datestart,
        dateend: req.body.dateend,
        user: req.body.user,
        medicament: req.body.medicament,
        prescription: req.body.prescription
    })

    try {
        const savedTime = await newTime.save();
        res.status(201).json(savedTime);
    } catch (error) {
        res.status(500).json("Error:::::::: ", error);
    }
}

timetableController.getTimesForPacient = async (req, res) => {
    try {
        const times = await Timetable.find({ user: req.params.id})
            .populate({ path: "user", model: "Pacient" })
            .populate({ path: "medicament", model: "Medicament" })
            .populate({ path: "prescription", model: "Perscription"})
        res.status(200).json(times);
    } catch (error) {
        res.status(401).json(error);
    }

}

timetableController.getTimesForDoctor = async (req, res) => {
    try {
        const times = await Timetable.find({ user: req.params.id })
            .populate({ path: "medicament", model: "Medicament" })
        res.status(200).json(times);
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = timetableController;