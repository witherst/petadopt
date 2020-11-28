import React from "react";
import { Link } from "react-router-dom";

const MessageButton = (props) => {
  const { user, petProfile } = props;

  return (
    <div className="message-text-div">
      {/* {user && !user.is_creator && !user.is_admin ? ( */}
      {user && true ? (
        <Link to="/messages">Message</Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageButton;
