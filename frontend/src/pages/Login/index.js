import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { conectErrorAnimation,
    userDontSpecified, 
    passwordDontSpecified, 
    userIsWrong, 
    passwordIsWrong } from './animations';

import './style.css';
import loadImage from '../../assets/load.gif';

import api from '../../services/api';
import auth from '../../services/auth';

export default function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [nameState, setNS] = useState('');
    const [passwordState, setPS] = useState('');

    const enterButton = useRef(null);
    const userLabel = useRef(null);
    const passwordLabel = useRef(null);

    const history = useHistory();
    const accountID = String(localStorage.getItem('accountID'));

    const [loading, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState('Error')

    const enter = async (e) => {
        e.preventDefault();
        if(name && password) {
            enterButton.current.id = 'Error';
            setTimeout(() => {
                setLoad(true);
                setTimeout(() => {
                    setIsLoading('Active');
                }, 200);
            }, 100);
            try{
                const response = await api.post('/enterAccount', {
                    name,
                    password
                });
                
                if(response.data.error === "doesn't exist any user with this name") {
                    userIsWrong(setNS, userLabel);
                    setIsLoading('Error');
                    setTimeout(() => {
                        setLoad(false);
                    }, 100);
                } else if(response.data.error === "Password is wrong") {
                    passwordIsWrong(setPS, passwordLabel);
                    setIsLoading('Error');
                    setTimeout(() => {
                        setLoad(false);
                    }, 100);
                }else {
                    localStorage.setItem('accountID', response.data.accountID.id);
                    history.push('/user');
                }

            }catch(err) {
                setIsLoading('Error');
                setTimeout(() => {
                    setLoad(false);
                    enterButton.current.textContent = "Verify your connection";
                    setTimeout(() => {
                        conectErrorAnimation(enterButton);
                    }, 200);
                }, 100);
                console.log(err.request.data);
            }

        } else if(!name && !password) {
            userDontSpecified(setNS, userLabel);
            passwordDontSpecified(setPS, passwordLabel);

        } else if(!name) {
            userDontSpecified(setNS, userLabel);

        } else if(!password) {
            passwordDontSpecified(setPS, passwordLabel);

        }

    }

    useEffect(() => {
        auth(accountID, history, 'login');
    }, [accountID, history]);

    return (
        <div className="LoginPage">
            <label className="AppName">ShockWave</label>
            <div className="LoginHeader">    
                <form className="LoginForm" onSubmit={enter}>
                    <div className="LoginColumn">
                        <div className="LoginInputs">
                            <label className="LoginInputPlaceholder" id={nameState}>Username<i ref={userLabel} className="LoginInputPS" id="Desactive"></i></label>
                            <input className="LoginInput" id={nameState} value={name} onChange={(e) => {setName(e.target.value)}} />
                            <label className="LoginInputPlaceholder" id={passwordState}>Password<i ref={passwordLabel} className="LoginInputPS" id="Desactive"></i></label> 
                            <input type="password" className="LoginInput" id={passwordState} value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        </div>
                        <button className="LoginButton" type="submit">
                            {loading ?
                                <img className="LoadingImage" src={loadImage} id={isLoading} alt="loading..." />
                                :
                                <label onClick={enter} className="LoginButtonLabel" id="Active" ref={enterButton}>Enter</label>    
                            }
                            
                        </button>
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
                <div className="Deg19" id="IWC">this will be cool XD</div>
                <div className="GCF">Good chat for everyone!</div>
            </div>
        </div>
    );
}