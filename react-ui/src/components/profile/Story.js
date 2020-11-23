import React from "react";
import './styles/story-styles.css'

const Story = (props) => {
  const { story } = props;

  return (
    <div className="story-container">
      <h1>Story</h1>
      <p>{story}</p>
    </div>
  );
};

export default Story;
