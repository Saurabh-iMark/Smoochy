
import React, {useState} from 'react';

import { IoChevronBack, IoAdd } from 'react-icons/io5';

import './IdentifyModal.css';



const IdentifyModal = ({ isModal_Identify, onClose }) => {


  if (!isModal_Identify) {
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
    <div className={`modal ${isModal_Identify ? 'open' : ''}`}  style={{backgroundColor: ''}}>
    <div className="modal-content" style={{width: '100%'}}>
      <div className="header-back">
        <button className="back-button" onClick={onClose}>
          <IoChevronBack style={{fontSize: 18, color: '#733faa', marginRight: 12}}></IoChevronBack>
          <span className="back-button-text">Back</span>
        </button>
      </div>


      <div className="main-container">
        <div className="main-content">
        <h2>How do you identify?</h2>

          <div style={{display: 'flex',flexDirection: 'column'}}> 
            {buttonTexts.map((text, index) => (
              <TextButton key={index} text={text} />
            ))}
          </div>

          <div style={{marginBlockEnd: 40}}>
            <h5>Tell us if we’re missing something > </h5>
          </div>
   
          <div className="footer">
            <button className="button-A" onClick={onClose}>Save and Close</button>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default IdentifyModal;

