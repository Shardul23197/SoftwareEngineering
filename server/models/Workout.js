const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    workoutTitle: {
        type: String,
        required: true
    },
    workoutIntensity: {
        type: String,
        enum: ['High','Medium','Low'],
        required: true
    },
    workoutCategory: {
        type: String,
        required: true
    }
});

module.exports = Workout = mongoose.model("workouts", WorkoutSchema);
