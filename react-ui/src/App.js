import React, { useEffect, useState } from 'react';
import { Link,BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import fire from './fire';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';

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
      <ul>
        <Link to='/'><li>home</li></Link>
        <Link to='/signup'><li>signup</li></Link>
        <Link to='/signin'><li>signin</li></Link>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
