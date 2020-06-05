import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import auth from '../../services/auth';

export default function Init() {

    const accountID = String(localStorage.getItem('accountID'));
    const history = useHistory();

    useEffect(() => {
        auth(accountID, history);
    })

    return (
        <div></div>
    );
}