import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles/signup-style.css'


const SignUp = (props) => {
    const {
        handleSignUp,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usernameError,
        emailError,
        passwordError,
        isShelter,
        setIsShelter
    } = props;
    
    return (
        <div className="login-container">
            <h1>Join our furry community!</h1>
            <input
                className="username-input"
                type="text"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
            />
            <input
                className="email-input"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                className="password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <div className="error-message-div">{passwordError} {usernameError} {emailError}</div>
            <div className="checkbox-div">
                <input
                    type="checkbox"
                    required
                    value={isShelter}
                    onChange={(e) => { setIsShelter(!isShelter) }}
                />
                <h2>I have furiends who need furever homes</h2>
            </div>
            <button className="sign-up-button" onClick={handleSignUp}>Join</button>
        </div>
    )
}

export default withRouter(SignUp);