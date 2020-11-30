import React, { useEffect, useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import fire from "./fire";
import Home from "./components/home/Home";
import Landing from "./components/home/Landing";
import Auth from "./components/auth/Auth";
import Messages from "./components/messages/Messages";
import Notifications from "./components/notifications/Notification"
import Settings from "./components/settings/Settings";
import SearchHome from "./components/search/SearchHome";
import Browse from "./components/search/Browse";
import Profile from "./components/profile/Profile";
import Manage from "./components/manage/Manage";
import CreateNewProfile from "./components/profile_edit/CreateNewProfile";
import { Navbar } from "./components/navbar/Navbar";

const App = () => {
  const [user, setUser] = useState(false);
  const [dbUser, setDbUser] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);

  const handleLogout = () => {
    fire.auth().signOut();
    setDbUser(false);
    setIsSignedIn(false);
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setUser(false);
        setIsSignedIn(false);
      }
    });
  };

  const getUserId = () => {
    if (!user) {
      return;
    }
    fetch("/api/user/in/" + user.email)
      .then((res) => res.json())
      .then((res) => {
        setDbUser(res);
      })
      .catch((err) => {
        console.error(user.email);
        console.error(err);
      });
  };

  useEffect(() => {
    if (isSignedIn && dbUser) return;
    authListener();
    if (user.email) {
      getUserId();
    }
  }, [user, dbUser, isSignedIn]);

  return (
    <Router>
      <div className="App">
        <Navbar handleLogout={handleLogout} isSignedIn={isSignedIn} />
        <Switch>
          <Route exact path="/">
            {isSignedIn ? (
              <Home user={dbUser} handleLogout={handleLogout} />
            ) : (
              <Landing />
            )}
          </Route>
          <Route path="/signup">
            {isSignedIn ? (
              <Redirect to="/" />
            ) : (
              <Auth user={user} authListener={authListener} />
            )}
          </Route>
          <Route path="/signin">
            {isSignedIn ? (
              <Redirect to="/" />
            ) : (
              <Auth user={user} authListener={authListener} />
            )}
          </Route>
          <Route
            path="/messages"
            render={(props) => <Messages {...props} dbuser={dbUser} />}
          />
          <Route path="/settings" render={(props) => <Settings {...props} />} />
          <Route
            path="/Browse"
            render={(props) => <Browse {...props} user={dbUser} />}
          />
          <Route
            path="/search/SearchHome"
            render={(props) => <SearchHome {...props} />}
          />
          <Route
            exact
            path="/profile/create-new"
            render={(props) => <CreateNewProfile {...props} user={dbUser} />}
          />
          <Route path="/manage">
            {isSignedIn ? <Manage user={dbUser} /> : <Redirect to="/" />}
          </Route>
          <Route path="/notifications" render={(props) => <Notifications {...props} />} />
          <Route
            exact
            path="/pet/:petId"
            render={(props) => <Profile {...props} user={dbUser} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
