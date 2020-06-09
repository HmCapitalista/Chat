const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async enter(request, response) {
        const { name, password } = request.body;

        let accountPassword;

        try {
            accountPassword = (await connection('accounts').where('name', name).select('password'))[0].password;

        }catch(err) {
            return response.status(200).json({error: "doesn't exist any user with this name"});

        }

        const accountID = await connection('accounts').where('name', name).first().select('id');

        if(accountPassword !== password) {
            return response.status(200).json({ error: "Password is wrong" });
        }

        return response.json({ accountID });

    },

    async enterByID(request, response) {
        const { accountID } = request.body;

        const resp = await connection('accounts').where('id', accountID).select('id');

        try {
            if(resp[0].id === String(accountID)) {
                return response.json({ auth: true, resp });

            }else {
                return response.json({ auth: false });

            }
        }catch(err) {
            return response.json({ auth: false });
        }

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

        try {
            await connection('registredUsers').where('userID', userID);

            return response.status(400).json({ error: "user is alredy in conversation" });

        }catch(err){
            await connection('registredUsers').insert({
                userID,
                conversationID,
            });
            return response.json({ added: true });
        }

        

    }

};