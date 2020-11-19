import React from "react";
import "./styles/friends-styles.css";
import ProfilePic from "../../images/ProfilePic";

export function Friends(props) {
  const { title, pets } = props;

  // TODO: replace w/ pet image
  /* note: use pet.profile_pic_id yields an id for photos table.
   * query photos table for internal_pic_id=pet.profile_pic_id for location of image
   * if pet.profile_pic_id == null, use default image
   */

  return (
    <div className="friends-container">
      <h1>{title}</h1>
      <hr className="spacer" />

      {pets
        ? pets.map((pet, index) => (
            <IndividualFriend
              key={pet.internal_pet_id}
              pet={pet}
              linkto={"/pet/" + pet.internal_pet_id}
            />
          ))
        : ""}
    </div>
  );
}

export function IndividualFriend(props) {
  const { pet } = props;

  const MAX_NAME_LENGTH = 20;

  return (
    <div className="individual-friend-div-container">
      <a href={props.linkto}>
        <div className="individual-friend-div-container-content">
          <ProfilePic image={pet.endpoint} />
          <h1>{pet.external_pet_id.slice(0, MAX_NAME_LENGTH)}</h1>
        </div>
      </a>
      <hr className="spacer" />
    </div>
  );
}

export function CreateProfile(props) {
  return (
    <div className="create-profile-container">
      <a href="/profile/create-new">
        <div className="create-profile-div">
          <h2>Create Profile</h2>
        </div>
      </a>
    </div>
  );
}
