import React, { useEffect } from "react";

import Card from "../friends/Card";

import './styles/community-styles.css'

const Community = (props) => {
  const { user, pets } = props;

  useEffect(() => {}, [user, pets]);

  return (
    <div className="img-grid">
      {pets || pets.length > 0 ? (
        pets.map((pet) => (
          <Card className="img-wrap"
            key={pet.internal_pet_id}
            user={user}
            petId={pet.internal_pet_id}
            name={pet.external_pet_id}
            timestamp={pet.last_updated_timestamp}
            pic={pet.endpoint}
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
