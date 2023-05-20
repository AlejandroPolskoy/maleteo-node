const { Chat } = require("../chat/chat.model");

const storeMessages = async (req, res, next) => {
    const chat = new Chat(req);
    chat.save();
    next();
}

module.exports = {storeMessages}