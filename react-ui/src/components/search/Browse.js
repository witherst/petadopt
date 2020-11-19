import React, { useEffect, useState } from "react";
import "./styles/browse-styles.css"

import Filter from "./Filter";
import Community from "./Community";
import { useHistory } from "react-router-dom";

const Browse = (props) => {
  const { user } = props;

  useEffect(() => {}, []);

  // search results
  const [pets, setPets] = useState(false);

  return (
    <div className="browse-container">
      {user.is_creator || user.is_admin ? <CreateProfileOption /> : ""}
      <div className="filter-container">
        <h1>Search for your next furrrriend</h1>
        <Filter user={user} pets={pets} setPets={setPets} />
      </div>

      <div className="pet-community-container">
        <h1>Pet Community</h1>
        <Community user={user} pets={pets} />
      </div>
    </div>
  );
};

const CreateProfileOption = () => {
  let history = useHistory();
  return (
    <div className="createprofile-option-div">
      <h1>Add to the Community</h1>
      <button className="createprofile-submit-button" type="submit" value="submit" onClick={() => { history.push("/profile/create-new"); }}>
        Create Pet Profile
      </button>
    </div>
  );
};

export default Browse;
