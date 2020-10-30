import React, { useEffect, useState } from 'react';
import'./Gallery.css';

const SearchHome = (props) => {
  
  return (
    <div className="SearchHome">
      <h1>Search for furever Friend</h1>

      <div style={{
        justifyContent: "center"
        }}
        
        class="row">
        
        <div class="column">
          <img src={require('./homeImages/home1.jpg')}></img>
          <img src={require('./homeImages/home2.jpg')}></img>
          <img src={require('./homeImages/home3.jpg')}></img>
          <img src={require('./homeImages/home4.jpg')}></img>
          <img src={require('./homeImages/home5.jpg')}></img>
        </div>

        <div class="column">
          <img src={require('./homeImages/home6.jpg')}></img>
          <img src={require('./homeImages/home7.jpg')}></img>
          <img src={require('./homeImages/home8.jpg')}></img>
          <img src={require('./homeImages/home9.jpg')}></img>
          <img src={require('./homeImages/home10.jpg')}></img>
        </div>

        <div class="column">
          <img src={require('./homeImages/home11.jpg')}></img>
          <img src={require('./homeImages/home12.jpg')}></img>
          <img src={require('./homeImages/home13.jpg')}></img>
          <img src={require('./homeImages/home14.jpg')}></img>
          <img src={require('./homeImages/home15.jpg')}></img>
        </div>

        <div class="column">
          <img src={require('./homeImages/home16.jpg')}></img>
          <img src={require('./homeImages/home1.jpg')}></img>
          <img src={require('./homeImages/home2.jpg')}></img>
          <img src={require('./homeImages/home3.jpg')}></img>
          <img src={require('./homeImages/home4.jpg')}></img>
          {/* <img src={require('./homeImages/home17.jpg')}></img>
          <img src={require('./homeImages/home18.jpg')}></img>
          <img src={require('./homeImages/home19.jpg')}></img>
          <img src={require('./homeImages/home20.jpg')}></img> */}
        </div>
      </div>
    </div>
  );
}

export default SearchHome