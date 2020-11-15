import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PetPlate from "./PetPlate";
import Facts from "./Facts";
import Info from "./Info";
import Story from "./Story";
import Feed from "./Feed";
import CreatorUtil from "./CreatorUtil";

import "../../App.css";

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
    initializeIds();
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

  return (
    <div>
      <h1>PetId {petId}</h1>
      <PetPlate petProfile={petProfile} user={user} />

      <Facts petProfile={petProfile} />

      <Info petDispositions={petDispositions} />

      <Story story={petProfile.story} />

      <Feed petStatuses={petStatuses} />

      {userId == petProfile.creator_id || user.is_admin ? <CreatorUtil /> : ""}
    </div>
  );
};

export default Profile;
