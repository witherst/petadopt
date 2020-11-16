/****************************************************************
 * Filename: ProfileManage.js
 * Description: This draws data from helper file ProfileFriends.js 
 *    and styling from ProfileManage.css. Provides a UI for the  
 *    user to view a list of their available pets.
  ***************************************************************/
import React, { useEffect, useState } from 'react';
import Nameplate from '../nameplate/Nameplate.js'
import { IndividualFriend, Friends } from './ProfileFriends.js'
import './ProfileManageStyle.css'
 
function ProfileManage(props) {

  const [petlist, setPetlist] = useState([]);
  const [selectedPet, setSelectedPet] = useState("No pet selected");

  const getPetList = () =>{
    // TODO: Need to fill petlist with data from DB based on user or shelter.
    //  petlist will consist of: (Name of pet, link to picture, availability)
    const petlist = [];
    const maxNameLength = 20;

    for (let i = 0; i < 15; i++){
      let name = "BilboBaggins";
      let newname = cutNameIfTooLong(name, maxNameLength);
      let availability = "true";
      
      petlist.push({
        id: i, 
        external_pet_id: newname, 
        imgpath: "img/path.jpg",
        availability: availability
      });
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

  /* TODO: This is where we would fetch the messages from the DB or wherever */
  const handlePetNameClick = (name) => {
      setSelectedPet(name);
    }

    // On component render or data change useEffect() is called
    useEffect(() => {
      getPetList();

    return () => {
      // cleanup
    }
  }, [props.user])  // If user changes, get petlist again

  return (
    <div>
      {/* Forced to do instyle styling; unresponsive to style sheet */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        <h2>Manage Profiles</h2> 
        <p className="para">
        <h2>Save</h2>     
        </p>
      </div>

      <div className="profileManage-scrollpage-container">

        {/* This is the scrolling format */}
        <div className="petProfile-names-display">

        <hr className="spacer"/>

        {/* <IndividualFriend 
              key={pet.internal_pet_id} 
              pet={pet} 
              linkto={'/pet/' + pet.internal_pet_id}
            /> */}

        {/* <IndividualFriend 
              key={pet.id} 
              name={pet.name} 
              imgpath={pet.imgpath} 
              linkto={'#'}
            /> */}

          {petlist && petlist.map((pet, index) => (
            <div 
            key={index}   
            onClick={() => handlePetNameClick(pet.name)}>

            <IndividualFriend 
              key={pet.id} 
              pet={pet} 
              linkto={'#'}/>
            </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileManage;