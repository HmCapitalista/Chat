import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function UserPage() {
    
    const accountID = String(localStorage.getItem('AccountID'));
    const history = useHistory();

    const auth = async () => {
        try{
            const response = await api.post('/enterByID', {
                accountID: accountID,
            });

            if(!(response.data.auth)) {
                history.push('/login');
            }
        }catch(err) {
            history.push('/login');
        }

    }

    useEffect(() => {
        auth();
    }, []);

    return (
        <div>
            User
        </div>
    );
}