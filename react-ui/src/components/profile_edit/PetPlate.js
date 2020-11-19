import React, { useEffect, useState } from "react";
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
    photo,
    setPhoto,
  } = props;

  const [imagePreview, setImagePreview] = useState(false);

  useEffect(() => {}, [imagePreview]);

  const handlePhotoChange = (e) => {
    const image = e.target.files[0];
    setPhoto(image);
    console.log(e.target.files[0]);

    if (!image) {
      setImagePreview(false);
      return;
    }

    // update image preview
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(image);
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById("image-select");
    fileInput.click();
  };

  return (
    <div>
      <div className="profile-pic-container">
        <div onClick={handleEditImage}>
          <img src={imagePreview ? imagePreview : default_pet_profile_pic} />
          <input
            type="file"
            id="image-select"
            onChange={handlePhotoChange}
            accept="image/*"
            hidden="hidden"
          />
          <a htmlFor="input">Edit profile pic</a>
        </div>
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
