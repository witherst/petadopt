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
    const [userlist, setUserlist] = useState([]);
    const [selectedPet, setSelectedPet] = useState("No pet selected");
    const [chatInputText, setChatInputText] = useState('');
    const [disableInput, setDisableInput] = useState(true);
    const [selectedUser, setSelectedUser] = useState("<No user selected>")
    const [chatMessages, setChatMessages] = useState([{}]);

    const populateMessagePanelList = () =>{
        // TODO: If this is a shelter, we need to get the users that have messaged pets that the shelter owns
        //  Right now I'll hard code it, normally we'd pull this data from the DB. And each user would probably be an object
        //  with an id, name, etc...

        if(dbuser && dbuser.is_creator){ getUserList(); }   // Only get user list if we are a shelter (creator)

        // TODO: After we get the user list, get the pets that the first user in the list has messaged with. 
        //  OR, get the pets AND the users at the same time. Whatever is easiest.Right Now I'm just populating the petlist with garbage.
        
        getPetList();       // Always get list of pets
    }

    const getPetList = () => {
        // TODO: Database WORK: Grab pets from DB here.
        // TODO: May want to pass in user_id if they aren't a creator to get the pets
        const newlist = [];
        const maxNameLength = 20;

        for (let i = 0; i < 5; i++){
          let name = "Awesome Cattttttttttttttttttttttttttttttt";
          let newname = cutNameIfTooLong(name, maxNameLength);
        
          newlist.push({id: i, external_pet_id: newname, imgpath: "img/path.jpg"});
        }

        setPetlist(newlist);
    }

    const getUserList = () => {
        // TODO: Database WORK: Set user list from the shelter with messages here
        let newUserList = [];
        newUserList.push({user_id: 1, user_name: "Jim Bob"});
        newUserList.push({user_id: 2, user_name: "Yenny Smith"});
        newUserList.push({user_id: 3, user_name: "Timoteo Biriishnikov"});
        newUserList.push({user_id: 4, user_name: "Yvonne Sprinkles"});
        newUserList.push({user_id: 5, user_name: "Teddy Bonzai"});

        // Set user list
        setUserlist(newUserList);
    }

    // TODO: Set chat messages here. Grab from Database. You may need to pass in more info to this function. OR, we may get
    //  all the data when we first set the users or something. Not sure yet.
    const getChatMessages = () => {
        let newChatMessages = [];

        newChatMessages.push({date:new Date(), message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis, leo ac gravida hendrerit, metus nunc faucibus ante, eu consectetur lectus neque gravida sapien. '});
        newChatMessages.push({date:new Date(), message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '});
        newChatMessages.push({date:new Date(), message:'Sed ipsum nulla, aliquam ac congue et, facilisis et neque. Nunc ac tellus sit amet justo faucibus interdum et sit amet quam.'});
        newChatMessages.push({date:new Date(), message:'Donec at accumsan risus, ac tristique sem.'});
        newChatMessages.push({date:new Date(), message:' Phasellus facilisis sagittis mauris, pretium vestibulum nulla porttitor non.'});
        newChatMessages.push({date:new Date(), message:'Maecenas vulputate rutrum ipsum quis blandit. Phasellus metus lacus, volutpat vel interdum vel, cursus in mi.'});

        setChatMessages(newChatMessages);
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

    // Set selected user from the dropdown menu in the Messages panel
    const handleSelectedUserChange = (user) => {
        console.log(user);
        if(user == 'Select user to message'){
            setSelectedUser('<No user selected>');
        }
        else{
            setSelectedUser(user);
        }
    }

    /* TODO: This is where we would fetch the messages from the DB or wherever */
    const handlePetNameClick = (name) => {
        setSelectedPet(name);
        setDisableInput(false);
        getChatMessages();
    }

    // Send message
    const sendMessage = async(e) => {
        e.preventDefault();
        console.log('submitted')
    }

    // Set chat value state
    const setChatValue = (msg) => {
        setChatInputText(msg);
    }

  // On component render or data change useEffect() is called
    useEffect(() => {
        populateMessagePanelList();

        return () => {
        // cleanup
    }
  }, [user, dbuser])  // If user changes, get petlist again

    return (
        <div className="messages-page-container">

            {/* Friends list */}
            <MessageFriendsPanel dbuser={dbuser} petlist={petlist} userlist={userlist} handlePetNameClick={handlePetNameClick} handleSelectedUserChange={handleSelectedUserChange}/>

            {/* Message container */}
            <div className="messages-container">
                    {dbuser.is_creator ? (
                        <div className="messages-container-title-div">
                            <h2>messaging as</h2>
                            <h1 style={{marginTop:"-15px", marginBottom:"-15px"}}>{selectedPet}</h1>
                            <h2>to {selectedUser}</h2>
                        </div>
                    ): (
                        <div className="messages-container-title-div">
                            <h1>{selectedPet}</h1>
                        </div>
                    )}
                    

                {/* Display of chat messages in container */}
                <div className="messages-container-display-div">
                        {chatMessages && chatMessages.map((message, index) =>( 
                            <ChatMessage key={index} date={message.date} message={message.message} />
                        ))}
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

function ChatMessage(props) {
    return(
        <div className="chat-message-container">
            {props.message && <hr className="spacer"/>}
            <div className="chat-date">{props.date && props.date.toString()}</div>
            <div className="chat-message">{props.message}</div>
        </div>
    )
}

function MessageFriendsPanel(props){
    const {
        petlist,
        userlist,
        handlePetNameClick,
        dbuser,
        handleSelectedUserChange
    } = props; 

    return(
        <div className="petnames-display">
                <h1>Messages</h1>

                {/* Drop down user list IF the dbuser is a creator. */}
                {dbuser.is_creator && 
                    <div className="user-list-div">
                        <select className="user-list-div-select" name="profilename" id="profilename" onChange={(e) => handleSelectedUserChange(e.target.value)}>
                            <option>Select user to message</option>
                            {userlist && userlist.map(user =>(
                                <option 
                                    key={user.user_id} 
                                    value={user.user_name}>
                                        {user.user_name}
                                </option>
                            ))};
                        </select>
                    </div>
                }

                <hr className="spacer"/>

                {petlist && petlist.map((pet, index) => (
                    <div key={index} onClick={() => handlePetNameClick(pet.external_pet_id)}>
                        <IndividualFriend key={pet.id} pet={pet} linkto={'#'}/>
                    </div>
                ))}
            </div>
    )
}

