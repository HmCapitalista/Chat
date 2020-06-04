const io = require('../../index');
const { doOnline, doOffline, createConversation, sendMessage } = require('./functions');

io.on('connection', socket => {
    socket.on('connected', userID => {
        doOnline(userID, io);
    });
    socket.on('disconnect', userID => {
        doOffline(userID, io);
    });
    socket.on('createdConvesation', conversationID => {
        createConversation(conversationID, io);
    });
    socket.on('messageIsSend', message => {
        sendMessage(message, io);
    })
});
