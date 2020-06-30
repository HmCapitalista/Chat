import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

import auth from '../../services/auth';

export default function Init() {

    const accountID = String(localStorage.getItem('accountID'));
    const history = useHistory();

    useEffect(() => {
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
        });
        auth(accountID, history);
    })

    return (
        <div></div>
    );
}