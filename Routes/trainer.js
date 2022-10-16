const express = require('express');
const router = express.Router();
const TrainerApproval = require('../models/TrainerApproval')

router.post('/approval', (req, res) => {
    TrainerApproval.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newApproval = new TrainerApproval({
            email: req.body.email,
            description: req.body.description
          })
          
          newApproval.save()
          .then(user => { return res.json(user) })
          .catch(err => console.log(err));
        }
      })
})

router.get('/approvals', (req, res) => {
  const {email} = req.query;
  TrainerApproval.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ data: "Email not found" });
    }
    return res.status(200).json({status: user.status})
  });
})

module.exports = router;