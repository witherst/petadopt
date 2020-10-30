import React from 'react';
import'./Landing.css';
import cat from './images/PicPlaceholder.JPG'; //temp image path
import { 
  Link, BrowserRouter as Router, Switch, Route 
} from 'react-router-dom';

const Landing = () => {
  
  return (
    <div className="Landing">
      <h1>Welcome to our furry community</h1>
      <br></br>
          
        <Link to={"/search/SearchFriend"}>
          <p>Browse for a furever furiend</p>
          <br></br>
        </Link>
        
        <Link to={"/search/SearchHome"}>
          <p>Browse for a furever home</p>
          <br></br>
        </Link>

          <hr class="solid"></hr><br></br>

      <h2>Find a furever home for a furry</h2>
      <br></br>
        <Link to= './Profile'>
          <p>Create a profile for adoptable furries</p>
          <br></br>
        </Link>
        
          <hr class="solid"></hr><br></br>

      <h2>Featured furries</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          }}
        >
          <img src={cat}/></div>
          <br></br> 
          
            <br></br><hr class="solid">
              </hr><br></br>

      <h2>Join our furry community on PetLinked</h2>
      <br></br>
        <Link to='./SignUp'>
          <p>Get Started</p>
        </Link>
    </div>
    );
  }

 export default Landing