import React from 'react';
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
    
    return (
        <div className="login-container">
            <input
                className="email-input"
                type="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            {/* <p className="errorMessage">{emailError}</p> */}
            <input
                className="password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            {/* <div style={{margin: "0"}}> {passwordError} JKFLds</div> */}
            {/* <p className="errorMessage">{passwordError}</p> */}
            {/* <br /> */}
            
            <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
            {/* <p>
                New to PetLinked?
                <Link to="/signup">Join now</Link>
            </p> */}
        </div>
    );
};

export default withRouter(SignIn);
