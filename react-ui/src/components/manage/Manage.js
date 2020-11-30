/****************************************************************
 * Filename: ProfileManage.js
 * Description: This draws data from helper file ProfileFriends.js
 *    and styling from ProfileManage.css. Provides a UI for the
 *    user to view a list of their available pets.
 ***************************************************************/
import React, { useEffect, useState } from "react";
import Pet from "./Pet";
import './styles/manage-styles.css'

const Manage = (props) => {
  const { user } = props;

  const [petlist, setPetlist] = useState(false);
  const [isSeeker, setIsSeeker] = useState(false);

  const initUser = () => {
    if (user.is_creator || user.is_admin) {
      setIsSeeker(() => false);
    } else {
      setIsSeeker(() => true);
    }
  };

  const getPetList = async function () {
    if (!user) {
      return;
    }
    var res = false;
    if (user.is_admin) {
      res = await fetchAllPets();
    } else if (user.is_creator) {
      res = await fetchCreatorPets();
    } else {
      res = await fetchBookmarkedPets();
    }
    res.sort((a, b) => (a.external_pet_id > b.external_pet_id ? 1 : -1));
    setPetlist(() => res);
  };

  useEffect(() => {
    initUser();
    getPetList();
  }, [user]);

  const fetchAllPets = async function () {
    const promise = await fetch("/api/pet");
    const res = await promise.json();
    return res;
  };

  const fetchCreatorPets = async function () {
    const promise = await fetch("/api/pet/user/" + user.internal_user_id);
    const res = await promise.json();
    return res;
  };

  const fetchBookmarkedPets = async function () {
    const promise = await fetch("/api/pet/petmark/" + user.internal_user_id);
    const res = await promise.json();
    return res;
  };

  return (
    <div className="manage-container">
      <div className="manage-container-contents">
        <h1>{isSeeker ? "Manage Pets You're Following" : "Manage Your Pets"}</h1>
        <div className="manage-container-animals">
          <hr className="spacer" />
          {petlist &&
            petlist.map((pet) => (
              <Pet
                user={user}
                key={pet.internal_pet_id}
                pet={pet}
                isSeeker={isSeeker}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Manage;
