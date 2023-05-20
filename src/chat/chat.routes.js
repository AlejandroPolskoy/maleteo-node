const express = require('express');
const { getAllConversations, getConversation } = require('./chat.controller');
const router = express.Router(); 

router.get('/getAllConversations/:id', getAllConversations);
router.get('/getConversation/:id', getConversation);

module.exports = router;