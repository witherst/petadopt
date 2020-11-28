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

      <a style={{"display":"block"}} href={path}>
        <div className="card-container">
          <ProfilePic image={pic} />
          <div className="card-text-container">
            <h3>{name}</h3>
            <p>{moment(timestamp).fromNow()}</p>
          </div>

          {/* <Following user={user} petId={petId} /> */}

        </div>
      </a>
    </div>
  );
};

export default Card;
