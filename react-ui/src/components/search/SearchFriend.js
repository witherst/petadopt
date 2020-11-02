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

        {/* Sorting drop down menu */}
        <div className="sortfilter">
          <div>
            Sort by : &nbsp;
            <select id="sortfilter" onChange={this.sortBy}>
              <option value="date">Date Entered: Oldest to New</option>
              <option value="asc">Age: Low to High</option>
              <option value="des">Age: High to Low</option>
            </select>
          </div>
        </div>

        {/* Define the map? */}
        <div className="petcontainer">
          {this.state.itemsToDisplay.map(pet => {
            let type = pet["Disposition"]
              .substring(1, pet["Disposition"].length - 2)
              .split(",");

          return (
              // Displays the pet data in boxes
              <div className="pet">
                <div className="petinfo">
                  <i  className="fas fa-map-marker"
                      style={{ color: "orangered", fontSize: "12px" }}>
                  </i>
                  &nbsp;
                    <span className="breed">{pet["Breed"]}</span>
                      <br/>
                    <span className="petname">{pet["Name"]}</span>
        
                    <div className="pettype">
                      {type.map(friend => {
                        let friendToShow = friend.substring( 
                          1, friend.length - 1
                        );
                          friendToShow = friendToShow.includes("'")
                          ? friendToShow.substring(1, friendToShow.length)
                          : friendToShow;

                      return (
                        <div pill className="petfriend" variant="light">
                          {friendToShow}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
                  
              {/* Separation Line between disposition and image, date, & age */}
              <div className="sepline"></div>

              {/* Image, date, and Age display */}
              <div className="petstats">
                <div>
                  <i style={{ fontSize: "15px" }}
                    className="far fa-comment-alt"></i>
                    <span>Date: {pet["Date Entered"]}</span>              
                  <br></br>

                  {/* Temp image placeholder */}
                  <img src={cat}/> 
                  {/* Will use when external database is up */}
                  {/* {pet["Image Location"]} */}

                </div>
                  <div>
                    <i  style={{ fontSize: "15px" }} 
                        className="far fa-star">
                    </i>
                    &nbsp;
                    <span>Age: {pet["Age"]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } /*-- End Pet Container --*/

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
          item["Disposition"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["Breed"].toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };

  // Handles choice from Disposition filter
  optionSelected = () => {
    var e = document.getElementById("petfilter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose Any")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(item =>
        item["Disposition"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  }; /*-- End Disposition search filter handler --*/

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
    /*-- reRenderList based on Disposition --*/
    var type = [];
    var itemsToDisplay = [];

    // Loop through items
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
      data[i]["Disposition"]
        .substring(1, data[i]["Disposition"].length - 2)
        .split(",")
        .forEach(friend => {
          let c = friend.substring(1, friend.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;

          // if matches selection
          if (type.indexOf(c) < 0) {
            type.push(c);
          }
        });
    }

    this.setState({ type });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }/*-- reRenderList --*/
} 

export default SearchFriend;
