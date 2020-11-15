import React, { useEffect, useState } from 'react';
import'./ProfileManage.css';
import { IndividualFriend, Friends } from '../friends/Friends.js'

function ProfileManage(props) {
  // Followed Timmy's method in Messages.js
  const [petProfileList, setPetProfileList] = useState([]);
  const [selectedPetProfile, setSelectedPetProfile] = useState(
      "No pet selected"
    );

  const getPetProfileList = () => {
    // TODO: Get profiles from database; pic, name, 
    // availability/status
    const petProfileList = [];

    for (let i = 0; i < 10; i++){
      let name = "bilbobaggins";

      petProfileList.push({
          id: i,
          external_pet_id: name 
          // imgpath:'./BilboBaggins.jpg'
        }); 
      }
      setPetProfileList(petProfileList);
    } // End For Loop
 
  // Placeholder for fetching data from DB
  const handlePetProfileNameClick = (name) => {
    setSelectedPetProfile(name);
  } // End handlePetProfileNameClick

  // useEffect() is called for data changes
  useEffect(() => {
    getPetProfileList();

  }, [props.user]) // Updates with new user (End useEffect)

  return (
    <div>
      <h1>Manage Profiles</h1>

      {/* Pretty line to separate search/filter from profiles */}
      <hr class="solid"></hr>

      {/* Should get information to display on the page */}
      <div style={{
          maxWidth: "fit-content",
          flexDirection: "column",
          paddingLeft: 20
        }}>
        {petProfileList && petProfileList.map(
          (pet, index) => (
            <div key = {index} onClick={() => 
              handlePetProfileNameClick(petProfileList.name)}>
                <IndividualFriend 
                  key={pet.id} 
                  pet={pet}
                  linkto={'#'}/>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

export default ProfileManage;