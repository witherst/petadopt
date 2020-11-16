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
            <div className="authContainer">
                <label htmlFor="email">email</label>
                <input
                    type="email"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMessage">{emailError}</p>
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMessage">{passwordError}</p>
                <br />
                
                <div className="buttonContainer">
                    <button onClick={handleSignIn}>Sign In</button>
                    <p>
                        New to PetLinked?
                        <Link to="/signup">Join now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignIn);
