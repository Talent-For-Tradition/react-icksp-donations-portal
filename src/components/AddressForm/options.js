import React from 'react';
import StatesList from "./statesList";


function StateToOption({ name, abbreviation, key }) {
  return (
    <option key={key} value={abbreviation}>
      {name}
    </option>
  );
}

const STATES = StatesList.map(({ name, abbreviation }, idx) =>
              StateToOption({ name, abbreviation, key: idx })
            )
export { STATES }