const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Workout = require('../../models/Workout');
const Meal = require('../../models/Meal');
const Session = require('../../models/Session');
const util = require('util');

// @route POST /api/users/log/workout
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
  
    const { title, intensity, category, comment } = req.body;
    Workout.create(
        {
            email: session.email,
            title: title, 
            intensity: intensity, 
            category: category,
            comment: comment,
            date: Date.now()
        },
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
                // console.error(`err: ${err}`);
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

// @route POST /api/users/log/meal
// @desc Add a meal to the database
// @access Public
router.post('/meal', async (req, res) => {
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
  
    const { title, calories, fat, protein, carbs } = req.body;
    Meal.create(
        {
            email: session.email,
            title: title, 
            calories: calories, 
            fat: fat,
            protein: protein,
            carbs: carbs,
            date: Date.now()
        },
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
                // console.error(`err: ${err}`);
            }
            return res.status(200).json({ data: doc });
        }
    )
});

// @route GET /api/users/log/meal
// @desc begin passport custom auth process
// @access Public
router.get('/meal', async (req, res) => {
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
    let meals = await Meal.find({ email: email }).exec();
    // Check if the user has meals
    if (!meals) {
        let err = `Could not find any meals for ${email}!`;
        res.status(401).json(err);
        return;
    }
    
    res.status(200).json({ data: meals });
});

module.exports = router;
