import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import { getYear, getMonth } from "date-fns";
import range from "lodash/range";

export default function DatePickers({ label, selected, onChange, showMonthYearPicker }) {
    const years = range(1950, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  return (
    <div className="date-picker-wrapper">
      <label>{label}</label>
      <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={(e) => { e.preventDefault(); decreaseMonth(); }} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={(e) => { e.preventDefault(); increaseMonth(); }} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={selected}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
    />
      {/* <DatePicker
        selected={selected}
        onChange={onChange}
        
        // showMonthYearPicker={showMonthYearPicker}
        locale= {fr}
        // peekNextMonth
        // showYearDropdown
        // showDayDropdown
        dropdownMode="select"
      /> */}
    </div>
  );
}



