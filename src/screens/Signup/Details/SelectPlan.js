import React, { useState } from "react";
import { Link } from "react-router-dom";




const SelectPlan = ({ setPlan, isChecked, handleCheckboxChange,buttonTexts_Plan }) => {
  

  const TextButton = ({ text, setWhy_here, setPlan }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (text) => {
       
      {
        setPlan && setPlan(text);
      }
      setIsSelected(!isSelected);
    };

    return (
      <button
        className="selectableButton"
        style={{
          backgroundColor: isSelected ? "#733faa" : "#F4F4F4",
          color: isSelected ? "#ffffff" : "#733faa",
        }}
        // className={isSelected ? 'selectedIdentify' : '' }
        onClick={() => handleClick(text)}
        // unselectable="on"
      >
        {text}
      </button>
    );
  };
  return (
    <div style={{ height: 560 }}>
      <h2>Select your plan</h2>
      <div>
        <h5>
          Both plans come with <br /> unlimited messaging
        </h5>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {buttonTexts_Plan.map((text, index) => (
            <TextButton setPlan={setPlan} key={index} text={text} />
          ))}
        </div>

        <div
          className="centered-input custom-checkbox"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#a5e7fe",
          }}
        >
          <label
            style={{
              color: "#733faa",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            I agree to the terms & conditions&nbsp;&nbsp;
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>

        <div>
          <br />
          <Link to="/terms">
            <button className="a-button">View Terms & Conditions</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
