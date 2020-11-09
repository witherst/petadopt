import React, { useEffect, useState, Component } from 'react';
import'./Search.css';
import data from "./dataHome.json"; //Temp mock database
import homeImage from './homeImages/home2.jpg'; //temp image path


//source: modified version of
//www.golangprograms.com/search-and-filter-list-records.html
class SearchHome extends Component {
 
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    desiredType: [],
    city: [],
    preferences: [],
    dateEntered: []
  };

  render() {
    return (
      <div>
        {/* Title for page */}
        <h1>Search for Furever Home</h1>
      
        {/* Pretty line to separate search/filter from profiles */}
        <hr class="solid"></hr>

        {/* Define the map */}
        <div className="container">
          {this.state.itemsToDisplay.map(home => {
            let desiredType = home["Preferences"]
              .substring(1, home["Preferences"].length - 2)
              .split(",");

          return (
            // Displays the home data in boxes
            <div className="profile">
              <div className="profileInfo">
                &nbsp;
                <span className="city">{home["City"]}</span>
                <span className="name">{home["Name"]}</span>
                <span className="centerText"> 
                  Prefers a pet that is: 
                </span>
                
                <div className="disposition">
                  {desiredType.map(friend => {
                    let friendToShow = friend.substring( 
                      1, friend.length - 1
                    );
                      friendToShow = friendToShow.includes("'")
                      ? friendToShow.substring(
                        1, friendToShow.length
                      ) : friendToShow;

                    return (
                      <div pill className="dispoBorder" 
                                variant="light">
                                {friendToShow}
                      </div>
                      );
                    },
                  )}  
                </div>
              </div>
                  
              {/* Separation Line before image */}
              <div className="sepline"></div>

              {/* Image, date, and Age display */}
              <div className="stats">
                <div>
                  <span className="city">
                    Date Entered: {home["Date Entered"]}
                  </span>              
                  <br></br>

                  {/* Temp image placeholder */}
                  <img src={homeImage}/> 
                  {/* Will use when database is accessed */}
                  {/* {home["Image Location"]} */}
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
      this.setState({ 
        itemsToDisplay: [...this.state.itemsToUse] 
      });
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
          item["City"].toLowerCase().includes(
            event.target.value.toLowerCase()
          )
      );
      this.setState({ itemsToDisplay });
    }
  };

  // Handles choice from preferences filter
  optionSelected = () => {
    var e = document.getElementById("filter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose Any")
      this.setState({ 
        itemsToDisplay: [...this.state.itemsToUse] 
      });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(item =>
        item["Preferences"].toLowerCase().includes(
          selected.toLowerCase()
        )
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
    //reRenderList based on preferences
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
        },
      );
    }

    this.setState({ desiredType });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ 
        itemsToUse: [...this.state.itemsToDisplay] 
      });
    }); //End reRenderList by Preference
  }/*-- reRenderList --*/
} 

export default SearchHome;