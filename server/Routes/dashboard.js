const express = require("express");
const path = require("path");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require(path.resolve(__dirname, "../config/keys"));
// const passport = require("passport");
// const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Load input validation
// const validateRegisterInput = require("../validation/registerValidation");
// const validateLoginInput = require("../validation/loginValidation");

// Load User model
//import User from "../models/User";
const User = require("../models/User");
//const UserProfile = require("../models/UserProfile")


router.get('/search',async (req, res) =>{
    const { searchQuery, tags } = req.query;
    console.log(req.query);
      try {
          const name = new RegExp(searchQuery, "i");
          //console.log(name);
          //console.log(tags)
          const users = await User.find({name});
          //const users = await User.find({ $or: [ { name }, { tags: { $in: tags.split(',') } } ]});

          //console.log(users);

          res.json({ data: users});
      } catch (error) {    
          res.status(404).json({ message: error.message });
      }
  
  });
  

  router.get('/',async (req, res)=>{
    try {
        const users = await User.find();
        console.log("Users");
        console.log(res);
        console.log(req);
        res.status(200).json(users);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }

  })

  module.exports = router;
