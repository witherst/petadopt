import React, { useEffect, useState } from "react";
import { Friends, CreateProfile } from "../friends/Friends";
import "./styles/home-styles.css";

import { Posts } from "../posts/Posts";
import Nameplate from "../nameplate/Nameplate";

import Baby from "./images/baby.jpg";

const Home = (props) => {
  const { user } = props;

  const PANEL_TITLE_MANAGE = "Manage your profiles";
  const PANEL_TITLE_FRIENDS = "Friends you're following";

  const userId = user.internal_user_id;

  /* TODO: The following two lines should be information present on the user data when they log in. */
  const [username, setUsername] = useState(false);
  const [usertype, setUsertype] = useState(false);
  const [panelTitle, setPanelTitle] = useState(false);
  const [petlist, setPetlist] = useState(false);

  const setDbData = () => {
    if (!user) {
      return;
    }

    // set usertype
    if (user.is_admin) {
      setUsertype(() => "admin");
      setPanelTitle(PANEL_TITLE_MANAGE);
      fetchAllPets();
    } else if (user.is_creator) {
      setUsertype(() => "shelter");
      setPanelTitle(PANEL_TITLE_MANAGE);
      fetchCreatorPets();
    } else {
      setUsertype(() => "looking for friend");
      setPanelTitle(PANEL_TITLE_FRIENDS);
      fetchBookmarkedPets();
    }

    setUsername(() => user.username);
  };

  const fetchAllPets = () => {
    fetch("/api/pet")
      .then((res) => res.json())
      .then((res) => {
        setPetlist(() => res);
      });
  };

  const fetchCreatorPets = () => {
    fetch("/api/pet/user/" + userId)
      .then((res) => res.json())
      .then((res) => {
        setPetlist(res);
      });
  };

  const fetchBookmarkedPets = () => {
    fetch("/api/pet/petmark/" + userId)
      .then((res) => res.json())
      .then((res) => {
        setPetlist(res);
      });
  };

  // On component render or data change useEffect() is called
  useEffect(() => {
    setDbData();

    return () => {
      // cleanup
    };
  }, [user]); // If user changes, get petlist again

  return (
    <div className="Home">
      <div className="home-container">
        <div className="nameplate-friend-container">
          {user && (
            <Nameplate name={username} subtext={usertype} picLoc={Baby} />
          )}

          {<Friends title={panelTitle} pets={petlist} />}
          {(user.is_admin || user.is_creator) && <CreateProfile />}
        </div>

        <div className="home-posts-container">
          <Posts user={user} userId={userId} pets={petlist} />
        </div>
      </div>
    </div>
  );
};

export default Home;
