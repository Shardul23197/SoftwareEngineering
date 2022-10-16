const express = require("express");
const router = express.Router();
const Multer = require("multer")
const gcsMiddlewares = require('../middleware/google-cloud-helper')
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

const UserProfile = require('../models/UserProfile')

router.get('/getdetails', (req, res) => {
  const { email } = req.query
  UserProfile.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    return res.status(200).json({ data: user })
  });
})

router.post('/updatedetails', (req, res) => {
  const { email, fullName, phone, city } = req.body;
  console.log(req.body)
  UserProfile.findOneAndUpdate({ email: email }, { $set: { fullName: fullName, phone: phone, city: city } }, { new: true }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    return res.status(200).json({ data: doc })
  })
})

router.post('/upload', multer.single('image'), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
  const { email } = req.body;
  if (req.file && req.file.gcsUrl) {
    UserProfile.findOneAndUpdate({ email: email }, { $set: { profileImage: req.file.gcsUrl } }, { new: true }, (err, doc) => {
      if (err) {
        return res.status(500).send('Unable to upload');
      }
      else
        return res.status(200).json({ data: req.file.gcsUrl })
    })
  }
},
);
module.exports = router;