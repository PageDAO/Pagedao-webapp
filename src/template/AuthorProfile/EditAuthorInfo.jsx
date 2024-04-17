import React from "react";
import { useState } from "react";
import "./../../assets/styles.css";
import myImage from "./../../assets/camera.png";
import TopNav from "../Layout/TopNav";
import Footer from "../Layout/Footer";
function TextAreaComponent({
  background = "#acacacbd",
  rows = 1,
  cols = 80,
  color = "black",
}) {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };
  const handleBlur = () => {
    setIsActive(false);
  };
  return (
    <textarea
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        resize: "none",
        color: isActive ? color : "black",
        background: "#AAAAAA",
        border: isActive ? "1px solid #969696" : "1px solid #E6E6E6",
        outline: "none",
        padding: "2px 4px",
      }}
      cols={cols}
      rows={rows}
    />
  );
}
function EditAuthorInfo() {
  const [imageSrc, setImageSrc] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xsHHqr5551kwVFOVf2as-TJgI7ubChhjsg_ZOMk1hg&s"
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setImageSrc(imageUrl);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
    <TopNav/>
    <div className="workspace">
      <div className="container mx-auto">
        <button className="text-medium">Back</button>
        <p className="font-semibold font-['DM Sans'] leading-tight mt-5 text-large">
          edit your profile
        </p>
        <h1 className="font-normal font-['DM Sans'] leading-tight mt-10 mb-2 text-medium">
          Name
        </h1>
        <TextAreaComponent />
        <h1 className="font-normal font-['DM Sans'] leading-tight mt-10 mb-2 text-medium">
          Bio
        </h1>
        <TextAreaComponent rows="7" />
        <h1 className="font-normal font-['DM Sans'] leading-tight mt-2 mb-2 text-medium">
          1000 max.c
        </h1>
        <h1 className="font-normal font-['DM Sans'] leading-tight mt-7 mb-2 text-medium">
          profile icon
        </h1>
        <div className="img-thumbnail img-circle">
          <img src={imageSrc} className="img-circle"/>
          <div className="image-upload container overlay">
            <label htmlFor="file-input">
              <img  src={myImage}  />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <h1 className="font-normal font-['DM Sans'] leading-tight mt-10 mb-2 text-medium">
          Website
        </h1>
        <TextAreaComponent />
        <h1 className="font-normal font-['DM Sans'] leading-tight mt-10 mb-2 text-medium">
          Social link
        </h1>
        <TextAreaComponent />
        <div>
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-7 mt-10 rounded text-medium">
            Save
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
export default EditAuthorInfo;
