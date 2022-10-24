const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutVideoSchema = new Schema({
    title: {
        type: String,
        required: 'title is required'
    },
    description: String,
    genre: String,
    views: { type: Number, default: 0 },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'userProfile' },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    url: String
})

module.exports = WorkoutVideo = mongoose.model("workoutVideo", WorkoutVideoSchema)
