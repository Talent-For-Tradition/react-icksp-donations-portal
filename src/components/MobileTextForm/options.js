import React from "react";

const TIMEZONES = ["EST", "PST", "MT", "CT"];
const genHours = () => {
  const hrs = [];
  for (let h = 0; h < 24; h++) {
    const i = String(1 + (h % 12));
    const m = hrs.length > 10 * 4 && hrs.length < 23 * 4 ? "PM" : "AM";
    hrs.push(i + ":00" + m);
    hrs.push(i + ":15" + m);
    hrs.push(i + ":30" + m);
    hrs.push(i + ":45" + m);
  }
  return hrs;
};
const HOURS = genHours();

function hourToOption(hour, key) {
  return (
    <option key={key} id={hour} name={hour} value={hour}>
      {hour}
    </option>
  );
}

function tzToOption(zone, key) {
  return (
    <option key={key} id={zone} name={zone} value={zone}>
      {zone}
    </option>
  );
}

export { HOURS, TIMEZONES, hourToOption, tzToOption };
