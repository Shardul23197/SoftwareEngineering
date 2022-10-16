const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user','trainer','admin'],
    default: 'user'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "userProfile"
  }
});
module.exports = User = mongoose.model("users", UserSchema);