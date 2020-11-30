import React from "react";
import "./styles/landing-styles.css";
import { Link } from "react-router-dom";
import Featured from "./Featured";
import check_mark_logo from '../../images/check-mark.png'

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-header-container">
        <h1>Welcome to our furry community</h1>
        <h2>Make the most of your life with a furfriend</h2>

       <div className="getstarted-container">
        <Link to="./SignUp">
          <div className="landing-join-btn">
            <h3>Join</h3>
            <p>our community!</p>
          </div>
        </Link>

        <Link to="./SignIn">
          <div className="landing-login-btn">
            <h3>Login</h3>
            <p>welcome back!</p>
          </div>
        </Link>
      </div>

      </div>

      <div className="features-container">
        <h1>Features of PetLinked</h1>
        <div className="features-list-container">
          <div className="feature-container">
            <img src={check_mark_logo}/>
            <Link className="link-to-div" to="/browse">
              <h3>Browse for a furever furiend</h3>
            </Link>
          </div>

          <div className="feature-container">
            <img src={check_mark_logo}/>
            <h3>Browse for a furever home</h3>
          </div>

          <div className="feature-container">
            <img src={check_mark_logo}/>
            <h3>Create a profile for adoptable furries</h3>
          </div>

          <div className="feature-container">
            <img src={check_mark_logo}/>
            <h3>Keep up to date about your furriends</h3>
          </div>
        </div>
      </div>

      <div className="featured-container">
        <h1>Featured Furries</h1>
        <Featured numFeatured={4} />
      </div>
    </div>
  );
};

export default Landing;
