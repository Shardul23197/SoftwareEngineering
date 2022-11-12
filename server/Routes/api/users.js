const express = require("express");
const router = express.Router();

// Util functions
const scoreCalculator = require("../../utils/scoreCalculator");

// Load User model
const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");

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

// @route GET /api/users/calculateWellnessScore
// @desc Returns the user's wellness score.
// @access Public
router.get('/calculateBmi', async (req, res) => {
    const { email } = req.body;
    // // Get the access token from the header
    // const { authorization } = req.headers;
    // const accessToken = authorization.split(' ')[1];

    // let session = await Session.findOne({ accessToken: accessToken });
    // // Check if a session with this user exists
    // if (!session) {
    //     let err = 'Could not find the given accessToken!';
    //     res.status(401).json(err);
    //     return;
    // }

    // let email = session.email;
    // let user = await User.findOne({ email: email });
    // // Check if the user exists
    // if (!user) {
    //     let err = 'Could not find a user with the given email!';
    //     res.status(401).json(err);
    //     return;
    // }

    let userProfile = await UserProfile.findOne({ email: email });
    // Check if the userProfile exists
    if (!userProfile) {
        let err = 'Could not find a user profile with the given email!';
        res.status(401).json(err);
        return;
    }

    if (!userProfile.heightFeet || !userProfile.heightInches || !userProfile.weight) {
        let err = 'The user does has not provided wellness information!';
        res.status(401).json(err);
        return;
    }

    const userHeightInches = userProfile.heightFeet * 12 + userProfile.heightInches;
    res.status(200).json({ bmi: scoreCalculator.calculateBmi(userHeightInches, userProfile.weight) });
});

module.exports = router;



