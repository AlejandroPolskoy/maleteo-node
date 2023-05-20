const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema (
    {
        text: {type: String},
        name: {type: String},
        userID: {type: String},
        userImage: {type: String},
        roomID: {type: String}
    }
)
const Chat = mongoose.model("chat", chatSchema);

module.exports = { Chat }