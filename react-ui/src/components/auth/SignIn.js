import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
        <section className="authBody">
            <div className="authHeader">
                <h3>Welcome back!</h3>
                <h4>Don't miss your opportunity to connect with your future furry friends. Sign in to stay updated on the latest adoptable pets.</h4>
            </div>
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
        </section>
    );
};

export default withRouter(SignIn);
