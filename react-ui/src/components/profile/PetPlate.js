import React, { useEffect } from "react";

import Following from "../Following";
import MessageButton from "../messages/MessageButton";

import "../../App.css";
import ProfilePic from "../../images/ProfilePic";
import "./styles/petplate-styles.css";

const PetPlate = (props) => {
  const { petProfile, user } = props;

  useEffect(() => {}, [user]);

  return (
    <div className="petplate-container">
      <div className="availability-container">
        <div>dot color</div>
        <div>{petProfile.availability}</div>
      </div>
      <div className="profile-pic-container">
        <ProfilePic image={petProfile.endpoint} />
      </div>
      <div className="pet-info-container">
        <p>{petProfile.external_pet_id}</p>
        <p>{petProfile.location}</p>
        <p>{petProfile.animal_type}</p>
        <p>
          {petProfile.age_in_months
            ? petProfile.age_in_months / 12 + " years old "
            : ""}
        </p>
      </div>
      <div className="contact-container">
        <Following user={user} petId={petProfile.internal_pet_id} />
        <MessageButton user={user} petProfile={petProfile} />
      </div>
    </div>
  );
};

export default PetPlate;
