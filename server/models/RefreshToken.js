const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RefreshTokenSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    accessToken: {
        type: String,
        unique: true,
        required: true
    },
    refreshToken: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = RefreshToken = mongoose.model("refreshtokens", RefreshTokenSchema);
