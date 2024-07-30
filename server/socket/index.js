const express = require("express")
const { Server } = require("socket.io");
const http = require("http");
const getDetailsFromToken = require("../helpers/getDetailsFromToken");
const User = require("../models/User");
const { Conversation, Message } = require("../models/Conversation");
const getConversation = require("../helpers/getConversation");

const app = express()

//scoket connections
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

//online user
const onlineUser = new Set()

io.on('connection', async (socket) => {
  console.log('connected user:', socket.id)

  const token = socket?.handshake?.auth?.token;

  //Cuurent User details
  const user = await getDetailsFromToken(token);

  //create a room
  socket.join(user?._id?.toString())
  onlineUser.add(user?._id?.toString());

  io.emit('onlineuser', Array.from(onlineUser));

  socket.on('message-page', async (userId) => {
    const userDetails = await User.findById(userId).select("-password")

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profile_pic,
      online: onlineUser.has(userId),
    }
    socket.emit('message-user', payload)

    //get previous message
    const getConversationMessage = await Conversation.findOne({
      "$or": [
        { sender: user?._id, receiver: userId },
        { sender: userId, receiver: user?._id }
      ]
    }).populate('message').sort({ updatedAt: -1 })

    socket.emit('message', getConversationMessage?.message || [])
  })

  // new message
  socket.on('new-message', async (data) => {
    //check onversation between these 2 users is available

    let conversation = await Conversation.findOne({
      "$or": [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender }
      ]
    })

    //conversation is not available
    if (!conversation) {
      const createConversation = await Conversation({
        sender: data?.sender,
        receiver: data?.receiver
      })
      conversation = await createConversation.save();
    }

    const message = await Message({
      text: data?.text,
      imgUrl: data?.imgUrl,
      videoUrl: data?.videoUrl,
      msgByUserId: data?.msgByUserId
    })

    const saveMessage = await message.save();
    const updateConversation = await Conversation.updateOne({ _id: conversation?._id }, {
      "$push": { message: saveMessage?._id }
    })


    const getConversationMessage = await Conversation.findOne({
      "$or": [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender }
      ]
    }).populate('message').sort({ updatedAt: -1 })


    io.to(data?.sender).emit('message', getConversationMessage.message || [])
    io.to(data?.receiver).emit('message', getConversationMessage.message || [])

    //send conversation
    const conversationSender = await getConversation(data?.sender);
    const conversationReceiver = await getConversation(data?.receiver);

    io.to(data?.sender).emit('conversation', conversationSender)
    io.to(data?.receiver).emit('conversation', conversationReceiver)
  })

  //sidebar 
  socket.on('sidebar', async (currentUser) => {

    //Current User Conversations
    const conversationSidebar = await getConversation(currentUser);
    socket.emit('conversation', conversationSidebar);
  })

  socket.on('seen', async (msgByUserId) => {
    let conversation = await Conversation.findOne({
      "$or": [
        { sender: user?._id }, { receiver: msgByUserId },
        { sender: msgByUserId }, { receiver: user?._id }
      ]
    })

    const conversationMessagesId = conversation?.message || [];
    const updateMesaages = await Message.updateMany(
      { _id: { "$in": conversationMessagesId }, msgByUserId: msgByUserId },
      { $set: { seen: true } }
    )

    const conversationSender = await getConversation(user?._id?.toString());
    const conversationReceiver = await getConversation(msgByUserId);

    io.to(user?._id.toString()).emit('conversation', conversationSender)
    io.to(msgByUserId).emit('conversation', conversationReceiver)
  })

  //disconnect
  socket.on('disconnect', () => {
    onlineUser.delete(user?._id?.toString());
    console.log('disconnected user:', socket.id)
  })
})

module.exports = {
  app, server
}