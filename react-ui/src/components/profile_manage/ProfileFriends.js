/****************************************************************
 * Filename: ProfileFriends.js
 * Description: This is a helper file, based on Friends.js to 
 *    populate data onto the ProfileManage.js file.
 ****************************************************************/
import React, { useState } from 'react';
import './ProfileManageStyle.css';
import Cat from "./BilboBaggins.JPG"
import Checkbox from "./Checkbox";

const OPTIONS = ["Available", "Not Available"];

export function Friends(props) {
  const {
    title,
    pets,
    availability
  } = props;

  useState = {
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };

  return (
    <div className="friends-container">
      <h1>{title}</h1>
      <h1>{availability}</h1>

      <hr className="spacer"/>

      {pets ? pets.map((pet, availability, index) => (
        <IndividualFriend 
          key={pet.internal_pet_id} 
          pet={pet} 
          availability={availability}
          linkto={'/pet/' + pet.internal_pet_id}/>
      )) : ''}
    </div>
  )
}

export function IndividualFriend(props){
    const {
    pet
  } = props;

  const MAX_NAME_LENGTH = 20;

  return(
    <div className="profileManage-div-container">
      <a href={props.linkto}>
        <div className="profileManage-div-container-content">

          <img src={Cat}></img> 

          <h1>{pet.external_pet_id.slice(
              0, 
              MAX_NAME_LENGTH,
            )}
          </h1>

          <h3>Current availability status</h3>

          <h3>checkbox</h3>

        </div>
      </a>
      {/* Green divider line between friend profile displays */}
      <hr className="spacer"/>

    </div>
  )
}

