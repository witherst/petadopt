import React from "react";
import "./styles/landing-styles.css";
import { Link } from "react-router-dom";
import Featured from "./Featured";
import check_mark_logo from '../../images/check-mark.png'

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-header-container">
        <h1 className="landing-header">Welcome to our furry community</h1>
      </div>

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

      <div className="featured-container">
        <h1>Featured Furries</h1>
        <Featured numFeatured={4} />
      </div>

      <div className="features-container">
        <h1>Features of PetLinked</h1>
        <div className="features-list-container">
          <div className="feature-container">
            <img src={check_mark_logo}/>
            <h3>Browse for a furever furiend</h3>
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
  
      {/* <div>
        <Link to={"/browse"}>
          <p className="paraLink">Browse for a furever furiend</p>
        </Link>
      </div>

      <div>
        <Link to={"/search/SearchHome"}>
          <p className="paraLink"> Browse for a furever home </p>
        </Link>
      </div>

      <h2>Find a furever home for a furry</h2>

      <div>
        <Link to="./Profile">
          <p className="paraLink"> Create a profile for adoptable furries</p>
        </Link>
      </div>

      <h2>Join our furry community on PetLinked</h2>

      <div>
        <Link to="./SignUp">
          <p className="paraLink"> Get Started</p>
        </Link>
      </div> */}
    </div>
  );
};

export default Landing;
