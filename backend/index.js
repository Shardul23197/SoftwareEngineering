const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_URL)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })