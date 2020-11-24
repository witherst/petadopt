import React, { useEffect, useState } from "react";
import Card from "../friends/Card";

const Featured = (props) => {
  const { numFeatured } = props;

  const [petList, setPetList] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetchFeaturedPets();
  }, [fetched]);

  const fetchFeaturedPets = () => {
    if (fetched) {
      return;
    }
    fetch(`/api/pet/featured?&num=${numFeatured}`)
      .then((res) => res.json())
      .then((res) => {
        setPetList(res);
        setFetched(true);
      });
  };

  return (
    <div>
      {petList
        ? petList.map((pet) => (
            <Card
              key={pet.internal_pet_id}
              user={false}
              name={pet.external_pet_id}
              petId={pet.internal_pet_id}
              timestamp={pet.last_updated_timestamp}
              pic={pet.endpoint}
              path={"/pet/" + pet.internal_pet_id}
            />
          ))
        : ""}
    </div>
  );
};

export default Featured;
