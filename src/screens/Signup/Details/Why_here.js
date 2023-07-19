import React, { useState } from "react";

const Why_here = ({ setWhy_here, buttonTexts, errors }) => {
  const TextButton = ({ text, setWhy_here, setPlan }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (text) => {
      {
        setWhy_here && setWhy_here(text);
      }
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
      <h2>
        Tell people why <br /> you are here
        <br />
      </h2>
      <div>
        <h5>
          You can change this whenever you want and will show on your profile
          unless you’re unsure
        </h5>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {buttonTexts.map((text, index) => (
            <TextButton setWhy_here={setWhy_here} key={index} text={text} />
          ))}
        </div>
        {errors && <p style={{ color: "#ff0037" }}>{errors}</p>}
      </div>
    </div>
  );
};

export default Why_here;
