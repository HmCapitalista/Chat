const express = require('express');
const path = require('path');

const routes = express.Router();

const ConversationController = require('./controllers/ConversationController');

routes.post('/createConversation', ConversationController.createConversation);

routes.post('/getConversation', ConversationController.getAllConversations);

module.exports = routes;