const router = require("express").Router();

const { verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } = require("../config/token");

const {
    createTime, getTimesForPacient
} = require('../controller/timetable');


//Create time 
router.post("/create", createTime);

//Get time by User for Pacient
router.get("/times/pacient",getTimesForPacient)


module.exports = router;