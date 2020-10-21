import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import fire from './fire';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';
import Messages from './components/messages/Messages'
import Settings from './components/settings/Settings'
import Search from './components/search/Search'
import Pet from './components/pet/Pet'
import {DropdownMenu, Navbar, NavItem} from './components/navbar/Navbar'

// Icons
import {ReactComponent as HomeIcon} from './components/navbar/icons/home.svg'
import {ReactComponent as SearchIcon} from './components/navbar/icons/search.svg'
import {ReactComponent as MessageIcon} from './components/navbar/icons/messages.svg'
import {ReactComponent as NotificationIcon} from './components/navbar/icons/notification.svg'
import {ReactComponent as SettingsIcon} from './components/navbar/icons/settings.svg'

const App = () => {
  const [user, setUser] = useState("");
  
  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // clearInputs();
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
    <Router>
      {/* TEMPORARY NAV - REPLACE, TW*/}
      <Navbar>
        <NavItem icon={<HomeIcon/>} />
        <NavItem icon={<SearchIcon/>} />
        <NavItem icon={<MessageIcon/>} />
        <NavItem icon={<NotificationIcon/>} />
        <NavItem icon={<SettingsIcon/>}>
          <DropdownMenu/>
        </NavItem>
      </Navbar>

      <ul>
        <Link to='/'><li>home</li></Link>
        <Link to='/signup'><li>signup</li></Link>
        <Link to='/signin'><li>signin</li></Link>
        <Link to='/messages'><li>messages</li></Link>
        <Link to='/settings'><li>settings</li></Link>
        <Link to='/search'><li>search</li></Link>
        <Link to='/pet'><li>pet</li></Link> 
      </ul>
      {/* END OF TEMP*/}
      

      <div className="App">
        <Switch>
          <Route
            exact path="/" 
            render={(props) => <Home {...props} user={user} setUser={setUser} handleLogout={handleLogout}/>}
          />
          <Route
            path="/signup"
            render={(props) => <Auth {...props} user={user} setUser={setUser} needsAccount={true}/>}
          />
          <Route
            path="/signin"
            render={(props) => <Auth {...props} user={user} setUser={setUser} needsAccount={false}/>}
          />
          <Route
            path="/messages" 
            render={(props) => <Messages {...props}/>}
          />
          <Route
            path="/settings" 
            render={(props) => <Settings {...props}/>}
          />
          <Route
            path="/search" 
            render={(props) => <Search {...props}/>}
          />
          <Route
            path="/pet" 
            render={(props) => <Pet {...props}/>}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
