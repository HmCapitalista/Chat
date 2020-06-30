import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { MdSettings } from 'react-icons/md';
import { RiEmotionLine } from 'react-icons/ri'

// TODO: context menu for messages and conversation

function renderChats(item, activeChat, setActiveChat, setActiveChatName) {
    return (
        <div id={item.id === activeChat ? 'Selected' : ''} 
            onClick={() => {
                if(activeChat !== item.id) {
                    setActiveChat(item.id); 
                    setActiveChatName(item.name);
                    document.title = item.name;
                } else {
                    setActiveChat(''); 
                    setActiveChatName('Search for new people to chat');
                    document.title = 'ChatList';
                }
            }} className="TextBox">
            <div className="ChatName">{item.name}</div>
        </div>
    );

};

function renderNoChats() { 
    return (
        <div className="ErrorBox">
            <div className="NoConversations">no open conversation</div>
            <div className="SearchForm">
                <input className="SearchPeopleInput" placeholder="Search people" />
                <button className="StartConversationButton">Start conversation</button>
            </div>
        </div>
    );
}

function renderNoActiveChat() {
    return (
        <div className="NoActiveChatDisplay">
            <div className="TextDivNACD">No active chat, open one or search for people</div>
        </div>
    );
}

function renderActiveChat(chats, activeChat, activeChatName, messages, menu, setMenu, inputValue, setInputValue) {
    return (
        <div className="ActiveChatDisplay">
            <div className="ChatInputText">
                <div className="InputDisplay">
                    <TextareaAutosize minRows="1" maxRows="2" value={inputValue} onChange={(e) => {if(e.target.value.length !== 2000){setInputValue(e.target.value)}}} placeholder={"Send a message to " + activeChatName} className="InputTextComponent" />
                    <button onClick={() => {setMenu('emoji');}} className="EmojiSelectButton"><RiEmotionLine className="EmojiSelect" size="30" /></button>
                    {menu === 'emoji' ?
                        <div className="EmojiMenu">aaaaaa</div>
                    :
                        <div id="emptyDIV"></div>   
                    }
                </div>
            </div>
        </div>
    );
}

export function renderChatPage(chats, activeChat, setActiveChat, activeChatName, setActiveChatName, messages, userName, history, menu, setMenu, inputValue, setInputValue) {
    return (
        <div className="LoadedChats">
            <div className="Chats">
                <div className="ChatList">
                    <div className="TextBoxTitle">
                        <div className="ChatsTitle">Chats</div>
                    </div>
                    { chats.length === 0 ? renderNoChats() : chats.map(item => renderChats(item, activeChat, setActiveChat, setActiveChatName)) }
                </div>
                <div className="UserData">
                    <label className="UserName">{userName}</label>
                    <button 
                    className="UserSettings" 
                    onClick={() => {if(menu === '') {setMenu('settings');} else {setMenu('');}}}>
                        <MdSettings size="25" color="rgba(163,230,251,1)" />
                    </button>
                    { menu === 'settings' ? 
                        <div className="SettingsMenu">
                            <button className="ExitToLogin" onClick={() => {setMenu(''); localStorage.setItem('accountID', ''); history.push('/')}}>
                                Exit
                            </button>
                        </div> 
                    : 
                        <div id="emptyDIV"></div> 
                    }
                </div>
            </div>
            <div className="UserHeader">
                <div className="Header">
                    <p className="ActiveChatTitle">{activeChatName}</p>
                    <div className="SearchForm" id="second">
                        <input className="SearchPeopleInput" placeholder="Search people" />
                        <button className="StartConversationButton">Start conversation</button>
                    </div>
                </div>
                <div className="ChatDisplay">
                    { activeChat === '' ? renderNoActiveChat() : renderActiveChat(chats, activeChat, activeChatName, messages, menu, setMenu, inputValue, setInputValue) }
                </div>
            </div>
        </div>
    );
}

export function renderLoadingPage(pageID, loadImage) {
    return (
        <div id={pageID} className="LoadingPage">
            <img src={loadImage} alt="loading..." />
        </div>
    );
}

export function renderErrorPage(pageID, loadImage, secToReload) {
    return (
        <div id={pageID} className="LoadingPage">
            <img src={loadImage} alt="loading..." />
            <div className="ConectionErrorInLoading">Erro de conexão! tentando novamente em: {secToReload} segundos</div>
        </div>
    );
}