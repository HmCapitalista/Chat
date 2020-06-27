import React from 'react';
import { MdSettings } from 'react-icons/md';

import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
    paper: {
        background: 'rgba(2, 31, 41, 40)',
        width: '100px',
        paddingTop: '-5px',
        paddingBottom: '-5px',
        borderRadius: '2px',
        borderColor: 'rgba(255, 255, 255, 0.082)',
        borderWidth: '1px',
        borderStyle: 'solid',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

function settingsMenu(anchorEl, setAnchorEl, history) {
    return (
        <StyledMenu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {setAnchorEl(null)}}
        >
            <button className="ExitToLogin" onClick={() => {setAnchorEl(null); localStorage.setItem('accountID', ''); history.push('/')}}>Exit</button>
        </StyledMenu>
    )

}

const renderFunctions = {

    renderChats(item) {
        return (<div></div>);
    },

    renderNoChats() { 
        return (
            <div className="ErrorBox">
                <div className="NoConversations">no open conversation</div>
                <div className="SearchForm">
                    <input className="SearchPeopleInput" placeholder="Search people" />
                    <button className="StartConversationButton">Start conversation</button>
                </div>
            </div>
        );
    },

    renderNoActiveChat() {
        return (
            <div className="NoActiveChatDisplay">
                <div className="TextDivNACD">No active chat, open one or search for people</div>
            </div>
        );
    },

    renderActiveChat(chats, activeChat, messages) {
        return (
            <div></div>
        );
    },

    renderChatPage(chats, activeChat, messages, renderActiveChat, renderNoActiveChat, renderChats, renderNoChats, userName, history, anchorEl, setAnchorEl) {
        return (
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
                        <button className="UserSettings" onClick={e => {setAnchorEl(e.currentTarget)}}><MdSettings size="25" color="rgba(163,230,251,1)" /></button>
                        {settingsMenu(anchorEl, setAnchorEl, history)}
                    </div>
                </div>
                <div className="UserHeader">
                    <div className="Header">
                        <p className="ActiveChatTitle">{activeChat}</p>
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
        );
    },

    renderLoadingPage(pageID, loadImage) {
        return (
            <div id={pageID} className="LoadingPage">
                <img src={loadImage} alt="loading..." />
            </div>
        );
    }, 

    renderErrorPage(pageID, loadImage, secToReload) {
        return (
            <div id={pageID} className="LoadingPage">
                <img src={loadImage} alt="loading..." />
                <div className="ConectionErrorInLoading">Erro de conexão! tentando novamente em: {secToReload} segundos</div>
            </div>
        );
    }

}

export default renderFunctions;