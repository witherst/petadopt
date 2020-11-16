import React, { useEffect, useState } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import fire from "./fire";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Messages from "./components/messages/Messages";
import Settings from "./components/settings/Settings";
import SearchHome from "./components/search/SearchHome";
import Browse from "./components/search/Browse";
import Profile from "./components/profile/Profile";
import CreateNewProfile from "./components/profile_edit/CreateNewProfile";
import { DropdownMenu, Navbar, NavItem } from "./components/navbar/Navbar";

// Icons
import { ReactComponent as HomeIcon } from "./components/navbar/icons/home.svg";
import { ReactComponent as SearchIcon } from "./components/navbar/icons/search.svg";
import { ReactComponent as MessageIcon } from "./components/navbar/icons/messages.svg";
import { ReactComponent as NotificationIcon } from "./components/navbar/icons/notification.svg";
import { ReactComponent as SettingsIcon } from "./components/navbar/icons/settings.svg";
import fire from './fire';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';
import Messages from './components/messages/Messages';
import Settings from './components/settings/Settings';
import SearchFriend from './components/search/SearchFriend';
import SearchHome from './components/search/SearchHome';
import Profile from './components/profile/Profile';
import CreateNewProfile from './components/profile_edit/CreateNewProfile';
import {DropdownMenu, Navbar, NavItem} from './components/navbar/Navbar';
import ProfileManage from './components/profile_manage/ProfileManage';

// Icons
import {ReactComponent as HomeIcon} from './components/navbar/icons/home.svg';
import {ReactComponent as SearchIcon} from './components/navbar/icons/search.svg';
import {ReactComponent as MessageIcon} from './components/navbar/icons/messages.svg';
import {ReactComponent as NotificationIcon} from './components/navbar/icons/notification.svg';
import {ReactComponent as SettingsIcon} from './components/navbar/icons/settings.svg';

const App = () => {
  const [user, setUser] = useState(false);
  const [dbUser, setDbUser] = useState(false);

  const handleLogout = () => {
    fire.auth().signOut();
    setDbUser(false);
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
  };

  useEffect(() => {
    authListener();
    if (user.email) {
      getUserId();
    }
  }, [user]);

  const getUserId = () => {
    if (!user) {
      return;
    }
    fetch("/api/user/in/" + user.email)
      .then((res) => res.json())
      .then((res) => {
        setDbUser(res);
      });
  };

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
              <DropdownMenu />
            </NavItem>
          </Navbar>
        )}

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

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home {...props} user={dbUser} handleLogout={handleLogout} />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <Auth
                {...props}
                user={user}
                setUser={setUser}
                needsAccount={true}
              />
            )}
          />
          <Route
            path="/signin"
            render={(props) => (
              <Auth
                {...props}
                user={user}
                setUser={setUser}
                needsAccount={false}
              />
            )}
          />
          <Route path="/messages" render={(props) => <Messages {...props} />} />
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
            path="/profile_manage/ProfileManage" 
            render={(props) => <ProfileManage {...props}/>}
          />
          <Route
            exact path="/profile/create-new" 
            render={(props) => <CreateNewProfile {...props} user={dbUser}/>}
          />
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
