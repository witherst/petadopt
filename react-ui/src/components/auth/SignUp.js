import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const SignUp = (props) => {
    const {
        handleSignUp,
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
                <h3>Make the most of your life with a furiend</h3>
            </div>
            <div className="authContainer">
                
                <label>email</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMessage">{emailError}</p>
                <label>password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMessage">{passwordError}</p>

                <div className="buttonContainer">
                    <button onClick={handleSignUp}>Join</button>
                    <p>
                        Already on PetLinked?
                        <Link to="/signin">Sign in</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default withRouter(SignUp);