import React from "react";

const StateDropdown = ({ value, onChange }) => {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    // ... Ajoutez tous les États des États-Unis ici
    "Wyoming",
  ];

  return (
    <select name="state" id="state" value={value} onChange={onChange}>
      <option value="">Sélectionnez un État</option>
      {states.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
};

export default StateDropdown;
