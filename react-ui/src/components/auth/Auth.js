import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./styles/auth-style.css";
import {ReactComponent as PawIcon} from '../navbar/icons/paw.svg'

import fire from '../../fire';
import '../../App.css';

import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = (props) => {
  const {
    user,
    setUser,
    needsAccount
  } = props;

  let history = useHistory();

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isShelter, setIsShelter] = useState(false);
  const [joinButtonState, setJoinButtonState] = useState(false);
  const [signinButtonState, setSigninButtonState] = useState(true);

  const clearInputs = () => {
    setUsername('')
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setUsernameError(false)
    setEmailError(false);
    setPasswordError(false);
  }

  const handleSignIn = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-exists":
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
    history.push('/')
  };

  const handleSignUp = async function() {
    clearErrors();

    if (!username) {
      setUsernameError('invalid username');
      return;
    }
    const promise = await fetch(`/api/user/verify/${encodeURIComponent(email)}/${encodeURIComponent(username)}`)
    const isExistingRecord = await promise.json();

    if (!username || isExistingRecord) {
      setUsernameError('invalid username/email');
      return;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        createUser()
        history.push('/')
      },
      (err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(() => err.message);
            break;
          case "auth/weak-password":
            setPasswordError(() => err.message);
            break;
          default:
            break;  
        }
      });
  };

/** db create/add user */
  const createUser = async function() {
    var profilePicId = null;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username,
                isShelter,
                profilePicId
            }),
        }

        await fetch('/api/user/insert', requestOptions)
    }

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // clearInputs();
        setUser(user);
      } else {
        setUser(false);
      }
    })
  };

  useEffect(() => {
    if (user) {
      history.push('/');
    }
    authListener();
    clearErrors();
    clearInputs();
  }, []);
  
    return (
        <div className="auth">
            <div className="auth-header">
              <div className="auth-header-container">
                <div><svg viewBox="0 0 278 278"><PawIcon/></svg></div>
                <div><h1>PetLinked</h1></div>
              </div>
              <h2>Make the most of your life with a furfriend</h2>
            </div>

            <div className="auth-container">
              <div className="auth-container-buttons-container">
                <button className="auth-join-button">
                  Join
                </button>
                <button className="auth-signin-button">
                  Sign In
                </button>
              </div>

              <div className="auth-container-signin">
                {needsAccount ? (
                  // user has account, show sign in components
                  <SignUp
                    handleSignUp={handleSignUp}
                    username={username}
                    setUsername={setUsername}
                    email={email} 
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    usernameError={usernameError}
                    emailError={emailError}
                    passwordError={passwordError}
                    isShelter={isShelter}
                    setIsShelter={setIsShelter}
                    needsAccount={true}
                    />
                  ) : (
                    // otherwise, show sign up components
                    <SignIn
                      user={user}
                      history={history}
                      handleSignIn={handleSignIn}
                      email={email} 
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      emailError={emailError}
                      passwordError={passwordError}
                      needsAccount={false}
                    />
                  )}
              </div>
            </div>
        </div>
    );
};

export default Auth;