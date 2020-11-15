import React, { useEffect, useState } from "react";
import * as Constants from "../options/constants/animal_options";
import DropdownSelection from "../options/DropdownSelection";

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
    console.log("changeYears: " + numYears);
    setAgeYears(numYears);
    setAge(numYears * 12 + age_months);
  };

  const handleChangeMonths = (numMonths) => {
    console.log("changeMonths: " + numMonths);
    setAgeMonths(numMonths);
    setAge(age_years * 12 + numMonths);
  };

  return (
    <div>
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
          <label>Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />{" "}
          lbs
        </div>
        <div className="input-container">
          <label>Age</label>
          <input
            type="number"
            value={age_years}
            onChange={(e) => {
              // setAgeYears(e.target.value);
              handleChangeYears(e.target.value);
            }}
          />{" "}
          years
          <input
            type="number"
            value={age_months}
            onChange={(e) => {
              // setAgeMonths(e.target.value);
              handleChangeMonths(e.target.value);
            }}
          />{" "}
          months
        </div>
      </div>
    </div>
  );
};

export default Facts;
