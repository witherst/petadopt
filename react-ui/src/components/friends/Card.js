import React, { useEffect } from "react";
import moment from "moment";

import Following from "../Following";
import ProfilePic from "../../images/ProfilePic";
import './styles/card-styles.css'

const Card = (props) => {
  const { user, petId, name, timestamp, pic, path } = props;

  useEffect(() => {}, [user]);

  return (
    <div className="card-link-container">

        <div className="card-container">
          <Following user={user} petId={petId} />
          <a style={{"display":"block"}} href={path}>
            <ProfilePic image={pic} />

            <div className="card-text-container">
              <h3>{name}</h3>
              <p>{moment(timestamp).fromNow()}</p>
            </div>
          </a>
        </div>
    </div>
  );
};

export default Card;
