import React, { useEffect, useState } from "react";
import "./Search.css";

import Filter from "./Filter";
import Community from "./Community";
import { useHistory } from "react-router-dom";

const Browse = (props) => {
  const { user } = props;

  useEffect(() => {}, []);

  // search results
  const [pets, setPets] = useState(false);

  return (
    <div>
      {user.is_creator || user.is_admin ? <CreateProfileOption /> : ""}
      <h1>Search for your next furrrriend</h1>
      <Filter user={user} pets={pets} setPets={setPets} />
      <h1>Pet Community</h1>
      <Community user={user} pets={pets} />
    </div>
  );
};

const CreateProfileOption = () => {
  let history = useHistory();
  return (
    <div>
      <h1>
        Add to the community...
        <input
          type="submit"
          value="Create Pet Profile"
          onClick={() => {
            history.push("/profile/create-new");
          }}
        />
      </h1>
    </div>
  );
};

export default Browse;
