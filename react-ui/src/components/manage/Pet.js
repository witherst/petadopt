import React, { useEffect, useState } from "react";
import Following from "../Following";
import Delete from "../friends/Delete";
import { IndividualFriend } from "../friends/Friends";
import { availability_options } from "../options/constants/animal_options";
import DropdownSelection from "../options/DropdownSelection";

const Pet = (props) => {
  const { user, isSeeker, pet } = props;
  const [petId, setPetId] = useState(false);
  const [availability, setAvailability] = useState(false);

  const initPet = () => {
    setPetId(pet.internal_pet_id);
    if (!availability) {
      setAvailability(() => pet.availability);
    }
  };

  useEffect(() => {
    initPet();
  }, [pet, availability]);

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

  return (
    <div>
      <IndividualFriend key={petId} pet={pet} linkto={`pet/${petId}`} />
      {isSeeker ? (
        ""
      ) : (
        <DropdownSelection
          options={availabilityOptions}
          selection={availability}
          setSelection={setAvailability}
          showEmpty={false}
          onChange={updateAvailability}
        />
      )}
      {isSeeker ? "" : <Delete pet={pet} />}

      <Following user={user} petId={petId} />
    </div>
  );
};

export default Pet;