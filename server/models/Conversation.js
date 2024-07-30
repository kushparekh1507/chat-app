const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    default: ""
  },
  imgUrl: {
    type: String,
    default: ""
  },
  videoUrl: {
    type: String,
    default: ""
  },
  seen: {
    type: Boolean,
    default: false
  },
  msgByUserId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'user'
  }
}, {
  timestamps: true
})

const ConversationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'user'
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'user'
  },
  message: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "message"
    }
  ]
}, {
  timestamps: true
})

const Message = mongoose.model('message', MessageSchema);
const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = { Message, Conversation }