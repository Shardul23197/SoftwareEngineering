const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    trainerId: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    customerId: {
        type: String,
        default: ''
    }
});

module.exports = Appointment = mongoose.model("appointments", AppointmentSchema)