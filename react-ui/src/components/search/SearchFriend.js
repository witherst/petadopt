import React, { useEffect, useState, Component } from 'react';
import'./Search.css';
import data from "./data.json"; //Temp mock database
import cat from './friendImages/cat4.jpg'; //temp image path


//source: modified version of
//www.golangprograms.com/search-and-filter-list-records.html
class SearchFriend extends Component {
 
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    type: [],
    breed: [],
    disposition: [],
    dateEntered: []
  };

  render() {
    return (
      <div>
        {/* Title for page */}
        <h1>Search for furever Friend</h1>
        
        {/* Filter drop down menu(s) */}        
        <div className="filter">
          <div>
            Choose disposition: &nbsp;
              <select id="filter" onChange={this.optionSelected}>
                <option dispoValue="disposition">
                  Choose disposition
                </option>

                {this.state.disposition.map(
                  disposition => {
                    return <option dispoValue={disposition}>
                      {disposition}
                    </option>;
                  },
                )}
              </select>
          </div>
          
          {/* TODO Filter by Breed */}
          <div>
            Choose breed: &nbsp;
              <select id="filter" onChange={this.optionSelected}>
                <option breedValue="anyBreed">
                  Choose Breed
                </option>
                
                {this.state.breed.map(
                  breed => {
                    return <option breedValue={breed}>
                      {breed}
                    </option>;
                  },
                )}
              </select>
            </div>
        </div> {/* End className="filter" */}
        
        {/* Pretty line to separate search/filter from profiles */}
        <hr class="solid"></hr>
        
        {/* Define the map? */}
        <div className="container">
          {/* Map for disposition */}
          {this.state.itemsToDisplay.map(pet => {
            let dispoType = pet["Disposition"]
              .substring(1, pet["Disposition"].length - 2)
              .split(",");

          {/* Map for Breed */}
            let breedType = pet["Breed"]
              .substring(1, pet["Breed"].length - 2)
              .split(",");

          return (
            // Displays the pet data in boxes
            <div className="profile">
              <div className="profileInfo">
                &nbsp;
                <span className="breed">{pet["Breed"]}</span>
                <span className="name">{pet["Name"]}</span>
    
                <div className="disposition">
                  {dispoType.map(friend => {
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
                    Date Entered: {pet["Date Entered"]}
                  </span>              
                  <br></br>

                  {/* Temp image placeholder */}
                  <img src={cat}/> 
                  {/* Will use when database is up */}
                  {/* {pet["Image Location"]} */}
                </div>
                  <div> &nbsp; 
                    <span className="city">
                      Age: {pet["Age"]} </span></div>
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
          item["Disposition"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["Breed"].toLowerCase().includes(
            event.target.value.toLowerCase()
          )
      );
      this.setState({ itemsToDisplay });
    }
  };

  //Handles choice from Disposition filter
  optionSelected = () => {
    var e = document.getElementById("filter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose disposition")
      this.setState({ 
        itemsToDisplay: [...this.state.itemsToUse] 
      });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(item =>
        item["Disposition"].toLowerCase().includes(
          selected.toLowerCase()
        )
      );
    this.setState({ itemsToDisplay });
    }
  }; //End Disposition search filter handler

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
    //reRenderList based on Disposition
    var disposition = [];
    var itemsToDisplay = [];

    //Loop through items
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
      data[i]["Disposition"]
        .substring(1, data[i]["Disposition"].length - 2)
        .split(",")
        .forEach(friend => {
          let c = friend.substring(1, friend.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;

          //if matches selection
          if (disposition.indexOf(c) < 0) {
            disposition.push(c);
          }
        },
      );
    }

    this.setState({ disposition });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ 
        itemsToUse: [...this.state.itemsToDisplay] 
      });
    }); //End reRenderList by Disposition
  } //reRenderList
} 

export default SearchFriend;