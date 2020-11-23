import React, { useEffect, useState } from "react";

import Following from "../Following";
import MessageButton from "../messages/MessageButton";

import "../../App.css";
import ProfilePic from "../../images/ProfilePic";
import "./styles/petplate-styles.css";

const PetPlate = (props) => {
  const { petProfile, user } = props;

  useEffect(() => {
  }, [user]);

  return (
    <div className="petplate-container">
      <div className="availability-container">
        {/* <div>dot color</div> */}
        <div style={ {color: petProfile.availability.toLowerCase() == "adoptable" ? 'green': 
                    petProfile.availability.toLowerCase() == "not adoptable" ? 'red': 'yellow' } }>{petProfile.availability}</div>
      </div>

      <div className="profile-pic-container">
        {/* Profile picture */}
        <ProfilePic image={petProfile.endpoint} />

        {/* Information on right side of profile pictuure */}
        <div className="pet-info-container">
          <h1>{petProfile.external_pet_id}</h1>
          <h3>{petProfile.location}</h3>
          <h3>{petProfile.animal_type}</h3>
          <h3>
            {petProfile.age_in_months
              ? "Age - " + petProfile.age_in_months / 12 + " years old "
              : ""}
        </h3>
      </div>

      </div>
      <div className="contact-container">
        <Following user={user} petId={petProfile.internal_pet_id} />
        <MessageButton user={user} petProfile={petProfile} />
      </div>
    </div>
  );
};

export default PetPlate;
