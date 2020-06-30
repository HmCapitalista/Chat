import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { renderLoadingPage,
    renderErrorPage,
    renderChatPage
} from './renderFunctions';

import './style.css';
import loadImage from '../../assets/load.gif';

import api from '../../services/api';
import auth from '../../services/auth';

export default function UserPage() {
    
    const accountID = String(localStorage.getItem('accountID'));
    const history = useHistory();
    const [userName, setUserName] = useState('');
    let intervalToReload = true;

    const [chats, setChats] = useState([{ id: 1, name: 'AAA'}, { id: 2, name: 'BBB'}, { id: 3, name: 'CCC'}]);
    const [messages, setMessage] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [activeChat, setActiveChat] = useState('');
    const [activeChatName, setActiveChatName] = useState('Search for new people to chat');
    const [menu, setMenu] = useState('');

    const [loading, setLoading] = useState(true);
    const [conectionError, setCE] = useState(false);
    const [pageID, setPageID] = useState('');

    const [secToReload, setSecToReload] = useState(0);

    const intervalToReloadFunc = async () => {
        let lastSec = 5;
        let lastOfLast = lastSec;
        setSecToReload(lastSec);

        setLoading(true);
        intervalToReload = false;
        setPageID('');
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
                        intervalToReload = true;
        
                        setTimeout(() => {
                            setChats(response.data.groups);
                            setLoading(false);
                        }, 300);
                        
                        clearInterval(interval);

                    }catch(err) {
                        if(err.response.data !== undefined) {
                            setPageID('isLoaded');
                            intervalToReload = true;

                            setTimeout(() => {
                                setLoading(false);
                            }, 300);

                            clearInterval(interval);

                        }else {
                            lastSec = lastOfLast*3;
                            lastOfLast = lastSec;
                            continueInterval = true;
                        }
                    }
                }catch(err) {
                    lastSec = lastOfLast*3;
                    lastOfLast = lastSec;
                    continueInterval = true;
                }
            }

        }, 1000);
    }

    const auth2 = async () => {
        try {
            let resp = await auth(accountID, history, 'userPage');
            setUserName(resp[0].name);

            try {
                const response = await api.post('/getConversation', {
                    accountID: accountID,
                });
                
                setPageID('isLoaded');

                setTimeout(() => {
                    setChats(response.data.groups);
                    setLoading(false);
                }, 300);

            }catch(err) {
                if(err.response.data !== undefined) {
                    setPageID('isLoaded');

                    setTimeout(() => {
                        setLoading(false);
                    }, 300);
                }else {
                    intervalToReloadFunc();
                }
            }
        }catch(err) {
            intervalToReloadFunc();
        }   
    }

    useEffect(() => {
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
        });
        document.title = "ChatList";
        auth2();
        setInterval(() => {if(intervalToReload) {auth2();} else return;}, 100000);

        //eslint-disable-next-line
    }, [accountID, history]);

    return (
        <div className="UserPage" onClick={() => {if(menu) {setMenu('');}}}>
            { !loading ?
                renderChatPage(chats, activeChat, setActiveChat, activeChatName, setActiveChatName, messages, userName, history, menu, setMenu, inputValue, setInputValue)
            :
                conectionError ?
                    renderErrorPage(pageID, loadImage, secToReload)
                :
                    renderLoadingPage(pageID, loadImage)
            }
        </div>
    );
}