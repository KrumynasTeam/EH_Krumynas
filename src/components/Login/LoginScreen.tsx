import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import './Login.scss';

export const FormLine = ({ type, setInputValue, inputValue, placeholder, isRequired }) => (
    <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('') }
        onChange={e => setInputValue(e.target.value)}
        required={isRequired}
    />
);

export const LoginScreen = () => {
    const {Login, token, error, isLoading} = useContext(UserContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (token != null)
            window.location.href = '/';
    }, [token])

    const sendRequest = (e) => {
        e.preventDefault();
        Login(username, password)
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );
    
    const OtherMethods = () => (
      <div id="alternativeLogin">
        <hr style={{ backgroundColor: "orange", height: 2}}/>
        <label>Or login in with:</label>
        <div id="iconGroup">
            <a href="login"><img className="otherLoginIcon" alt='Register with facebook' src="https://cdn-icons-png.flaticon.com/512/174/174848.png" /></a>
            <a href="login"><img className="otherLoginIcon" alt='Register with twitter' src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" /></a>
            <a href="login"><img className="otherLoginIcon" alt='Register with google' src="https://icon-library.com/images/google-g-icon/google-g-icon-12.jpg" /></a>
        </div>
      </div>
    );

    return (
        <div className="center-text">
            <div id="loginform">
                <FormHeader title="Login" />
                <form onSubmit={sendRequest}>
                    <div className="row">
                        <label>Username</label>
                        <FormLine type="text" inputValue={username} setInputValue={setUsername} placeholder='Enter your username' isRequired={true} />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <FormLine type="password" inputValue={password} setInputValue={setPassword} placeholder='Enter your password' isRequired={true} />
                    </div>
                    <div id="button" className="row">
                        <button type="submit" name="submit" disabled={isLoading}>Log in</button>
                    </div>
                </form>
                {
                    error ? (
                        <div style={{height: '57px', textDecoration: 'underline', color: 'darkred'}}>{error}</div>
                    ) : (
                        isLoading ? (
                            <div className='lds-default'>
                            {[...Array(12)].map((_, index) => (
                                <div key={index} style={{ background: `#fdbb2d`, width: '6', height: '6' }} />
                            ))}
                            </div>
                        ) : (
                            <div className='lds-default'></div>
                        )
                    )
                }
                <div id="notRegistered">
                    <label>Not registered? Sign up <a href="/signup">here</a>!</label>
                </div>
                <OtherMethods />
            </div>
        </div>
    );
}