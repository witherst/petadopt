import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PetPlate from "./PetPlate";
import Facts from "./Facts";
import Info from "./Info";
import Story from "./Story";
import Feed from "./Feed";
import CreatorUtil from "./CreatorUtil";

import "./styles/profile-styles.css";

// route: /pet/:petId
const Profile = (props) => {
  const {
    user, // current user viewing profile
  } = props;

  const params = useParams();
  const [userId, setUserId] = useState(false);
  const [petId, setPetId] = useState(false);
  const [petProfile, setPetProfile] = useState(false);
  const [petDispositions, setPetDispositions] = useState(false);
  const [petStatuses, setPetStatuses] = useState(false);
  useEffect(() => {
    !petId && initializeIds();
    if (petId) {
      getProfile();
      getDispositions();
      getStatuses();
    }
  }, [user, petId]);

  const initializeIds = () => {
    setUserId(user.internal_user_id);
    setPetId(params.petId);
  };

  const getProfile = () => {
    fetch("/api/pet/" + petId)
      .then((res) => res.json())
      .then((res) => {
        setPetProfile(res[0]);
      });
  };

  const getDispositions = () => {
    fetch("/api/disposition/" + petId)
      .then((res) => res.json())
      .then((res) => {
        setPetDispositions(res);
      });
  };

  const getStatuses = () => {
    fetch("/api/status/" + petId)
      .then((res) => res.json())
      .then((res) => {
        setPetStatuses(res);
      });
  };

  if (!petProfile) {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Profile does not exist</h1>
      </div>
    );
  }
  return (
    <div className="profile-container">
      {(userId === petProfile.creator_id || user.is_admin) && (
        <CreatorUtil pet={petProfile} setMount={setPetId} />
      )}

      <PetPlate petProfile={petProfile} user={user} />

      <Facts petProfile={petProfile} />

      <Info petDispositions={petDispositions} />

      <Story story={petProfile.story} />

      <Feed
        petStatuses={petStatuses}
        external_pet_id={petProfile.external_pet_id}
      />
    </div>
  );
};

export default Profile;
