import React, { useEffect, useState } from "react";
import "./Search.css";

import * as Constants from "../options/constants/animal_options";
import { option as SortOptions } from "../options/constants/sort_options";
import DropdownSelection from "../options/DropdownSelection";

const Filter = (props) => {
  const { user, setPets } = props;

  const [dispositionSelection, setDispositionSelection] = useState(false);
  const [breedSelection, setBreedSelection] = useState(false);
  const [typeSelection, setTypeSelection] = useState(false);
  const [colorSelction, setColorSelection] = useState(false);
  const [sortSelection, setSortSelection] = useState(0);

  useEffect(() => {
    getFilterResults();
    getOptions();
  }, [
    user,
    dispositionSelection,
    breedSelection,
    typeSelection,
    colorSelction,
    sortSelection,
  ]);

  const [options, setOptions] = useState(false);

  const getOptions = async function () {
    const promise = await fetch("/api/disposition");
    const dispositions = await promise.json();

    setOptions((prevState) => {
      var breeds = [];
      var colors = [];
      switch (typeSelection) {
        case Constants.types.cat:
          breeds = Constants.breeds.cat;
          colors = Constants.colors.cat;
          break;
        case Constants.types.dog:
          breeds = Constants.breeds.dog;
          colors = Constants.colors.dog;
          break;
        case Constants.types.other:
          breeds = Constants.breeds.other;
          colors = Constants.colors.other;
          break;
        default:
          breeds = [
            ...new Set([
              ...[].concat.apply(
                [],
                Object.values(Constants.breeds).map((val) => {
                  return val;
                })
              ),
            ]),
          ];
          colors = [
            ...new Set([
              ...[].concat.apply(
                [],
                Object.values(Constants.colors).map((val) => {
                  return val;
                })
              ),
            ]),
          ];
          break;
      }

      return {
        ...prevState,
        type: Object.values(Constants.types).map((val) => {
          return val;
        }),
        breed: breeds,
        color: colors,
        disposition: dispositions.map((data) => {
          return data.disposition;
        }),
        sort: Object.values(SortOptions).map((val) => {
          return val;
        }),
      };
    });
  };

  const clearSelection = () => {
    setDispositionSelection(false);
    setBreedSelection(false);
    setTypeSelection(false);
    setColorSelection(false);
    setSortSelection(0);
    defaultPetFetch();
  };

  const sortPets = (pets, byCreated, ascending) => {
    if (byCreated) {
      if (ascending) {
        pets.sort((a, b) =>
          a.creation_timestamp > b.creation_timestamp
            ? 1
            : a.creation_timestamp === b.creation_timestamp
            ? a.last_updated_timestamp > b.last_updated_timestamp
              ? 1
              : -1
            : -1
        );
      } else {
        pets.sort((a, b) =>
          a.creation_timestamp < b.creation_timestamp
            ? 1
            : a.creation_timestamp === b.creation_timestamp
            ? a.last_updated_timestamp < b.last_updated_timestamp
              ? 1
              : -1
            : -1
        );
      }
    } else {
      // by last updated
      if (ascending) {
        pets.sort((a, b) =>
          a.last_updated_timestamp > b.last_updated_timestamp
            ? 1
            : a.last_updated_timestamp === b.last_updated_timestamp
            ? a.creation_timestamp > b.creation_timestamp
              ? 1
              : -1
            : -1
        );
      } else {
        pets.sort((a, b) =>
          a.last_updated_timestamp < b.last_updated_timestamp
            ? 1
            : a.last_updated_timestamp === b.last_updated_timestamp
            ? a.creation_timestamp < b.creation_timestamp
              ? 1
              : -1
            : -1
        );
      }
    }

    setPets(() => pets);
  };

  const defaultPetFetch = async function () {
    const promise = await fetch("/api/pet");
    const res = await promise.json();
    // setPets(() => res);
    return res;
  };

  const fetchPetsWithFilter = async function () {
    const params = {
      disposition: encodeURIComponent(
        dispositionSelection ? dispositionSelection : ""
      ),
      breed: encodeURIComponent(breedSelection ? breedSelection : ""),
      type: encodeURIComponent(typeSelection ? typeSelection : ""),
      color: encodeURIComponent(colorSelction ? colorSelction : ""),
    };
    const fetchQuery = `/api/pet/filter?&disposition=${params.disposition}&breed=${params.breed}&type=${params.type}&color=${params.color}`;
    const promise = await fetch(fetchQuery);
    const res = await promise.json();
    return res;
  };

  const getFilterResults = async function () {
    if (!options) {
      return;
    }
    var filteredPets = {};
    if (
      !dispositionSelection &&
      !breedSelection &&
      !typeSelection &&
      !colorSelction
    ) {
      filteredPets = await defaultPetFetch();
    } else {
      filteredPets = await fetchPetsWithFilter();
    }
    sortPets(
      filteredPets,
      options.sort[sortSelection].byCreated,
      options.sort[sortSelection].ascending
    );
    return;
  };

  return (
    <div>
      <DropdownSelection
        label={"Choose Care & Behavior"}
        options={options.disposition}
        selection={dispositionSelection}
        setSelection={setDispositionSelection}
        showEmpty={true}
      />
      <DropdownSelection
        label={"Choose Type"}
        options={options.type}
        selection={typeSelection}
        setSelection={setTypeSelection}
        showEmpty={true}
      />
      <DropdownSelection
        label={"Choose Breed"}
        options={options.breed}
        selection={breedSelection}
        setSelection={setBreedSelection}
        showEmpty={true}
      />
      <DropdownSelection
        label={"Choose Color"}
        options={options.color}
        selection={colorSelction}
        setSelection={setColorSelection}
        showEmpty={true}
      />
      {/* sort by option */}
      <SortDropdownSelection
        label={"Sort by"}
        options={options.sort}
        selection={sortSelection}
        setSelection={setSortSelection}
      />
      <input type="submit" value="Clear" onClick={clearSelection} />
    </div>
  );
};

const SortDropdownSelection = (props) => {
  const { label, options, selection, setSelection } = props;

  return (
    <div className="input-container">
      <label>{label}</label>
      <select value={selection} onChange={(e) => setSelection(e.target.value)}>
        {options
          ? options.map((option, index) => (
              <option key={option.key} value={index}>
                {option.value}
              </option>
            ))
          : ""}
      </select>
    </div>
  );
};

export default Filter;
