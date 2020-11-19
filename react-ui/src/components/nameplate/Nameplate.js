import React from "react";
import ProfilePic from "../../images/ProfilePic";
import "./styles/nameplate-styles.css";

function Nameplate(props) {
  const { name, subtext, picLoc } = props;

  return (
    <div className="nameplate-container">
      <div className="img-container">
        <ProfilePic image={picLoc} />
      </div>
      <div className="nameplate-text-container">
        <h1>{name}</h1>
        <h2>{subtext}</h2>
      </div>
    </div>
  );
}

export default Nameplate;
