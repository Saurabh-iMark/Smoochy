
import React, { useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import logo from './../assets/SVG/logo.svg';

import { IoSettings, IoEyeSharp } from 'react-icons/io5';
import { CiSliderHorizontal } from "react-icons/ci";

import FilterModal from './FilterModal/FilterModal';


const TopHeader = ({ }) => {
  
  const [isModal_Filter, setIsModal_Filter] = useState(false);
  const openModalFilter = () => {
    setIsModal_Filter(true);
  };

  const closeModalFilter = () => {
    setIsModal_Filter(false);
  };




  return (
    <>
    <header style={{ backgroundColor: '#4bd0fd', height: '9.5vh', position: 'fixed', top: 0, width: 400, margin: 'auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center', height: 80}}>

        <Link to="/settings">
        <IoSettings style={{fontSize: 30, color: '#733faa', cursor: 'pointer'}} to="/notifications"></IoSettings>
        </Link>

        <Link to="/bottomTab2">
        <img src={logo} alt="SVG Image" />
        </Link>

        
        <CiSliderHorizontal onClick={openModalFilter} style={{fontSize: 30, color: '#733faa', cursor: 'pointer'}}></CiSliderHorizontal>
     
      </div>
    </header>
    <FilterModal isModal_Filter={isModal_Filter} onClose={closeModalFilter}></FilterModal>
    </>
  );
};

export default TopHeader;

