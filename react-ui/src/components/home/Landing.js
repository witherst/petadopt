import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import Featured from "./Featured";

const Landing = () => {
  return (
    <div className="Landing">
      {/* Primary Header section */}
      <h1>Welcome to our furry community</h1>

      {/* Klunky, but 'div style' seems to work centering text */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/browse"}>
          <p className="paraLink">Browse for a furever furiend</p>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/search/SearchHome"}>
          <p className="paraLink"> Browse for a furever home </p>
        </Link>
      </div>

      {/* Pretty separation line */}
      <hr className="solid"></hr>

      {/* Secondary Header for shelters to generate profile */}
      <h2>Find a furever home for a furry</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="./Profile">
          <p className="paraLink"> Create a profile for adoptable furries</p>
        </Link>
      </div>
      <hr className="solid"></hr>

      {/* Secondary Header to Showcase Furries */}
      <h2>Featured furries</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Featured numFeatured={4} />
      </div>

      <hr className="solid"></hr>

      {/* Secondary Header to give user option to join site */}
      <h2>Join our furry community on PetLinked</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="./SignUp">
          <p className="paraLink"> Get Started</p>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
