import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import BackButton from '../../components/BackButton';
import { IoChevronBack } from 'react-icons/io5';
import { BsPlus } from "react-icons/bs";

import logoIcon from '../../assets/SVG/logo icon.svg';
import masterCard from '../../assets/SVG/masterCard.svg';
import visa from '../../assets/SVG/visa.svg';
import IdentifyModal from '../../components/IdentifModal/IdentifyModal';


import { register, getData } from '../../services/authService';
import { loadStripe, StripeCardElement, useStripe } from '@stripe/stripe-js';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const UpgradeAC = () => {

  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Stripe Setting
  // const stripe = await loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');


  const [plan, setPlan] = useState('');
  const [payment, setPayment] = useState('');

 
  const buttonTexts_Plan = [
    'Free Trial (1 month)',
    '6 months (£19.99)',
    '12 months (£29.99)'
  ];




  // Why_here UI selection button
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





  return (
    <div className="main-container">
      <div className="top-progress-bar">
        <progress value={9} max={9} id="myProgress"></progress>
      </div>


{/* 
      <div className="header-back">
        <button className="back-button"  onClick={handlePreviousStep}>
          <IoChevronBack style={{fontSize: 18, color: '#733faa', marginRight: 12}}></IoChevronBack>
          <span className="back-button-text">Back</span>
        </button>
      </div>
   */}



    <div className="main-content">
      
      <form>
      
          <div  style={{height: 560}}>
            <h2>Select your plan</h2>
            <div>
              <h5>Both plans come with <br /> unlimited messaging</h5>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                  {buttonTexts_Plan.map((text, index) => (
                    <TextButton key={index} text={text} />
                  ))}
              </div>

              <div className="centered-input custom-checkbox" style={{display:'flex', alignItems:'center', justifyContent: 'center', backgroundColor: '#a5e7fe'}}> 
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center'}}>I agree to the terms & conditions&nbsp;&nbsp;
                <input
                  type="checkbox"
                 
                 />
              </label>
              </div>

            <div><br />
              <Link to="/terms">
                <button className="a-button">View Terms & Conditions</button>
              </Link>
            </div>

            </div>
          </div>
        

      
          {/* <div  style={{height: 500}}>
            <h2>Pay with card</h2>

            <div style={{marginBlockStart: '30%'}}>
              <div className="title-div">Name on card</div>
              <input type="text" placeholder="ex: Alex Smith" className="centered-input"/>

              <div className="title-div" style={{marginTop: 15}}>Card information</div>
              <div className="centered-input" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <input className="borderless-input" type="text" placeholder="1234 1234 1234 1234" />
                <div>
                  <img id="myImage"  src={masterCard} style={{height: 20}}/>&nbsp;
                  <img id="myImage"  src={visa}  style={{height: 20}}/>
                </div>
              </div>


              <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
              <input type="number" placeholder="MM/YY"  className="centered-input" style={{ width: '120px' }} />
              <input type="number" placeholder="CVC"  className="centered-input" style={{ width: '120px' }} />
              </div>
            </div>
          </div> */}





      <div className="footer">
    
        <div>
          <div className="image-container-signup">
           <img src={logoIcon} alt="SVG Image" className="centered-image" />
          </div>
          <button className="button-A"  disabled={isButtonDisabled} style={{opacity: isButtonDisabled === true ? 0.5 : 1 }}>Continue</button>
        </div>
       
        <div>
          <div className="title-div" style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>Powered by&nbsp;<span style={{fontSize: 22}}>stripe</span></div>
           <br />
           <Link to="/congratulations">
             <button className="button-C">Pay £19.99</button>
           </Link>
        </div>
      
      </div>

      </form>

    </div>
    </div>
  )

};

export default UpgradeAC;