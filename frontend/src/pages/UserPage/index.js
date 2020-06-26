import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';
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

    const { renderChats,
        renderNoChats,
        renderNoActiveChat,
        renderActiveChat
    } = renderFunctions;

    const auth2 = async () => {
        let resp = await auth(accountID, history, 'userPage');

        try {
            const response = await api.post('/getConversation', {
                accountID: accountID,
            });
            
            setPageID('isLoaded');
            console.log(loading);

            setTimeout(() => {
                setUserName(resp[0].name);
                setChats(response.data.groups);
            }, 2000);

        }catch(err) {
            if(err.response.data !== undefined) {
                setLoading(false);
            }else {
                setCE(true);
            }
        }
    }

    useEffect(() => {
        auth2();
        document.title = "ChatList";
    }, [accountID, history]);

    return (
        <div className="UserPage">
            { loading === false ?
            <div className="LoadedChats">
                <div className="Chats">
                    <div className="ChatList">
                        <div className="TextBox">
                            <div className="ChatsTitle">Chats</div>
                        </div>
                        { chats.length === 0 ? renderNoChats() : chats.map(item => renderChats(item)) }
                    </div>
                    <div className="UserData">
                        <label className="UserName">{userName}</label>
                        <button className="UserSettings"><MdSettings size="25" color="rgba(163,230,251,1)" /></button>
                    </div>
                </div>
                <div className="UserHeader">
                    <div className="Header">
                        <p className="ActiveChatTitle" onClick={() => {localStorage.setItem('accountID', ''); history.push('/')}}>{activeChat}</p>
                        <div className="SearchForm" id="second">
                            <input className="SearchPeopleInput" placeholder="Search people" />
                            <button className="StartConversationButton">Start conversation</button>
                        </div>
                    </div>
                    <div className="ChatDisplay">
                        { activeChat === 'Search for new people to chat' ? renderNoActiveChat() : renderActiveChat(chats, activeChat, messages) }
                    </div>
                </div>
            </div>
            :
            <div id={pageID} className="LoadingPage">
                <img src={loadImage} alt="loading..." />
            </div>
            }
        </div>
    );
}