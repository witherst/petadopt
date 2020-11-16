/****************************************************************
 * Description: This is the landing page. The user will see this 
 *    first and can select links to redirect to other pages: 
 *    Browse for friend, look for home, create pet profile, 
 *    featured pets, and get started (sign in to get an account) 
 *    page.
 ****************************************************************/
import React from 'react';
import'./Landing.css';
import cat from './images/PicPlaceholder.JPG'; //temp image path
import { 
    Link, BrowserRouter as Router, Switch, Route 
  } from 'react-router-dom';


const Landing = () => {
      
  return (
    <div className="Landing">
      
      {/* Primary Header section */}
      <h1>Welcome to our furry community</h1>
      
      {/* Klunky, but 'div style' seems to work centering text */}
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Link to={"/search/SearchFriend"}>
          <p className="paraLink">
            Browse for a furever furiend
          </p>
        </Link>
      </div>
      
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Link to={"/search/SearchHome"}>
          <p className="paraLink"> 
            Look for a furever home
          </p>       
        </Link>
      </div>
      
      {/* Pretty separation line */}
      <hr class="solid"></hr>
      
      {/* Secondary Header for shelters to generate profile */}
      <h2>Find a furever home for a furry</h2>
      
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>

        {/* Links to create new profile */}
        <Link to= {"/profile/create-new"}>
          <p className="paraLink"> 
            Create a profile for adoptable furries
          </p>         
        </Link>
      </div>
         
      <hr class="solid"></hr>

      {/* Secondary Header to Showcase Furries */}
      <h2>Featured furries</h2>

      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          
        <img src={cat}/>
      </div>
          
      <hr class="solid"></hr>

      {/* Secondary Header to give user option to join site */}
      <h2>Join our furry community on PetLinked</h2>
      
      <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Link to='./SignUp'>
            <p className="paraLink"> 
              Get Started
            </p>
          </Link>
      </div>
    </div>
  );
}

export default Landing