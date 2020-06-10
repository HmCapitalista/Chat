import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import auth from '../../services/auth';

export default function UserPage() {
    
    const accountID = String(localStorage.getItem('accountID'));
    const history = useHistory();

    useEffect(() => {
        auth(accountID, history, 'userPage');
    }, [accountID, history]);

    return (
        <div onClick={() => {localStorage.setItem('accountID', ''); history.goBack()}}>
            User
        </div>
    );
}