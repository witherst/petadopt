import React from 'react';
import'./Landing.css';

import BrowsePublic from './BrowsePublic';
import BrowseShelter from './BrowseShelter';

import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Landing() {
    return (
    <div className="Landing">
        <h1>Welcome to our furry community</h1>
        <Link to='./BrowsePublic'><p>Browse for a furever furiend</p></Link>
        <Link to='./BrowseShelter'><p>Look for a furever home</p></Link>
        <hr class="solid"></hr>
        
        <h2>Find a furever home for a furry</h2>
        <Link to= './Profile'><p>Create a profile for adoptable furries</p></Link>
        <hr class="solid"></hr>
    
        <h2>Featured furries</h2><p>Placeholder for pics of furries</p>
        <hr class="solid"></hr>
    
        <h2>Join our furry community on PetLinked</h2>
        <Link to= './SignUp'><p>Get Started</p></Link>
    </div>
    );
}

 export default Landing