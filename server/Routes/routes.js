const express = require("express");
const router = express.Router();

// Load User model
const User = require("../models/User");

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

module.exports = router;



