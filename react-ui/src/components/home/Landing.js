import React from 'react';
import'./Landing.css';
import cat from './images/PicPlaceholder.JPG'; //temp image path
import { 
  Link, BrowserRouter as Router, Switch, Route 
} from 'react-router-dom';

const Landing = () => {
  //Event handler

  /* TODO */

  function getSearch(value) {
    console.log(`${value}`);
    }

  // Using buttons to pass value to "search" page  
  return (
    <div className="Landing">
      <h1>Welcome to our furry community</h1>
      
          <p>Browse for a furever furiend
          <Link to={"/search/SearchFriend"}> 
            <button onClick={() => getSearch('findFriend')}>
            {">"} </button>
          </Link>
          </p>
        
          <p>Browse for a furever home
          <Link to={"/search/SearchHome"}> 
            <button onClick={() => getSearch('findHome')}>
            {">"} </button>
          </Link>
          </p>

          <hr class="solid"></hr>

      <h2>Find a furever home for a furry</h2>
        <Link to= './Profile'>
          <p>Create a profile for adoptable furries</p>
        </Link>
        
          <hr class="solid"></hr>
      <h2>Featured furries</h2>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={cat}/></div> 
            <hr class="solid"></hr>
      <h2>Join our furry community on PetLinked</h2>
        <Link to='./SignUp'>
          <p>Get Started</p>
        </Link>
    </div>
    );
  }

 export default Landing