import React, { useEffect } from "react";

const DropdownSelection = (props) => {
  const {
    label,
    options,
    selection,
    setSelection,
    showEmpty,
    onChange,
  } = props;

  const handleChange = (e) => {
    const currSelection = e.target.value;
    setSelection(currSelection);
    onChange(currSelection);
  };

  useEffect(() => {}, [selection]);

  return (
    <div className="input-container">
      <label>{label}</label>
      <select
        value={selection}
        onChange={(e) => {
          setSelection(e.target.value);
          handleChange(e);
        }}
      >
        {showEmpty ? <option key={0} value={""}></option> : ""}
        {options
          ? options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          : ""}
      </select>
    </div>
  );
};

export default DropdownSelection;
