const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    fullName: {
      type: String
    },
    email: {
        type: String
    },
    phone: {
      type: String
    },
    city: {
      type: String
    },
    image: {
      type: String
    },
    profileImage: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    heightFeet: {
      type: Number
    },
    heightInches: {
      type: Number
    },
    weight: {
      type: Number
    },
    sleepHours: {
      type: Number
    },
    sleepMinutes: {
      type: Number
    }
})
  
module.exports = UserProfile = mongoose.model("userProfile", UserProfileSchema)