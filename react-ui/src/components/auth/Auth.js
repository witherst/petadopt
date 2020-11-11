import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
      <section className="auth">
        <div className="auth">
        </div>
        {
           needsAccount ? (
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
          )
        }
      </section>
    );
};

export default Auth;