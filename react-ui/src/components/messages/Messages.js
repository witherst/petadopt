import React, { useEffect, useState } from 'react';
import Nameplate from '../nameplate/Nameplate.js'
import { IndividualFriend, Friends } from '../friends/Friends.js'
import './styles/messages-style.css'

function Messages(props) {
    const [petlist, setPetlist] = useState([]);
    const [selectedPet, setSelectedPet] = useState("No pet selected");

    const getPetList = () =>{
        // TODO: Need to fill petlist with data from DB based on user or shelter.
        //  petlist will consist of: (Name of pet, link to picture)
        const petlist = [];
        const maxNameLength = 20;

        for (let i = 0; i < 5; i++){
          let name = "Awesome Cattttttttttttttttttttttttttttttt";
          let newname = cutNameIfTooLong(name, maxNameLength);
        
          petlist.push({id: i, external_pet_id: newname, imgpath: "img/path.jpg"});
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
        <div className="messages-page-container">
            <div className="petnames-display">
                <h1>Messages</h1>
                <hr className="spacer"/>
{/* <IndividualFriend key={pet.internal_pet_id} pet={pet} linkto={'/pet/' + pet.internal_pet_id}/> */}
{/* <IndividualFriend key={pet.id} name={pet.name} imgpath={pet.imgpath} linkto={'#'}/> */}


                {petlist && petlist.map((pet, index) => (
                    <div key={index} onClick={() => handlePetNameClick(pet.name)}>
                        <IndividualFriend key={pet.id} pet={pet} linkto={'#'}/>
                    </div>
                ))}
            </div>
            <div className="messages-container">
                <div className="messages-container-title-div">
                    <h1>{selectedPet}</h1>
                </div>
                <div className="messages-container-display-div">
                
                </div>
                <div className="messages-container-send-input-div">

                </div>
            </div>
        </div>
    )
}

export default Messages