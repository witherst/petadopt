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
        <Link to='./Search'>
            <p>Browse for a furever furiend</p>
            </Link>
        <Link to='./Search'>
            <p>Look for a furever home</p>
            </Link>
        <hr className="solid"></hr>
        
        <Link to={"/search/SearchHome"}>
          <p>Browse for a furever home</p>
          
        </Link>

          <hr class="solid"></hr>

      <h2>Find a furever home for a furry</h2>
      
        <Link to= './Profile'>
            <p>Create a profile for adoptable furries</p>
            </Link>
        <hr className="solid"></hr>
    
        <h2>Featured furries</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          }}
        >
        <img src={cat}/></div>
        <hr className="solid"></hr>
    
        <h2>Join our furry community on PetLinked</h2>
        <Link to= './SignUp'><p>Get Started</p></Link>
    </div>
    );
  }

 export default Landing