import React from "react";
import IdentifyModal from "../../../components/IdentifModal/IdentifyModal";

const Gender = ({gender,setGender,openModalIdentify, isModal_Identify, closeModalIdentify, errors}) => {
  return (
    <div style={{ height: 350 }}>
      <h2>How do you identify?</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBlockStart: "18%",
          marginBlockEnd: 20,
        }}
      >
        <button
          onClick={() => setGender("male")}
          className="selectableButton"
          style={{
            backgroundColor: gender==='male' ? "#733faa" : "#ffffff",
            color: gender==='male' ? "#ffffff" : "#733faa",
          }}
        >
          Male
        </button>
        <button
          onClick={() => setGender("female")}
          className="selectableButton"
          style={{
            backgroundColor: gender='female' ? "#733faa" : "#ffffff",
            color: gender='female' ? "#ffffff" : "#733faa",
          }}
        >
          Female
        </button>
      </div>
      {errors && <p style={{ color: "#ff0037" }}>{errors}</p>}

      <div className="spcae1">
        <button onClick={openModalIdentify} className="a-button">
          Another Gender
        </button>
      </div>

      <IdentifyModal
        isModal_Identify={isModal_Identify}
        setGender={setGender}
        onClose={closeModalIdentify}
      />
    </div>
  );
};

export default Gender;
