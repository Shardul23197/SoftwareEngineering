const express = require('express');
const router = express.Router();
const Chat = require("../models/chatModel");
//const {chats}=require("../models/data");
const User = require("../models/User");

// router.get('/', (req, res)=>{
//     console.log("Hello",req.params);
//     res.send(chats);
// })

router.post('/', async(req, res)=>{
    //console.log("Hello",req.params);
    // res.send(chats);
    const { userId,userId1 } = req.body;

    console.log("Here user ID is",userId);
    //console.log("req._id",req);

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    //isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId1 } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      //isGroupChat: false,
      users: [userId1, userId],
    };
    console.log("Chat data here is ",chatData);
    try {
      const createdChat = await Chat.create(chatData);
      console.log("createdChat data here is ",createdChat);
    
      res.status(200).json(createdChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

router.get('/', async(req, res)=>{
  try{
    // results=Chat.find();
    // res.status(200).send(results);

    Chat.find({})
    .populate("latestMessage")
    .then((ans) => {
      //console.log(ans);
      res.status(200).send(ans);
  });

    // Chat.find()
    //   .populate("users", "-password")
    //   .populate("latestMessage")
    //   .sort({ updatedAt: -1 })
    //   .then(async (results) => {
    //     results = await User.populate(results, {
    //       path: "latestMessage.sender",
    //       select: "name pic email",
    //     });
    //     res.status(200).send(results);
    //   });

  }catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


// router.get('/', (req, res) => {
//     //const { query } = req.query;
//     const userProfiles = []
//     User.find({ role: "trainer" }).populate("profile").then(user => {
//         if (!user) {
//             res.status(404).json({ data: 'No videos found for your search query' })
//         }
//         else {
//             user.forEach(profile => {
//                 userProfiles.push(profile.profile)
//             })
//             return res.status(200).json({ data: userProfiles })
//         }
//     })
// });


// router.get('/:id', (req, res)=>{
//     const singleChat=chats.find((c)=>c._id===req.params._id);
//     console.log("Hello",req.params);
//     console.log("Hello",req.params);
//     res.send(singleChat);
// })


module.exports = router;
