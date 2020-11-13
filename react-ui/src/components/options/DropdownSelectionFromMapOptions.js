import React from "react";

const DropdownSelectionFromMapOptions = (props) => {
  const { label, options, selection, setSelection, showEmpty } = props;

  return (
    <div className="input-container">
      <label>{label}</label>
      <select value={selection} onChange={(e) => setSelection(e.target.value)}>
        {showEmpty ? (
          <option value={0} onChange={(e) => setSelection(e.target.value)} />
        ) : (
          ""
        )}
        {options
          ? Object.keys(options).map((key) => (
              <option
                key={key}
                value={key}
                onChange={(e) => setSelection(e.target.value)}
              >
                {options[key]}
              </option>
            ))
          : ""}
      </select>
    </div>
  );
};

export default DropdownSelectionFromMapOptions;
