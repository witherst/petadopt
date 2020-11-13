import React, { useEffect, useState, Component } from "react";
import "./Search.css";
import data from "./data.json"; //Temp mock database
import cat from "./friendImages/cat4.jpg"; //temp image path

//source: modified version of
//www.golangprograms.com/search-and-filter-list-records.html
class SearchFriend extends Component {
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    type: [],
    breed: [],
    disposition: [],
    dateEntered: [],
  };

  render() {
    return (
      <div>
        {/* Title for page */}
        <h1>Search for furever Friend</h1>
        {/* Filter drop down menu(s) */}
        <div className="filter">
          {/* Filter by disposition */}
          <div>
            Choose disposition: &nbsp;
            <select id="filter" onChange={this.optionSelected}>
              <option dispoValue="any">Choose any</option>

              {this.state.disposition.map((disposition) => {
                return <option dispoValue={disposition}>{disposition}</option>;
              })}
            </select>
          </div>

          {/* Filter by Breed */}
          <div>
            Choose breed: &nbsp;
            <select id="filter" onChange={this.optionSelected}>
              <option breedValue="any">Choose any</option>

              {this.state.breed.map((breed) => {
                return <option breedValue={breed}>{breed}</option>;
              })}
            </select>
          </div>

          {/* Filter by Type */}
          <div>
            Choose type: &nbsp;
            <select id="filter" onChange={this.optionSelected}>
              <option typeValue="any">Choose any</option>

              {this.state.type.map((type) => {
                return <option typeValue={type}>{type}</option>;
              })}
            </select>
          </div>

          {/* Filter by Date */}
          <div>
            Choose date: &nbsp;
            <select id="filter" onChange={this.optionSelected}>
              <option dateValue="any">Choose any</option>

              {this.state.dateEntered.map((dateEntered) => {
                return <option dateValue={dateEntered}>{dateEntered}</option>;
              })}
            </select>
          </div>
        </div>{" "}
        {/* End className="filter" */}
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
        {/* Pretty line to separate search/filter from profiles */}
        <hr class="solid"></hr>
        {/* Define the map */}
        <div className="container">
          {/* Map for disposition */}
          {this.state.itemsToDisplay.map((pet) => {
            let dispoType = pet["Disposition"]
              .substring(1, pet["Disposition"].length - 2)
              .split(",");

            // Map for breed
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
                    {dispoType.map((friend) => {
                      let friendToShow = friend.substring(1, friend.length - 1);
                      friendToShow = friendToShow.includes("'")
                        ? friendToShow.substring(1, friendToShow.length)
                        : friendToShow;

                      return (
                        <div pill className="dispoBorder" variant="light">
                          {friendToShow}
                        </div>
                      );
                    })}
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
                    <img src={cat} />
                    {/* Will use when database is up */}
                    {/* {pet["Image Location"]} */}
                  </div>
                  <div>
                    {" "}
                    &nbsp;
                    <span className="city">Age: {pet["Age"]} </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } /*-- End Pet Container --*/

  filterOnSearch = (event) => {
    if (
      !event.target.value ||
      event.target.value === " " ||
      event.target.value === ""
    )
      this.setState({
        itemsToDisplay: [...this.state.itemsToUse],
      });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(
        (item) =>
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

  //Handles choice from Disposition filter
  optionSelected = () => {
    var e = document.getElementById("filter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose any")
      this.setState({
        itemsToDisplay: [...this.state.itemsToUse],
      });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter((item) =>
        item["Disposition"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  }; //End search filter handler

  sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "date")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else if (selected === "asc") {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function (a, b) {
        return a["Age"] - b["Age"];
      });
      this.setState({ itemsToDisplay });
    } else {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function (a, b) {
        return b["Age"] - a["Age"];
      });
      this.setState({ itemsToDisplay });
    }
  };

  componentDidMount() {
    this.reRenderList();
  }

  reRenderList() {
    var disposition = [];
    var breed = [];
    var type = [];
    var dateEntered = [];
    var itemsToDisplay = [];

    //Loop through items in DISPOSITION to display in drop-down menu
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);

      data[i]["Disposition"]
        .substring(1, data[i]["Disposition"].length - 2)
        .split(",")
        .forEach((friend) => {
          let c = friend.substring(1, friend.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;

          if (disposition.indexOf(c) < 0) {
            disposition.push(c);
          }

          data[i]["Breed"]
            .substring(0, data[i]["Breed"].length)
            .split(",")
            .forEach((petBreed) => {
              let cc = petBreed.substring(0, petBreed.length);
              cc = cc.includes("'") ? cc.substring(0, cc.length) : cc;

              if (breed.indexOf(cc) < 0) {
                breed.push(cc);
              }

              data[i]["Type"]
                .substring(0, data[i]["Type"].length)
                .split(",")
                .forEach((petType) => {
                  let ccc = petType.substring(0, petType.length);
                  ccc = ccc.includes("'") ? ccc.substring(0, ccc.length) : ccc;

                  if (type.indexOf(ccc) < 0) {
                    type.push(ccc);
                  }

                  // data[i]["date"]
                  // .substring(0, data[i]["date"].length)
                  // .split(",")
                  // .forEach(petType => {
                  //   let cd = petType.substring(0, petType.length);
                  //   cd = cd.includes("'") ? cd.substring(0, cd.length) : cd;

                  // if (dateEntered.indexOf(cd) < 0) {
                  //   dateEntered.push(cd);
                  // }
                  // })
                });
            });
        });
    }

    // Required in order to see drop down menu
    this.setState({ disposition });

    //Required for profiles to populate the page
    this.setState({ itemsToDisplay }, () => {
      this.setState({
        itemsToUse: [...this.state.itemsToDisplay],
      });
    });

    // this.setState({ breed });

    this.setState({ breed }, () => {
      this.setState({
        itemsToUse: [...this.state.itemsToDisplay],
      });
    });

    this.setState({ type });
    this.setState({ dateEntered });
  } //reRenderList
}

export default SearchFriend;
