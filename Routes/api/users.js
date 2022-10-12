const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

// Load input validation
const validateRegisterInput = require("../../validation/registerValidation");
const validateLoginInput = require("../../validation/loginValidation");

// Load User model
const User = require("../../models/User");

// // @route POST /api/users/register
// // @desc Register user
// // @access Public
// router.post("/register", ensureGuest, (req, res) => {
//     // Form validation
//     const { errors, isValid } = validateRegisterInput(req.body);

//     // Check validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     User.findOne({ email: req.body.email }).then(user => {
//         if (user) {
//         return res.status(400).json({ email: "Email already exists" });
//         } else {
//         const newUser = new User({
//             username: req.body.username,
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//         });

//         // Hash password before saving in database
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//                 .save()
//                 .then(user => res.json(user))
//                 .catch(err => console.log(err));
//             });
//         });
//         }
//     });
// });

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post("/register",
    passport.authenticate('register', { session: false }),
    async (req, res, next) => {
        res.status(200).json(req.user);
    }
);

module.exports = router;
