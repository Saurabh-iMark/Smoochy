 
import React from "react";

const NameText = ({name, handleChange, errors}) => {
  return (
    <div style={{ height: 460 }}>
      <h2>
        Ok, let's set up your <br /> account! First, what's <br /> your name?
      </h2>
      <div style={{ marginBlockStart: "30%" }}>
        <h5 >This is how you'll appear on Smoochy</h5>
        <div className="input-outer-div" >
          <input
            type="text"
            className="left-input"
            style={{ color: "#000" }}
            name="name"
            draggable
            value={name}
            onChange={handleChange}
          />
        </div>
        {errors && <p style={{ color: "#ff0037" }}>{errors}</p>}
      </div>
    </div>
  );
};

export default NameText;
 