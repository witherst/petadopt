import React from "react";

const DropdownSelection = (props) => {
  const { label, options, selection, setSelection, showEmpty } = props;

  return (
    <div className="input-container">
      <label>{label}</label>
      <select value={selection} onChange={(e) => setSelection(e.target.value)}>
        {showEmpty ? <option key={0} value={""}></option> : ""}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelection;
