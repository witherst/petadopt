import React, { useEffect, useState } from 'react';
import'./Gallery.css';


const SearchFriend = (props) => {
  
  return (
    <div className="SearchFriend">
      <h1>Search for furever Friend</h1>

      <div style={{
        justifyContent: "center"
        }}
        
        class="row">
        
        <div class="column">
          <img src={require('./friendImages/cat1.jpg')}></img>
          <img src={require('./friendImages/cat2.jpg')}></img>
          <img src={require('./friendImages/cat3.jpg')}></img>
          <img src={require('./friendImages/cat4.jpg')}></img>
          <img src={require('./friendImages/cat5.jpg')}></img>
        </div>

        <div class="column">
          <img src={require('./friendImages/cat6.jpg')}></img>
          <img src={require('./friendImages/cat7.jpg')}></img>
          <img src={require('./friendImages/cat8.jpg')}></img>
          <img src={require('./friendImages/cat9.jpg')}></img>
          <img src={require('./friendImages/pup1.jpg')}></img>
        </div>

        <div class="column">
          <img src={require('./friendImages/pup2.jpg')}></img>
          <img src={require('./friendImages/pup3.jpg')}></img>
          <img src={require('./friendImages/pup4.jpg')}></img>
          <img src={require('./friendImages/pup5.jpg')}></img>
          <img src={require('./friendImages/pup6.jpg')}></img>
        </div>

        <div class="column">
          <img src={require('./friendImages/pup7.jpg')}></img>
          <img src={require('./friendImages/pup8.jpg')}></img>
          <img src={require('./friendImages/pup9.jpg')}></img>
          <img src={require('./friendImages/other1.jpg')}></img>
          <img src={require('./friendImages/other2.jpg')}></img>
        </div>
      </div>
    </div>
  );
}

export default SearchFriend