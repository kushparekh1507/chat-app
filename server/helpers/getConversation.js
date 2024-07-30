const { Conversation } = require("../models/Conversation")

const getConversation = async (currentUser) => {
  if (currentUser) {
    const convo = await Conversation.find({
      "$or": [
        { sender: currentUser },
        { receiver: currentUser }
      ]
    }).sort({ updatedAt: -1 }).populate('message').populate('sender').populate('receiver')

    const conversation = convo.map((c, index) => {
      const countUnseenMsg = c?.message?.reduce((prev, curr) => {
        const msgByUserId = curr?.msgByUserId.toString();
        
        if (msgByUserId !== currentUser) {
          return prev + (curr.seen ? 0 : 1)
        } else {
          return prev
        }
      }, 0)
      return {
        _id: c?._id,
        sender: c?.sender,
        receiver: c?.receiver,
        unseenMsg: countUnseenMsg,
        lastMsg: c?.message[c?.message?.length - 1]
      }
    })

    return conversation
  }
  else {
    return [];
  }
}

module.exports = getConversation