import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Following from "../Following";
import MessageButton from "../messages/MessageButton";

import "../../App.css";

const PetPlate = (props) => {
  const { petProfile, user } = props;

  useEffect(() => {}, [user]);

  return (
    <div>
      <div className="availability-container">
        <p>dot color</p>
        <p>{petProfile.availability}</p>
      </div>
      <div className="profile-pic-container">
        imageplaceholderhere
        <p>view photos</p>
      </div>
      <div className="profile-badge-container">
        <h1>{petProfile.external_pet_id}</h1>
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
