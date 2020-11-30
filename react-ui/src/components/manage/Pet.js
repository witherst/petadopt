import React, { useEffect, useState } from "react";
import Following from "../Following";
import Delete from "../friends/Delete";
import { IndividualFriend } from "../friends/Friends";
import { availability_options } from "../options/constants/animal_options";
import DropdownSelection from "../options/DropdownSelection";
import './styles/pet-styles.css'

const Pet = (props) => {
  const { user, isSeeker, pet } = props;
  const [petId, setPetId] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [mount, setMount] = useState(true);

  const initPet = () => {
    setPetId(pet.internal_pet_id);
    if (!availability) {
      setAvailability(() => pet.availability);
    }
  };

  useEffect(() => {
    initPet();
  }, [pet, availability, mount]);

  const availabilityOptions = Object.values(availability_options).map((val) => {
    return val;
  });

  const updateAvailability = async function (availability) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availability, petId }),
    };
    await fetch("/api/pet/update/availability", requestOptions);
  };

  if (!mount) {
    return <div />;
  }

  return (
    <div className="manage-individual-pet-container">
      <IndividualFriend key={petId} pet={pet} linkto={`pet/${petId}`} />
      {!isSeeker && (
        <DropdownSelection
          options={availabilityOptions}
          selection={availability}
          setSelection={setAvailability}
          onChange={updateAvailability}
        />
      )}

      <div className="delete-follow-container">
        {!isSeeker && <Delete pet={pet} setMount={setMount} />}
        <Following user={user} petId={petId} />
      </div>

      <hr className="spacer"/>
    </div>

  );
};

export default Pet;
