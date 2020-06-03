const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async enter(request, response) {
        const { name, password } = request.body;

        let accountPassword;

        try {
            accountPassword = await connection('accounts').where('name', name).first().select('password');

        }catch(err) {
            return response.status(400).json({error: "doesn't exist any user with this name"});

        }

        const accountID = await connection('accounts').where('name', name).first().select('id');

        if(accountPassword !== password) {
            return response.status(400).json({ error: "Password is wrong" });
        }

        return response.json({ accountID });

    },

    async create(request, response) {
        const { name, password } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        const online = false;

        await connection('accounts').insert({
            id,
            name,
            password,
            online,
            
        });

        return response.json({ created: true });

    },

    async search(request, response) {
        const accounts = await connection('accounts');

        response.json({ accounts: accounts });

    },

    async registerOAC(request, response) {
        const { userID, conversationID } = request.body;

        await connection('registredUsers').insert({
            userID,
            conversationID,
        });

        return response.json({ added: true });

    }

};