import React from "react";
import { Link } from "react-router-dom";

const MessageButton = (props) => {
  const { user, petProfile } = props;

  return (
    <div>
      {user && !user.is_creator && !user.is_admin ? (
        <Link to="/messages">message</Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageButton;
