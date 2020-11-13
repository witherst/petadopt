import React, { useEffect } from "react";

import cat from "./friendImages/cat4.jpg"; //temp image path

import Card from "../friends/Card";

const Community = (props) => {
  const { user, pets } = props;

  useEffect(() => {}, [user, pets]);

  return (
    <div>
      {pets || pets.length > 0 ? (
        pets.map((pet) => (
          <Card
            key={pet.internal_pet_id}
            user={user}
            petId={pet.internal_pet_id}
            name={pet.external_pet_id}
            timestamp={pet.last_updated_timestamp}
            pic={cat}
            path={"/pet/" + pet.internal_pet_id}
          />
        ))
      ) : (
        <p>No result</p>
      )}
    </div>
  );
};

export default Community;
