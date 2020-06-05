import api from './api';

const auth = async (accountID, history) => {
    try {
        const response = await api.post('/enterByID', {
            accountID: accountID,
        });

        if(response.data.auth) {
            history.push('/user');
        }else {
            history.push('/login');
        }

    }catch(err) {
        history.push('/login');

    }

};

export default auth;