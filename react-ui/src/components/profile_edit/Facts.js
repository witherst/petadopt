import React, { useEffect, useState } from "react";
import * as Constants from "../options/constants/animal_options";
import DropdownSelection from "../options/DropdownSelection";
import "./styles/facts-styles.css";

const Facts = (props) => {
  const {
    animalType,
    breed,
    setBreed,
    color,
    setColor,
    setAge,
    size,
    setSize,
    weight,
    setWeight,
    sex,
    setSex,
  } = props;

  // default cat options
  const [options, setOptions] = useState(() => {
    return {
      size: Constants.sizes,
      type: Constants.breeds[animalType],
      breed: Constants.breeds[animalType],
      color: Constants.colors[animalType],
      sex: Constants.sexes,
    };
  });

  const [age_years, setAgeYears] = useState("");
  const [age_months, setAgeMonths] = useState("");

  useEffect(() => {
    getOptions();
  }, [animalType]);

  const getOptions = () => {
    switch (animalType) {
      case Constants.types.cat:
      case Constants.types.dog:
      case Constants.types.other:
        options.type = Constants.types[animalType];
        options.breed = Constants.breeds[animalType];
        options.color = Constants.colors[animalType];
      default:
        setOptions((prevState) => {
          return { ...prevState, options };
        });
        break;
    }
  };

  const handleChangeYears = (numYears) => {
    var age = 0;
    age += parseInt(numYears) ? parseInt(numYears) * 12 : 0;
    age += parseInt(age_months) ? parseInt(age_months) : 0;

    setAgeYears(numYears);
    setAge(age);
  };

  const handleChangeMonths = (numMonths) => {
    var age = 0;
    age += parseInt(age_years) ? parseInt(age_years) * 12 : 0;
    age += parseInt(numMonths) ? parseInt(numMonths) : 0;

    setAgeMonths(numMonths);
    setAge(age);
  };

  return (
    <div className="create-facts-container">
      <h1>Facts</h1>
      <div className="body-container">
        <DropdownSelection
          label={"Breed"}
          options={options.breed}
          selection={breed}
          setSelection={setBreed}
          showEmpty={true}
        />
        <DropdownSelection
          label={"Color"}
          options={options.color}
          selection={color}
          setSelection={setColor}
          showEmpty={true}
        />
        <DropdownSelection
          label={"Sex"}
          options={options.sex}
          selection={sex}
          setSelection={setSex}
          showEmpty={true}
        />
        <DropdownSelection
          label={"Size"}
          options={options.size}
          selection={size}
          setSelection={setSize}
          showEmpty={true}
        />
        <div className="input-container">
          <label>Weight (lbs)</label>
          <input
            type="number"
            value={weight}
            placeholder="lbs"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Age</label>
          <div className="age-input-container">
            <input
              type="number"
              value={age_years}
              placeholder="years"
              onChange={(e) => {
                handleChangeYears(e.target.value);
              }}
              className="profile-edit-age-input"
            />
            <input
              type="number"
              value={age_months}
              placeholder="months"
              onChange={(e) => {
                // setAgeMonths(e.target.value);
                handleChangeMonths(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facts;
