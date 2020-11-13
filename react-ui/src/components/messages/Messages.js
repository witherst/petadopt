import React, { useEffect, useState } from 'react';
import Nameplate from '../nameplate/Nameplate.js'
import { IndividualFriend, Friends } from '../friends/Friends.js'
import './styles/messages-style.css'

function Messages(props) {
    const {
        user,
        dbuser
    } = props;
    const [petlist, setPetlist] = useState([]);
    const [selectedPet, setSelectedPet] = useState("No pet selected");
    const [chatInputText, setChatInputText] = useState('');
    const [disableInput, setDisableInput] = useState(true);

    const getMessagePanelList = () =>{
        // TODO: Need to fill messagePanelList with data from DB based on user or shelter.
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
        setDisableInput(false);
    }

    // Send message
    const sendMessage = async(e) => {
        e.preventDefault();
        console.log('submitted')
    }

    // Set chat value state
    const setChatValue = (msg) => {
        console.log(msg)
        setChatInputText(msg);
    }

  // On component render or data change useEffect() is called
    useEffect(() => {
        getMessagePanelList();

        return () => {
        // cleanup
    }
  }, [user, dbuser])  // If user changes, get petlist again

    return (
        <div className="messages-page-container">

            {/* Friends list */}
            <MessageFriendsPanel dbuser={dbuser} petlist={petlist} handlePetNameClick={handlePetNameClick}/>

            {/* Message container */}
            <div className="messages-container">
                    {dbuser.is_creator ? (
                        <div className="messages-container-title-div">
                            <h2>messaging as</h2>
                            <h1 style={{marginTop:"-15px", marginBottom:"-15px"}}>{selectedPet}</h1>
                            <h2>to {dbuser.username}</h2>
                        </div>
                    ): (
                        <div className="messages-container-title-div">
                            <h1>{selectedPet}</h1>
                        </div>
                    )}
                    

                {/* Display of chat messages in container */}
                <div className="messages-container-display-div">
                
                </div>

                {/* Chat input for user */}
                {disableInput ? (
                    <form className="chat-input-form" onSubmit={sendMessage}>
                        <input className="chat-input" disabled type="text" placeholder="Select pet to send message" onChange={(e) => setChatValue(e.target.value)}/>
                        <button className="chat-input-submit-button" disabled type="submit">Send</button>
                    </form>
                ): (
                    <form className="chat-input-form" onSubmit={sendMessage}>
                        <input className="chat-input" type="text" placeholder="Message..." onChange={(e) => setChatValue(e.target.value)}/>
                        <button className="chat-input-submit-button" type="submit">Send</button>
                    </form>
                )}
                
            </div>
        </div>
    )
}
export default Messages

function MessageFriendsPanel(props){
    const {
        petlist,
        handlePetNameClick,
        dbuser
    } = props; 

    {console.log(dbuser)}

    return(
        <div className="petnames-display">
                <h1>Messages</h1>
                <hr className="spacer"/>

                {petlist && petlist.map((pet, index) => (
                    <div key={index} onClick={() => handlePetNameClick(pet.external_pet_id)}>
                        <IndividualFriend key={pet.id} pet={pet} linkto={'#'}/>
                    </div>
                ))}
            </div>
    )
}

function MessagesDisplay(props) {
    return(
        <div></div>
    )
}