import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./styles/signin-style.css";

import '../../App.css';

const SignIn = (props) => {
    const {
        handleSignIn,
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError
    } = props;

    const [error, setError] = useState("");

    const handleForgotPassword = () => {
        setError("Maybe you should write it down next time.");
    }
    
    return (
        <div className="login-container">
            <h1>Welcome back!</h1>
            <input
                className="email-input"
                type="email"
                autoFocus
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
            <div className="error-message-div">{emailError} {passwordError} {error}</div>
            <div className="forgot-password-div" onClick={() => handleForgotPassword()}>Forgot your password?</div>
            <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default withRouter(SignIn);
