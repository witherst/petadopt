import React from "react";

const Story = (props) => {
  const { story } = props;

  return (
    <div>
      <h1>Story</h1>
      <div className="body-container">
        <p>{story}</p>
      </div>
    </div>
  );
};

export default Story;
