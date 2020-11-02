import React from 'react';
import './styles/friends-styles.css';
import Cat from "./images/cat.jpg"

export function Friends(props) {
    return (
        <div className="friends-container">
            <h1>{props.title}</h1>
            <hr className="spacer"/>

            {props.pets.map((pet, index) => (
                
                <IndividualFriend key={pet.id} name={pet.name} imgpath={pet.imgpath}/>
            ))}
        </div>
    )
}

function IndividualFriend(props){
    // TODO
    const petroute = '/pet'
    return(
        <div className="individual-friend-div-container">
            <a href='/pet'>
                <div className="individual-friend-div-container-content">
                    <img src={Cat}></img>
                    <h1>{props.name}</h1>
                </div>
            </a>
            <hr className="spacer"/>
        </div>
    )
}