const express = require('express')
const path = require("path");
const router = express.Router()
const UserProfileSchema = require("../models/UserProfile");
const WorkoutVideoSchema = require('../models/WorkoutVideo');
const UserSchema = require('../models/User');
const TrainerApprovalSchema = require('../models/TrainerApproval');

// router.get('/showusers',(req,res)=>{
//     return res.json({msSg:'GET DONE BRO'})
// })



router.get('/showusers', (req, res) => {

  UserProfileSchema.find({}).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ data: "No User Found" });
    }
    // return res.json(data)
    return res.json(user)
  });
});

router.get('/showtrainers', (req, res) => {

  UserSchema.find({role:"trainer"}).then(trainer => {
    // Check if user exists
    if (!trainer) {
      return res.status(404).json({ data: "No Trainer Found" });
    }
    return res.json(trainer)
  });
});

router.get('/showvideos', (req, res) => {

  WorkoutVideoSchema.find({}).then(video => {
    // Check if user exists
    if (!video) {
      return res.status(404).json({ data: "No Workout Found" });
    }
    return res.json(video)
  });
});

router.get('/approvetrainers', (req, res) => {

  TrainerApprovalSchema.find({}).then(approval => {
    // Check if user exists
    if (!approval) {
      return res.status(404).json({ data: "No requests Found" });
    }
    return res.json(approval)
  });
});


// router.PUT('/',(req,res)=>{
//     res.json({msSg:'POST DONE BRO'})
// })

// router.delete('/:id',(req,res)=>{
//     res.json({msSg:'DELETE DONE BRO'})
// })

module.exports = router