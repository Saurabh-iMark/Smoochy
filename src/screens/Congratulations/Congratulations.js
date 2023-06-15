import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import logo from '../../assets/SVG/logo.svg';
import image1 from '../../assets/PNG/image1.png';
import image2 from '../../assets/PNG/image2.png';
import image3 from '../../assets/PNG/image3.png';


const Congratulations = () => {
  return (
    <div className="main-container">
      <div className="main-content" style={{height: '70vh'}}>
      <div className="image-row">
        <img src={image1} alt="Image 1" />
        <img src={image2} alt="Image 2" className="row-centered-image"/>
        <img src={image3} alt="Image 3" />
      </div>
      <br /> <br />
      <div className="image-container">
        <img src={logo} style={{height: '60px'}} alt="SVG Image" className="centered-image" />
      </div>

      <h2>Congratulations <br />your Smoochy account <br />is now setup<br /></h2>
      <p>Please check your email to verify your account.</p>
      <br /> <br />
        {/* <div className="spcae1">
        <Link to="/buildProfile">
          <button type="button" className="button-A">Build your Profile</button>
        </Link>
        </div> */}

        {/* <div className="spcae1">
          <Link to="/bottomTab2">
            <button className="a-button">Skip</button>
          </Link>
        </div> */}


        <div className="footer">
          <div className="spcae1">
            <Link to="/buildProfile">
              <button type="button" className="button-A">Build your Profile</button>
            </Link>
          </div>
          <div>
            <Link to="/bottomTab2">
              <button className="a-button">Skip</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Congratulations;