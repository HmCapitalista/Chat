const connection = require('../database/connection');

module.exports = {

    async getMessages(request, response) {
        const { conversationID } = request.body;

        const res = await connection('messages').where('where', conversationID).select('*');

        return response.json({ res });

    },

    async edit(request, response) {
        const { messageID, content } = request.body;

        await connection('messages').where('id', messageID).update('content', content);

        const res = await connection('messages').where('id', messageID);

        return response.json({ res });

    },

    async create(request, response) {
        const { content, whoSends, where } = request.body;

        let day, month, time, minutes;
        day = new Date().getDate();
        month = 1+(new Date().getMonth());
        time = new Date().getHours();
        minutes = new Date().getMinutes();

        if(parseInt(day) < 10) {day = '0' + day;}
        if(parseInt(month) < 10) {month = '0' + month;}
        if(parseInt(time) < 10) {time = '0' + time;}
        if(parseInt(minutes) < 10) {minutes = '0' + minutes;}

        const date = day + '/' + month + '/' + (new Date().getFullYear());
        const hour = time + ':' + minutes;

        const res = await connection('messages').insert({
            content,
            whoSends,
            where,
            date,
            hour,
        });

        const resp = await connection('messages').where('id', res);

        return response.json({ resp });

    },

    async delete(request, response) {
        const { id } = request.body;

        const res = await connection('messages').where('id', id).delete();

        return response.json({ res });

    }

};