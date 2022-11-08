const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Workout = require('../../models/Workout');
const Session = require('../../models/Session');
const util = require('util');

// Makes a new Session for the user if there isn't
// one in the database already
const getSession = async (user, done) => {
    console.log(JSON.stringify(user));
    // Store the user's id and email
    const _id = user._id;
    const email = user.email;
    const mfaRequired = user.enrolled_in_mfa;

    let session = undefined;
    // If the user already has a refresh token in the db
    // return their current access token 
    await Session.findOne({ email: email })
        .exec()
        .then((doc) => {
            session = doc;
            // console.log(`found doc: ${JSON.stringify(doc)}`);
        })
        .catch((err) => {
            console.error(`getSession err: ${err}`);
            done('Could not use the given email to search for a refresh token!');
        }
    );

    if (session) {
        done(null, session);
        return;
    }

    // User does not have a current session
    // Generate an access token/refresh token
    const body = { _id: _id, email: email };
    const accessToken = jwt.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: '20m'});
    const refreshToken = jwt.sign(body, process.env.JWT_REFRESH_KEY);

    // Save the session and its associated info
    new Session({
        email: email,
        accessToken: accessToken,
        refreshToken: refreshToken,
        mfaRequired: mfaRequired
    }).save()
        .then((doc) => {
            // Return the token
            done(null, doc);
        })
        .catch(err => { 
            console.error(err);
            done('Could not save refresh JWT!');
        }
    );
};


// @route POST /api/users/workoutLog/workout
// @desc Add a workout to the database
// @access Public
router.post('/workout', async (req, res) => {
    // Get the access token from the header
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];
  
    let session = await Session.findOne({ accessToken: accessToken });
    // Check if a session with this user exists
    if (!session) {
        let err = 'Could not find the given accessToken!';
        res.status(401).json(err);
        return;
    }
  
    const { workoutTitle, workoutIntensity, workoutCategory, workoutComment } = req.body;
    Workout.create(
        {
            email: session.email,
            workoutTitle: workoutTitle, 
            workoutIntensity: workoutIntensity, 
            workoutCategory: workoutCategory,
            workoutComment: workoutComment,
            date: Date.now()
        },
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            return res.status(200).json({ data: doc });
        }
    )
});

// @route GET /api/users/workoutLog/workout
// @desc begin passport custom auth process
// @access Public
router.get('/workout', async (req, res) => {
    // Get the access token from the header
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];
  
    let session = await Session.findOne({ accessToken: accessToken });
    // Check if a session with this user exists
    if (!session) {
        let err = 'Could not find the given accessToken!';
        res.status(401).json(err);
        return;
    }

    let email = session.email;
    let workouts = await Workout.find({ email: email }).exec();
    // Check if the user has workouts
    if (!workouts) {
        let err = `Could not find any workouts for ${email}!`;
        res.status(401).json(err);
        return;
    }
    
    res.status(200).json({ data: workouts });
});

module.exports = router;
