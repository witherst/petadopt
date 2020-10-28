import React from 'react';
import { Friends } from '../friends/Friends';
import './styles/home-styles.css'

import Dashboard from './Dashboard';
import Landing from './Landing';
import { Posts } from '../posts/Posts';


const Home = (props) => {
  const {
    user, setUser, handleLogout
  } = props;

  return (
    <div className="Home">
      { user ? (
          // if user exists, direct to home page
          <div className="home-container">
            <Friends/>
            <Posts/>
            {/* TEMPORARY LOGOUT BUTTON */}
            {<button onClick={handleLogout} style={{"maxHeight": "50px"}}>Logout</button>}
            {<Dashboard handleLogout={handleLogout} />}
          </div>
        ) : (
          // otherwise, direct to landing page
          <Landing />
      )}
    </div>
  );
}

export default Home
