import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Birthdate = ({currentDate,date,month,year,setDate,setMonth,setYear,errors}) => {
  return (
    <div style={{ height: 350 }}>
      <h2>When’s your birthday?</h2>

      <div style={{ marginBlockStart: "18%" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "80px" }}>
            <h4>Day</h4>
          </div>
          <div style={{ width: "120px" }}>
            <h4>Month</h4>
          </div>
          <div style={{ width: "100px" }}>
            <h4>Year</h4>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <DatePicker
            dateFormat="dd"
            placeholderText="Day"
            className="centered-input"
            style={{ width: "80px" }}
            selected={date}
            maxDate={currentDate}
            onChange={(date) => setDate(date)}
            name="date"
          />

          <DatePicker
            showMonthYearPicker
            dateFormat="MMMM"
            placeholderText="Month"
            className="centered-input"
            style={{ width: "120px" }}
            name="month"
            // renderCustomHeader={({ date }) => <div></div>}
            selected={month}
            maxDate={currentDate}
            onChange={(date) => setMonth(date)}
          />

          <DatePicker
            showYearPicker
            dateFormat="yyyy"
            placeholderText="Year"
            className="centered-input"
            style={{ width: "100px" }}
            name="year"
            selected={year}
            maxDate={currentDate}
            onChange={(date) => {
              setYear(date);
            }}
          />
        </div>
        {errors && <p style={{ color: "#ff0037" }}>{errors}</p>}
      </div>
    </div>
  );
};

export default Birthdate;
