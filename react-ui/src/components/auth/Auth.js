import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import fire from '../../fire';
import '../../App.css';

import SignIn from './SignIn';
import SignUp from './SignUp'; 
import Home from '../home/Home';

const Auth = (props) => {
  const {
    user,
    setUser,
    needsAccount
  } = props;

  let history = useHistory();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isShelter, setIsShelter] = useState("");

  const clearInputs = () => {
    setUsernameError('')
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setUsernameError('')
    setEmailError('');
    setPasswordError('');
  }

  const attemptSignUp = () => {
        if (!username) {
            setUsernameError('invalid username');
            return;
        }
        fetch(`/api/user/verify/?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`)
            .then(res => res.json())
            .then((isExistingUsername) => {
                if (!username || isExistingUsername) {
                    setUsernameError('invalid username/email');
                    return;
                } 
                handleSignUp();
            })
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
      if (user) {
        history.push('/')
      }
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
    createUser();
    if (user) {
        history.push('/')
    }
  };


/** db create/add user */
  const createUser = () => {
    var isAdmin = false;
    var profilePicId = null;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username,
                isAdmin,
                isShelter,
                profilePicId
            }),
        }

        console.log(requestOptions)

        fetch('/api/user/insert', requestOptions)
            .then(res => res.json())
            .then(res => {
              console.log(res[0])
            });
    }

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    })
  };

  useEffect(() => {
    authListener();
  }, []);
  
    return (
      <section className="auth">
        <div className="auth">
        </div>
        {
          user ?
            <Home {...props} user={user} setUser={setUser} handleLogout={handleLogout} /> :
        
          ( needsAccount ? (
            // user has account, show sign in components
            <SignUp
              attemptSignUp={attemptSignUp}
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
              handleSignIn={handleSignIn}
              email={email} 
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              emailError={emailError}
              passwordError={passwordError}
              needsAccount={false}
            />
          ))
        }
      </section>
    );
};

export default Auth;