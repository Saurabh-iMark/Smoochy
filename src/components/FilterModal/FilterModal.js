
import React, {useState} from 'react';

import { IoChevronBack, IoAdd } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';

import './FilterModal.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const FilterModal = ({ isModal_Filter, onClose }) => {


  if (!isModal_Filter) {
    return null;
  }

 
  const TextButton = ({ text }) => {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleClick = () => {
      setIsSelected(!isSelected);
    };
  
    return (
      <button className="selectableButton"
      style={{ backgroundColor: isSelected ? '#733faa' : '#F4F4F4', color: isSelected ? '#ffffff' : '#733faa' }}
        // className={isSelected ? 'selectedIdentify' : '' }
        onClick={handleClick}
        unselectable="on">
        {text}
      </button>
    );
  };

  const buttonTexts = [
    'Agender',
    'Bigender',
    'Gender Fluid',
    'Gender Variant',
    'Non-Binary',
    'Transgender',
    'Transgender Man',
    'Transgender Woman',
  ];


  
  return (
    // <div className={`modal ${isOpen ? 'open' : ''}`}   style={{backgroundColor: '#fff'}}>
    <div className={`modal ${isModal_Filter ? 'open' : ''}`}  style={{backgroundColor: ''}}>
    <div className="modal-content" style={{width: '100%'}}>
      <button className="close-button" onClick={onClose}>
        <IoCloseSharp style={{color: '#333', fontSize: 30}}></IoCloseSharp>
      </button>

      <div style={{width: '90%', margin: 'auto'}}>

      <div style={{padding: 10}}>
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Location</p>
            <div className="input-outer-divModal-select">
            <select id="location" name="Bournemouth" className="left-inputModal-select">
               <option value="Indian">America</option>
               <option value="American">New York</option>
               <option value="NRI">San Diago</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Gender</p>
            <div className="input-outer-divModal-select">
            <select id="gender" name="Male" className="left-inputModal-select">
               <option value="Indian">Male</option>
               <option value="American">Female</option>
               <option value="NRI">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Nationality</p>
            <div className="input-outer-divModal-select">
            <select id="nationality" name="British" className="left-inputModal-select">
               <option value="Indian">Indian</option>
               <option value="American">American</option>
               <option value="NRI">NRI</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Interests</p>
            <div className="input-outer-divModal-select">
            <select id="ethnicity" name="White British" className="left-inputModal-select">
               <option value="Brown">Gym, Reading Foofd, Running</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Do you have children?</p>
            <div className="input-outer-divModal-select">
            <select id="ethnicity" name="White British" className="left-inputModal-select">
               <option value="Brown">Has kids</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Do you want children?</p>
            <div className="input-outer-divModal-select">
            <select id="children" name="White British" className="left-inputModal-select">
               <option value="Brown">Undecided</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal', textAlign: 'left'}}>Looking for</p>
            <div className="input-outer-divModal-select">
            <select id="looking" name="White British" className="left-inputModal-select">
               <option value="Brown">Somthing casual</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />


          
          <button className="button-C"  onClick={onClose}>Search</button>
   
      </div>
      </div>
    </div>
    </div>
  );
};

export default FilterModal;

