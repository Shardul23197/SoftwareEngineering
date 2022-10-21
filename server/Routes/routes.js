const express = require("express");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require(path.resolve(__dirname, "../config/keys"));
const passport = require("passport");
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Load input validation
const validateRegisterInput = require("../validation/registerValidation");
const validateLoginInput = require("../validation/loginValidation");

// Load User model
const User = require("../models/User");
const UserProfile = require("../models/UserProfile")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", ensureGuest, (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role ? 'trainer': 'user',
      });

      const profile = new UserProfile({
        email: newUser.email,
        id: newUser._id
      })
      newUser.profile = profile._id

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          profile.save().then(profile => {console.log("")}).catch(err => console.log(err))
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  })
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", ensureGuest, (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get('/getrole', (req, res) => {
  const {email} = req.query;
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    return res.status(200).json({role: user.role})
  });
});

router.post('/resetpassword', (req, res) => {
  const {email} = req.body.email;
  const newData = {
    password: ''
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      newData.password = hash;
    });
  });
  User.findOneAndUpdate({ email: email }, { $set: { password: newData.password} }, { new: true }, (err, doc) => {
    if (err) {
      return res.status(400).json({error: 'Something went wrong!'});
    }
    // Sign token
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 31556926 // 1 year in seconds
      },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      }
    );
  })
});
module.exports = router;



