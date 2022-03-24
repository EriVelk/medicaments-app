const express = require("express");
const path = require('path');
const moment = require('moment-timezone');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Inicializaciones
const app = express();
require('./database');
moment.tz.setDefault("America/Mexico_City");

//Importando rutas
const authRoutes = require("./routes/auth");
const pacientRoutes = require("./routes/pacient");
const medicamentRoutes = require("./routes/medicaments");
const timetableRoutes = require("./routes/timetable");
const prescriptionRoutes = require("./routes/prescription");

//Configuraciones
app.set('port', process.env.PORT || 5000);

//Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/doctor", authRoutes);
app.use("/api/pacient", pacientRoutes);
app.use("/api/medicaments", medicamentRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/prescription", prescriptionRoutes)

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Start servidor
app.listen(app.get('port'), ()=>{
    console.log("Backend server is running", app.get('port'))
})