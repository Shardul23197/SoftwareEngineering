const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
    try {
        const conn = await new mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Your DB is connected to ${conn.connection.host}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;