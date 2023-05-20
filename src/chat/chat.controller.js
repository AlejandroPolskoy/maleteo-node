const { Suitcase } = require("../anuncios/models");
const User = require("../users/users.model");
const { Chat } = require("./chat.model");

async function getConversation(req, res) {
    let {id} = req.params;
    
    try {
        const chat = await Chat.find( { roomID: id } );
        return res.status(200).json(chat);
    } catch(e) {
        return res.status(500).json(e);
    }
}

async function getAllConversations(req, res) {
    let {id} = req.params;
    
    try {
        const conversations = await Suitcase.find( { user: id } ).populate("location");
        for (const conversation of conversations) {
            conversation.location.owner = await User.findOne( conversation.location.owner );
        }
        return res.status(200).json(conversations);
    } catch(e) {
        return res.status(500).json(e);
    }
}

async function newMessage(req, res) {
    let {roomID} = req.params;
    let body = req.body; // should be chat

    try {
        const conversations = await Chat.find( { _id: roomID } );

        if(conversations.length == 0) {
            return res.status(204).json({message: "chat room not found"});
        } else {
            conversations.chat.push(body);
            conversations.save();
            return res.status(200).json(conversations);
        }
    } catch(e) {
        return res.status(500).json(e);
    }
}

async function storeConversation(data) {
    await new Chat(data).save();
}

module.exports = { 
    getAllConversations,
    getConversation,
    newMessage,
    storeConversation
};