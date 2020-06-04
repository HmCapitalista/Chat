const connection = require('../../database/connection');

const fn = {

    async doOnline(userID, io) {
        await connection('accounts').where('id', userID).update('online', true);
        io.emit('aUserOnline', userID);
    },

    async doOffline(userID, io) {
        await connection('accounts').where('id', userID).update('online', false);
        io.emit('aUserOffline', userID);
    },

    async createConversation(conversationID, io) {
        io.emit('aConversationIsCreated', conversationID);
    },

    async sendMessage(message, io){
        io.emit('sendMessage', message);
    }

};

module.exports = fn;