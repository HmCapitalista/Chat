const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async getAllConversations(request, response) {
        const { accountID } = request.body;

        let conversations = [];

        try{
            conversations = await connection('registredUsers').where('userID', accountID).select('conversationID');

        }catch(err) {
            return response.status(400).json({ error: "You aren't in any conversation" });

        }

        let groups = [];

        conversations.forEach(async (i, idx) => {
            const res = await connection('conversation').where('id', i.conversationID).first();

            groups = [...groups, res];

            if(idx+1 === conversations.length) {
                return response.json({ groups });
            }
        });

    },

    async createConversation(request, response) {
        const { firstUser, secondUser, name } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        const conversationID = id;

        await connection('conversation').insert({
            id,
            name
        });

        let userID = firstUser;

        await connection('registredUsers').insert({
            userID,
            conversationID,
        });

        userID = secondUser;

        await connection('registredUsers').insert({
            userID,
            conversationID,
        });

        const conversation = await connection('conversation').where('id', id).select('*');

        return response.json({ conversation: conversation });

    }

}