const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await new mongoose.connect("mongodb+srv://fitocity:2RlIxUj52XAytIfb@cluster0.f9ojxk6.mongodb.net/fitocity?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Your DB is connected to ${conn.connection.host}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;