import React, { useEffect, useState } from 'react';
import { Friends } from '../friends/Friends';
import './styles/home-styles.css'

import Dashboard from './Dashboard';
import Landing from './Landing';
import { Posts } from '../posts/Posts';


const Home = (props) => {
  const {
    user, setUser, handleLogout
  } = props;

  const [petlist, setPetlist] = useState([]);

  const getPetList = () =>{
      // TODO: Need to fill petlist with data from DB based on user or shelter.
      //  petlist will consist of: (Name of pet, link to picture)
      const petlist = [];
      const maxNameLength = 20;

      for (let i = 0; i < 10; i++){
        let name = "Awesome Cattttttttttttttttttttttt";
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
            {true && <Friends title="Friends you're following" pets={petlist}/>}
            {/* {true && <Friends title="Manage your profiles" pets={petlist}/>} */}
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
