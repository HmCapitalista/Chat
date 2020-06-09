import api from './api';

const auth = async (accountID, history, local = null) => {
    try {
        const response = await api.post('/enterByID', {
            accountID: accountID,
        });

        if (local === null) {
            if(response.data.auth) {
                history.push('/user');
            }else {
                history.push('/login');
            }
        } else {
            switch(local) {
                case 'login': 
                    if(response.data.auth) {
                        history.push('/user');
                    }else {
                        return '';
                    }
                    break;
                    
                case 'userPage': 
                    if(!response.data.auth) {
                        history.push('/login')
                    }else {
                        return '';
                    }
                    break;
                
                default:
                    history.push('/');
            }
        }

    }catch(err) {
        history.push('/login');

    }

};

export default auth;