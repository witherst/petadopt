import React from 'react';

import Dashboard from './Dashboard';
import Landing from './Landing';


const Home = (props) => {
  const {
    user, setUser, handleLogout
  } = props;

  return (
    <div className="Home">
        { user ? (
          // if user exists, direct to home page
        <div>
            {/* TEMPORARY LOGOUT BUTTON */}
            <button onClick={handleLogout}>Logout</button>
          
            <Dashboard handleLogout={handleLogout} />
          </div>
        ) : (
          // otherwise, direct to landing page
          <Landing />
          )}
      </div>
  );
}

export default Home
