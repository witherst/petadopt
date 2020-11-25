import React from "react";
import { Link } from "react-router-dom";
import Delete from "../friends/Delete";
import "./styles/creator-utils-styles.css";

const CreatorUtil = (props) => {
  const { pet, setMount } = props;
  return (
    <div className="creator-utils-container">
      <Link>Add a new status</Link>
      <Link>Edit public profile</Link>
      <Delete pet={pet} setMount={setMount} />
    </div>
  );
};

export default CreatorUtil;
