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
import Settings from "./components/settings/Settings";
import SearchHome from "./components/search/SearchHome";
import Browse from "./components/search/Browse";
import Profile from "./components/profile/Profile";
import Manage from "./components/manage/Manage";
import CreateNewProfile from "./components/profile_edit/CreateNewProfile";
import { DropdownMenu, Navbar, NavItem } from "./components/navbar/Navbar";

// Icons
import { ReactComponent as HomeIcon } from "./components/navbar/icons/home.svg";
import { ReactComponent as SearchIcon } from "./components/navbar/icons/search.svg";
import { ReactComponent as MessageIcon } from "./components/navbar/icons/messages.svg";
import { ReactComponent as NotificationIcon } from "./components/navbar/icons/notification.svg";
import { ReactComponent as SettingsIcon } from "./components/navbar/icons/settings.svg";

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
    authListener();
    if (user.email) {
      getUserId();
    }
  }, [user, dbUser, isSignedIn]);

  return (
    <Router>
      <div className="App">
        {user && (
          <Navbar>
            <NavItem icon={<HomeIcon />} route="/" name="home" />
            <NavItem icon={<SearchIcon />} route="/browse" name="search" />
            <NavItem icon={<MessageIcon />} route="/messages" name="messages" />
            <NavItem
              icon={<NotificationIcon />}
              route="/notifications"
              name="notifications"
            />
            <NavItem icon={<SettingsIcon />} route="#" name="settings">
              <DropdownMenu handleLogout={handleLogout} />
            </NavItem>
          </Navbar>
        )}
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
          <Route
            exact
            path="/pet/:petId"
            render={(props) => <Profile {...props} user={dbUser} />}
          />
        </Switch>

        {!user && (
          <ul>
            <Link to="/">
              <li>home</li>
            </Link>
            <Link to="/signup">
              <li>signup</li>
            </Link>
            <Link to="/signin">
              <li>signin</li>
            </Link>
          </ul>
        )}
      </div>
    </Router>
  );
};

export default App;
