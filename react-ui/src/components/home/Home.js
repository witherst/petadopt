import React, { useEffect, useState } from 'react';
import { Friends } from '../friends/Friends';
import './styles/home-styles.css'

import Dashboard from './Dashboard';
import Landing from './Landing';
import { Posts } from '../posts/Posts';
import Nameplate from '../nameplate/Nameplate'


const Home = (props) => {
  const {
    user, setUser, handleLogout
  } = props;

  const [petlist, setPetlist] = useState([]);

  /* TODO: The following two lines should be information present on the user data when they log in. */
  const username = "Tim Withers"
  const usertype = "admin"

  const getPetList = () =>{
      // TODO: Need to fill petlist with data from DB based on user or shelter.
      //  petlist will consist of: (Name of pet, link to picture)
      const petlist = [];
      const maxNameLength = 20;

      for (let i = 0; i < 5; i++){
        let name = "Awesome Cattttttttttttttttttttttttttttttt";
        let newname = cutNameIfTooLong(name, maxNameLength);
        
        petlist.push({id: i, name: newname, imgpath: "img/path.jpg"});
      }

      setPetlist(petlist);
  }

  function cutNameIfTooLong(name, maxNameLength){      
    let temp = name;
    let length = temp.length;

    // If name is too long, cut it off and append '...' to end
    if(length > maxNameLength){
      temp = name.slice(0, maxNameLength);
      temp += '...';
    }

    return temp
  }

  // On component render or data change useEffect() is called
  useEffect(() => {
      getPetList();
    
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
              {user && <Nameplate name={username} subtext={usertype}/>}
              {true && <Friends title="Friends you're following" pets={petlist}/>}
              {/* {true && <Friends title="Manage your profiles" pets={petlist}/>} */}
             
              {/* TEMPORARY LOGOUT BUTTON */}
              {<button onClick={handleLogout} style={{"maxHeight": "50px", "maxWidth": "75px", "marginTop": "550px"}}>Logout</button>}
              {<Dashboard handleLogout={handleLogout}/>}
            </div>

            <div className="home-posts-container">
              <Posts/>
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
