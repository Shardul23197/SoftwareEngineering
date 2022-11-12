const express = require('express')
const router = express.Router()
const User = require("../models/UserProfile");
const WorkoutVideo = require('../models/WorkoutVideo');

// router.get('/showusers',(req,res)=>{
//     return res.json({msSg:'GET DONE BRO'})
// })

const UserProfileSchema = require("../models/UserProfile");

router.get('/showusers', (req, res) => {

  User.find({}).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ data: "No User Found" });
    }
    return res.json(data)
  });
});

router.get('/showtrainers', (req, res) => {

  User.find({}).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ data: "No Trainer Found" });
    }
    return res.json(data)
  });
});

router.get('/showvideos', (req, res) => {

  User.find({}).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ data: "No Workout Found" });
    }
    return res.json(data)
  });
});


// router.POST('/',(req,res)=>{
//     res.json({msSg:'POST DONE BRO'})
// })

// router.delete('/:id',(req,res)=>{
//     res.json({msSg:'DELETE DONE BRO'})
// })

module.exports = router