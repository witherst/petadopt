import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Constants from "../options/constants/animal_options";

import default_pet_profile_pic from "../../images/default-photo-pet.png";

import "../../App.css";

const PetPlate = (props) => {
  const {
    petName,
    setPetName,
    petNameError,
    setPetNameError,
    location,
    setLocation,
    animalType,
    setAnimalType,
    availability,
    setAvailability,
  } = props;

  useEffect(() => {}, []);

  return (
    <div>
      <div className="profile-pic-container">
        <Link>
          <p>
            <img src={default_pet_profile_pic} />
          </p>
          <p>upload photo</p>
        </Link>
      </div>
      <div className="availability-container">
        <div className="input-container">
          <label>Availability</label>
          <select
            required
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            {Object.keys(Constants.availability_options).map((key) => (
              <option
                key={key}
                value={key}
                onChange={(e) => setAvailability(e.target.value)}
              >
                {Constants.availability_options[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="profile-badge-container">
        <div className="input-container">
          <label>Petname</label>
          <input
            type="text"
            required
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <p className="errorMessage">{petNameError}</p>
        </div>
        <div className="input-container">
          <label>Location</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Animal Type</label>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
          >
            {Object.keys(Constants.types).map((key) => (
              <option
                key={key}
                value={Constants.types[key]}
                onChange={(e) => setAnimalType(e.target.value)}
              >
                {Constants.types[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PetPlate;
