const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    userId: String,
    chatWith: { 
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'UserProfile'
    },
    conversationId: String 
})

module.exports = Conversation = mongoose.model("conversation", ConversationSchema)