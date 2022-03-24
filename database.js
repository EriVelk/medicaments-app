const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dev_db_url = 'mongodb://localhost/medicament';

mongoose.connect(process.env.MONGO_URL || dev_db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => {
        if(db.connection.host == "localhost") console.log('Database is connect local')
        else console.log('Database is connect on cloud')
    }).catch(err => console.log('ERROR::::::[ ', err));