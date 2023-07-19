import React from "react";
import { BsPlus } from "react-icons/bs";

const Addimage = ({handleButtonClick1,handleFileSelected1,fileInputRef1,image,errors}) => {
  return (
    <div style={{ height: 460 }}>
      <h2>Add your first photo</h2>
      <div
        className="file-Selected item2"
        onClick={handleButtonClick1}
        style={{
          marginBlockStart: "18%",
          backgroundImage: `url(${image})`,
        }}
      >
        <div>{!image ? <BsPlus style={{ fontSize: 25 }} /> : <></>}</div>
        <input
          type="file"
          name="file"
          style={{ display: "none" }}
          ref={fileInputRef1}
          onChange={handleFileSelected1}
        />
      </div>
      {errors && <p style={{ color: "#ff0037" }}>{errors}</p>}
    </div>
  );
};

export default Addimage;
