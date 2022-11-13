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
      default: "https://ui-avatars.com/api/?name=ME&size=256"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
})
  
module.exports = UserProfile = mongoose.model("userProfile", UserProfileSchema)