import React from "react";
import default_pic from "./default-photo-pet.png";

const ProfilePic = (props) => {
  const { image } = props;

  return (
    <div>
      <img src={image ? image : default_pic} />
    </div>
  );
};

export default ProfilePic;
