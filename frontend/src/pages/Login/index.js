import React from 'react';

import './style.css';

export default function Login() {
    return (
        <div className="LoginPage">
            <label className="AppName">ShockWave</label>
            <div className="LoginHeader">    
                <form className="LoginForm">
                    <div className="LoginColumn">
                        <div className="LoginInputs">
                            <label className="LoginInputPlaceholder">User</label>
                            <input className="LoginInput" id="User" />
                            <label className="LoginInputPlaceholder">Password</label> 
                            <input className="LoginInput" />
                        </div>
                        <button className="LoginButton" type="submit">Enter</button>
                        <label className="FormEnjoy">*enjoy the private chat</label>
                    </div>
                    <label className="LoginTextForm">Now you are in the ShockWave Chat</label>
                </form>
            </div>
            <div className="MemeTags">
                <div className="Deg331" id="JTB">just the basic</div>
                <div className="Deg19" id="TTW">to type without your parents seeing</div>
                <div className="LOL">LOL</div>
                <div className="Deg331" id="TBA">the best private chat, but easily hackable ;-;</div>
                <div className="Deg331" id="SWT">ShockWave terapy</div>
                <div className="Deg19" id="TMA">to memes and shitposts</div>
                <div className="Deg331" id="IHT">is hot there? ( ͡° ͜ʖ ͡°)</div>
                <div className="Deg19" id="GTO">give the others<div>a funny conversation plz</div>
                </div>
                <div className="Deg300" id="IYS">if you seeing this, the dev was here</div>
                <div className="Deg19" id="IWC">it was cool XD</div>
                <div className="GCF">Good chat for everyone!</div>
            </div>
        </div>
    );
}