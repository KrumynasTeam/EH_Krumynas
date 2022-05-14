import React, { useContext, useState } from 'react';
import './Register.scss';
import { UserContext } from '../contexts/UserContext';

export const FormLine = ({ type, setInputValue, inputValue, placeholder, regex, onInvalidMessage, isRequired, isAutoComplete }) => (
    <input
        pattern={regex}
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(onInvalidMessage)}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('') }
        onChange={e => setInputValue(e.target.value)}
        required={isRequired}
        autoComplete={isAutoComplete}
    />
);

export const RegisterScreen = () => {
    const {Register, error, isLoading} = useContext(UserContext);
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const sendRequest = (e) => {
        e.preventDefault();
        Register(email, username, password)
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );
    
    const OtherMethods = () => (
        <div id="alternativeLogin">
            <hr style={{ backgroundColor: "orange", height: 2}}/>
        <label>Or sign in with:</label>
        <div id="iconGroup">
            <a href="signup"><img className="otherLoginIcon" alt='Register with facebook' src="https://cdn-icons-png.flaticon.com/512/174/174848.png" /></a>
            <a href="signup"><img className="otherLoginIcon" alt='Register with twitter' src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" /></a>
            <a href="signup"><img className="otherLoginIcon" alt='Register with google' src="https://icon-library.com/images/google-g-icon/google-g-icon-12.jpg" /></a>
        </div>
        </div>
    );

    return (
        <div className="center-text">
            <div id="registerform">
                <FormHeader title="Register" />
                <form onSubmit={sendRequest}>
                    <div className="row">
                        <label>Email</label>
                        <FormLine type="text" inputValue={email} setInputValue={setEmail} placeholder='Enter your email' regex="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onInvalidMessage="Invalid email address." isRequired={true} isAutoComplete={"false"} />
                    </div>
                    <div className="row">
                        <label>Username</label>
                        <FormLine type="text" inputValue={username} setInputValue={setUsername} placeholder='Enter your username' regex="^[a-zA-Z0-9]{6,12}$" onInvalidMessage="Must be between 6-12 characters of letter and numbers." isRequired={true} isAutoComplete={"true"} />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <FormLine type="password" inputValue={password} setInputValue={setPassword} placeholder='Enter your password' regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$"
                            onInvalidMessage="Password must be between 8-16 characters long and contain one upper letter, lower letter and number." isRequired={true} isAutoComplete={"false"} />
                    </div>
                    <div id="button" className="row">
                        <button type="submit" name="submit" disabled={isLoading}>Register</button>
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
                <div id="alreadyRegistered">
                    <label>Already registered? Log in <a href="/login">here</a>!</label>
                </div>
                <OtherMethods />
            </div>
        </div>
    );
}