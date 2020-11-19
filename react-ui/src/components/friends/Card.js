import React, { useEffect } from "react";
import moment from "moment";

import Following from "../Following";
import ProfilePic from "../../images/ProfilePic";

const Card = (props) => {
  const { user, petId, name, timestamp, pic, path } = props;

  useEffect(() => {}, [user]);

  return (
    <div className="container">
      <a href={path}>
        <div>
          <ProfilePic image={pic} />
          <h3>{name}</h3>
          <p>{moment(timestamp).fromNow()}</p>
        </div>
      </a>
      <Following user={user} petId={petId} />
    </div>
  );
};

export default Card;
