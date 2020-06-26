import React from 'react';

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

}

export default renderFunctions;