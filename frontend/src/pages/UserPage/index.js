import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import auth from '../../services/auth';

export default function UserPage() {
    
    const accountID = String(localStorage.getItem('accountID'));
    const history = useHistory();

    useEffect(() => {
        auth(accountID, history, 'userPage');
        localStorage.setItem('accountID', '');
        history.push('/login');
    }, [accountID, history]);

    return (
        <div>
            User
        </div>
    );
}