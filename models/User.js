const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String
        // unique: true
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // unique: true
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String
        // required: true,
        // unique: true
    },
    googleDisplayName: {
        type: String
        // required: true
    }
});

// Prehook called before user is save to database. Hashes the password then
// calls the callback
UserSchema.pre(
    'save',
    async (next) => {
        // const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        
        this.password = hash;
        next();
    }
);

// Checks if the user provided the valid password
UserSchema.methods.isValidPassword = async (password, user) => {
    console.log(JSON.stringify(user));
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = User = mongoose.model("users", UserSchema);
