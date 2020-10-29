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

          return (
              // Displays the furever data in boxes
              <div className="furever">
                <div className="fureverinfo">
                  <i  className="fas fa-map-marker"
                      style={{ color: "orangered", fontSize: "12px" }}>
                  </i>
                  &nbsp;
                    <span className="city">{furever["City"]}</span>
                      <br/>
                    <span className="furevername">{furever["Name"]}</span>
                    <br/>
                    <span> Is looking for a pet that is: </span>
                    <div className="fureverhomes">
                      {desiredType.map(friend => {
                        let friendToShow = friend.substring( 
                          1, friend.length - 1
                        );
                          friendToShow = friendToShow.includes("'")
                          ? friendToShow.substring(1, friendToShow.length)
                          : friendToShow;

                      return (
                        <div pill className="fureverprefs" variant="light">
                          {friendToShow}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
                  
              {/* Separation Line between preferences and image, date, & age */}
              <div className="sepline"></div>

              {/* Image, date, and Age display */}
              <div className="fureverstats">
                <div>
                  <i style={{ fontSize: "15px" }}
                    className="far fa-comment-alt"></i>
                    <span>Date Entered: {furever["Date Entered"]}</span>              
                  <br></br>

                  {/* Temp image placeholder */}
                  <img src={home}/> 
                  {/* Will use when external database is accessed */}
                  {/* {furever["Image Location"]} */}

                </div>
                  <div>
                    <i  style={{ fontSize: "15px" }} 
                        className="far fa-star">
                    </i>
                    &nbsp;
                    <span>Desired Age: {furever["Age"]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } /*-- End Homes Container --*/

  filterOnSearch = event => {
    if (
      !event.target.value ||
      event.target.value === " " ||
      event.target.value === ""
    )
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(
        item =>
          item["Name"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["Preferences"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["City"].toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };

  // Handles choice from preferences filter
  optionSelected = () => {
    var e = document.getElementById("fureverfilter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose Any")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(item =>
        item["Preferences"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  }; /*-- End preferences search filter handler --*/

  sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "date")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else if (selected === "asc") {
      let itemsToDisplay = [...this.state.itemsToDisplay];
        itemsToDisplay.sort(function(a, b) {
          return a["Age"] - b["Age"];
        });
      this.setState({ itemsToDisplay });
    } else {
      let itemsToDisplay = [...this.state.itemsToDisplay];
        itemsToDisplay.sort(function(a, b) {
          return b["Age"] - a["Age"];
        });
      this.setState({ itemsToDisplay });
    }
  };

  componentDidMount() {
    this.reRenderList();
  }

  reRenderList() {
    /*-- reRenderList based on preferences --*/
    var desiredType = [];
    var itemsToDisplay = [];

    // Loop through items
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
      data[i]["Preferences"]
        .substring(1, data[i]["Preferences"].length - 2)
        .split(",")
        .forEach(friend => {
          let c = friend.substring(1, friend.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;

          // if matches selection
          if (desiredType.indexOf(c) < 0) {
            desiredType.push(c);
          }
        });
    }

    this.setState({ desiredType });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }/*-- reRenderList --*/
} 

export default SearchHome;
