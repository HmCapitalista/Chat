const express = require('express');
const path = require('path');

const routes = express.Router();

const ConversationController = require('./controllers/ConversationController');
const AccountControllers = require('./controllers/AccountController.js');
const MessagesController = require('./controllers/MessagesController');

routes.post('/createConversation', ConversationController.createConversation);

routes.post('/getConversation', ConversationController.getAllConversations);

routes.get('/searchAccounts', AccountControllers.search);

routes.post('/createAccounts', AccountControllers.create);

routes.post('/enterAccount', AccountControllers.enter);

routes.post('/enterByID', AccountControllers.enterByID);

routes.post('/searchAccounts', AccountControllers.search);

routes.post('/registerOAC', AccountControllers.registerOAC);

routes.post('/createMessage', MessagesController.create);

routes.post('/deleteMessage', MessagesController.delete);

routes.post('/editMessage', MessagesController.edit);

routes.post('/getMessages', MessagesController.getMessages);

module.exports = routes;