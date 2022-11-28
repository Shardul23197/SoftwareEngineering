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
        default: '6360687555ff6b895230ff34'
    }
});

// Prehook called before appointment time is saved to the database
// Verifies the start time is at the start of an hour or the half
// hour mark
// UserSchema.pre(
//     'save',
//     async function (next) {
//         // const user = this;
//         const hash = await bcrypt.hash(this.password, 10);
        
//         this.password = hash;
//         next();
//     }
// );

module.exports = Appointment = mongoose.model("appointments", AppointmentSchema)