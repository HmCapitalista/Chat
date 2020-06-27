import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import renderFunctions from './renderFunctions';

import './style.css';
import loadImage from '../../assets/load.gif';

import api from '../../services/api';
import auth from '../../services/auth';

export default function UserPage() {
    
    const accountID = String(localStorage.getItem('accountID'));
    const history = useHistory();
    const [userName, setUserName] = useState('');

    const [chats, setChats] = useState([]);
    const [messages, setMessage] = useState([]);
    const [activeChat, setActiveChat] = useState('Search for new people to chat');

    const [loading, setLoading] = useState(true);
    const [conectionError, setCE] = useState(false);
    const [pageID, setPageID] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);

    const [secToReload, setSecToReload] = useState(0);

    const { renderChats,
        renderNoChats,
        renderNoActiveChat,
        renderActiveChat,
        renderLoadingPage,
        renderErrorPage,
        renderChatPage
    } = renderFunctions;

    const auth2 = async () => {
        let lastSec = 10;
        let lastOfLast = lastSec;
        setSecToReload(lastSec);

        try{
            let resp = await auth(accountID, history, 'userPage');
            setUserName(resp[0].name);

            try {
                const response = await api.post('/getConversation', {
                    accountID: accountID,
                });
                
                setPageID('isLoaded');

                setTimeout(() => {
                    setChats(response.data.groups);
                }, 300);

            }catch(err) {
                if(err.response.data !== undefined) {
                    setPageID('isLoaded');

                    setTimeout(() => {
                        setLoading(false);
                    }, 300);
                }else {
                    setCE(true);
                    let continueInterval = true;

                    const interval = setInterval(async () => { 
                        if(continueInterval) {
                            lastSec -= 1; 
                            setSecToReload(lastSec);
                        }
                        
                        if(lastSec === 0 && continueInterval) {
                            continueInterval = false;
                            try{
                                let resp = await auth(accountID, history, 'userPage');
                                setUserName(resp[0].name);
                    
                                try {
                                    const response = await api.post('/getConversation', {
                                        accountID: accountID,
                                    });
                                    
                                    setPageID('isLoaded');
                    
                                    setTimeout(() => {
                                        setChats(response.data.groups);
                                    }, 300);
                                    
                                    clearInterval(interval);
        
                                }catch(err) {
                                    if(err.response.data !== undefined) {
                                        setPageID('isLoaded');
        
                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 300);

                                        clearInterval(interval);

                                    }else {
                                        lastSec = lastOfLast+10;
                                        lastOfLast += 10;
                                        continueInterval = true;
                                    }
                                }
                            }catch(err) {
                                lastSec = lastOfLast+10;
                                lastOfLast += 10;
                                continueInterval = true;
                            }
                        }
        
                    }, 1000);
                }
            }
        }catch(err) {
            setCE(true);
            let continueInterval = true;

            const interval = setInterval(async () => { 
                if(continueInterval) {
                    lastSec -= 1; 
                    setSecToReload(lastSec);
                }
                
                if(lastSec === 0 && continueInterval) {
                    continueInterval = false;
                    try{
                        let resp = await auth(accountID, history, 'userPage');
                        setUserName(resp[0].name);
            
                        try {
                            const response = await api.post('/getConversation', {
                                accountID: accountID,
                            });
                            
                            setPageID('isLoaded');
            
                            setTimeout(() => {
                                setChats(response.data.groups);
                            }, 300);
                            
                            clearInterval(interval);

                        }catch(err) {
                            if(err.response.data !== undefined) {
                                setPageID('isLoaded');

                                setTimeout(() => {
                                    setLoading(false);
                                }, 300);

                                clearInterval(interval);

                            }else {
                                lastSec = lastOfLast+10;
                                lastOfLast += 10;
                                continueInterval = true;
                            }
                        }
                    }catch(err) {
                        lastSec = lastOfLast+10;
                        lastOfLast += 10;
                        continueInterval = true;
                    }
                }

            }, 1000);
        }   
    }

    useEffect(() => {
        auth2();
        document.title = "ChatList";
    }, [accountID, history]);

    return (
        <div className="UserPage">
            { loading === false ?
                renderChatPage(chats, activeChat, messages, renderActiveChat, renderNoActiveChat, renderChats, renderNoChats, userName, history, anchorEl, setAnchorEl)
            :
                conectionError ?
                    renderErrorPage(pageID, loadImage, secToReload)
                :
                    renderLoadingPage(pageID, loadImage)
            }
        </div>
    );
}