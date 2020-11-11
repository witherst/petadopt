import React, { useEffect, useState } from 'react';
import { Friends, CreateProfile } from '../friends/Friends';
import './styles/home-styles.css'

import Dashboard from './Dashboard';
import Landing from './Landing';
import { Posts } from '../posts/Posts';
import Nameplate from '../nameplate/Nameplate'

import Baby from './images/baby.jpg'

const Home = (props) => {
  const {
    user, handleLogout
  } = props;

  const PANEL_TITLE_MANAGE = 'Manage your profiles';
  const PANEL_TITLE_FRIENDS = 'Friends you\'re following';

  const userId = user.internal_user_id;

  /* TODO: The following two lines should be information present on the user data when they log in. */
  const [username, setUsername] = useState(false);
  const [usertype, setUsertype] = useState(false);
  const [panelTitle, setPanelTitle] = useState(false);
  const [petlist, setPetlist] = useState(false);
  const [posts, setPosts] = useState(false);

  const setDbData = () => {
    if (!user) {
      return;
    }

    // set usertype
    if (user.is_admin) {
      setUsertype(() => "admin");
      setPanelTitle(PANEL_TITLE_MANAGE)
      fetchAllPets();
    } else if (user.is_creator) {
      setUsertype(() => "shelter");
      setPanelTitle(PANEL_TITLE_MANAGE)
      fetchCreatorPets();
    } else {
      setUsertype(() => "looking for friend")
      setPanelTitle(PANEL_TITLE_FRIENDS)
      fetchBookmarkedPets();
    }

    setUsername(() => user.username);
  }

  const fetchAllPets = () => {
    fetch('/api/pet')
        .then(res => res.json())
        .then((res) => {
            setPetlist(() => res)
        });
    fetch('/api/status')
        .then(res => res.json())
        .then((res) => {
            setPosts(() => res)
        });
  }

  const fetchCreatorPets = () => {
    fetch('/api/pet/user/' + userId)
        .then(res => res.json())
        .then((res) => {
            setPetlist(res)
        });
    fetch('/api/status/creator/' + userId)
        .then(res => res.json())
        .then((res) => {
            setPosts(() => res)
        });
  }

  const fetchBookmarkedPets = () => {
    fetch('/api/pet/petmark/' + userId)
        .then(res => res.json())
        .then((res) => {
            setPetlist(res)
        });
    fetch('/api/petmark/statuses/' + userId)
        .then(res => res.json())
        .then((res) => {
          console.log(userId)
            setPosts(() => res)
        });
  }

  // On component render or data change useEffect() is called
  useEffect(() => {
      setDbData();
    
      return () => {
        // cleanup
    }
  }, [user])  // If user changes, get petlist again

  return (
    <div className="Home">
      { user ? (
          // if user exists, direct to home page
          <div className="home-container">
            <div className="nameplate-friend-container">
              {user && <Nameplate name={username} subtext={usertype} picLoc={Baby}/>}

              {<Friends title={panelTitle} pets={petlist}/>}
              {(user.is_admin || user.is_creator) && <CreateProfile/>}
             
              {/* TEMPORARY LOGOUT BUTTON */}
              {<button onClick={handleLogout} style={{"maxHeight": "50px", "maxWidth": "75px", "marginTop": "550px"}}>Logout</button>}
              {<Dashboard handleLogout={handleLogout}/>}
            </div>

            <div className="home-posts-container">
              <Posts user={user} posts={posts} pets={petlist}/>
            </div>
          </div>
        ) : (
          // otherwise, direct to landing page
          <Landing />
      )}
    </div>
  );
}

export default Home
