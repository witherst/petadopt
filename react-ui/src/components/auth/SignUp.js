import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const SignUp = (props) => {
    const {
        attemptSignUp,
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
        <section className="authBody">
            <div className="authHeader">
                <h3>Make the most of your life with a furiend</h3>
            </div>
            <div className="authContainer">
                <label>username</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className="errorMessage">{usernameError}</p>
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
                <input
                    type="checkbox"
                    required
                    value={isShelter}
                    onChange={(e) => { setIsShelter(!isShelter) }}
                />
                <label>i have furiends who need furever homes</label><br />
                <div className="buttonContainer">
                    <button onClick={attemptSignUp}>Join</button>
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