import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import BackButton from '../../components/BackButton';
import { IoChevronBack, IoAdd } from 'react-icons/io5';

import logoIcon from '../../assets/SVG/logo icon.svg';
import masterCard from '../../assets/SVG/masterCard.svg';
import visa from '../../assets/SVG/visa.svg';
import IdentifyModal from '../../components/IdentifModal/IdentifyModal';


import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const BuildProfile = () => {

  // const history = useHistory();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [photo, setPhoto] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any necessary form validation or submission logic
    // For simplicity, we'll just log the form data to the console
    console.log({
      name,
      age,
      dob,
      city,
      photo,
    });

    // Redirect to a success page or any other desired location
    // history.push('/success');
  };



  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file here
    console.log('Selected file:', file);
  };



  const [selectedButton, setSelectedButton] = useState(null);

  const [button1Selected, setButton1Selected] = useState(false);
  const [button2Selected, setButton2Selected] = useState(false);

  const handleButton1Click = () => {
    setButton1Selected(!button1Selected);
    setButton2Selected(false);
  };

  const handleButton2Click = () => {
    setButton2Selected(!button2Selected);
    setButton1Selected(false);
  };



  const [isModal_Identify, setIsModal_Identify] = useState(false);
  const openModalIdentify = () => {
    setIsModal_Identify(true);
  };

  const closeModalIdentify = () => {
    setIsModal_Identify(false);
  };



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


  const TextChip = ({ text }) => {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleClick = () => {
      setIsSelected(!isSelected);
    };
  
    return (
      <button className="selectableChipButton"
      style={{ backgroundColor: isSelected ? '#733faa' : '#F4F4F4', color: isSelected ? '#ffffff' : '#733faa' }}
        // className={isSelected ? 'selectedIdentify' : '' }
        onClick={handleClick}
        unselectable="on">
        {text}
      </button>
    );
  };



  const buttonTexts_Education = [
    'Sixth form',
    'Technical college',
    'I’m an undergrad',
    'Undergraduate degree',
    'I’m a postgraduate',
    'Postgraduate degree'
  ];


  const buttonTexts_HaveChildren = [
    'Want someday',
    'Don’t want',
    'Have & want more',
    'Have & don’t want more',
    'Not sure yet'
  ];


  const buttonTexts_EyeColour = [
    'Amber',
    'Blue',
    'Brown',
    'Grey',
    'Green',
    'Hazel'
  ];


  const buttonTexts_BodyType = [
    'Prefer not to say',
    'Thin',
    'Athletic',
    'Average',
    'A few extra pounds'    
  ];


  const buttonTexts_Smoke = [
    'Socially',
    'Never',
    'Regularly'
  ];


  const buttonTexts_Drink = [
    'Frequently',
    'Socially',
    'Rarely',
    'Never',
    'Sober'
  ];


  const buttonTexts_Creativity = [
    'Art',
    'Photography',
    'Design',
    'Dancing',
    'Singing',
    'Crafts',
    'Writing',
    'Knitting',
    'Making videos',
  ];


  const buttonTexts_Sports = [
    'Badminton',
    'Yoga',
    'Gym',
    'Tennis',
    'Running',
    'Football',
    'Golf',
    'Cricket',
    'Basketball'
  ];


  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  return (
    <div className="main-container">
      <div className="top-progress-bar">
        <progress value={step} max={12} id="myProgress"></progress>
      </div>


      {step === 1 && (
      <div className="header-back">
        <Link to="/congratulations">
        <button className="back-button">
          <IoChevronBack style={{fontSize: 18, color: '#733faa', marginRight: 12}}></IoChevronBack>
          <span className="back-button-text">Back</span>
        </button>
        </Link>
      </div>
      )}

      {step > 1 && (
      <div className="header-back">
        <button className="back-button"  onClick={handlePreviousStep}>
          <IoChevronBack style={{fontSize: 18, color: '#733faa', marginRight: 12}}></IoChevronBack>
          <span className="back-button-text">Back</span>
        </button>
      </div>
      )}



    <div className="main-content">
      
      <form onSubmit={handleFormSubmit}>
        {step === 1 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your Nationality?</h2>
            <div style={{marginBlockStart: '30%'}}>
            <div className="input-outer-div-select">
            <select id="nationality" name="British" className="left-input-select">
               <option value="Indian">Male</option>
               <option value="American">Female</option>
               <option value="NRI">Other</option>
            </select>
            </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your Ethnicity?</h2>
            <div style={{marginBlockStart: '30%'}}>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British"  className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your education?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                {buttonTexts_Education.map((text, index) => (
                  <TextButton key={index} text={text} />
                ))}
              </div>

            </div>
          </div>
        )}
        {step === 4 && (
          <div style={{marginBottom: '30%'}}>
          <h2>Would you like to <br /> have children?</h2>
          <div style={{marginBlockStart: '20%'}}>
            <div style={{display: 'flex',flexDirection: 'column'}}> 
              {buttonTexts_HaveChildren.map((text, index) => (
                <TextButton key={index} text={text} />
              ))}
            </div>

          </div>
        </div>
        )}
        {step === 5 && (
          <div style={{height: 300}}>
            <h2>How tall are you?</h2>

            <input type="text" value={sliderValue} className="centered-input" readOnly />
            <br />
            <div style={{padding: '0px 10px'}}>
            <Slider defaultValue={sliderValue} aria-label="Default" valueLabelDisplay="auto" onChange={handleSliderChange} />
            </div>

            {/* <div className="slidecontainer">
             <input type={'range'} min={'1'} max={'100'} value={'20'} className="slider" id="myRange">
           </div> */}

            {/* <div>
              <h5>You can change this whenever you want and will show on your profile unless you’re unsure</h5>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                {buttonTexts.map((text, index) => (
                  <TextButton key={index} text={text} />
                ))}
              </div>

            </div> */}
          </div>
        )}
        {step === 6 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your <br /> eye colour?</h2>
            <div style={{marginBlockStart: '15%'}}>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                {buttonTexts_EyeColour.map((text, index) => (
                  <TextButton key={index} text={text} />
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 7 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your <br /> Body type?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                {buttonTexts_BodyType.map((text, index) => (
                  <TextButton key={index} text={text} />
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 8 && (
          <div style={{marginBottom: '30%'}}>
            <h2>Do you smoke?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                {buttonTexts_Smoke.map((text, index) => (
                  <TextButton key={index} text={text} />
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 9 && (
          <div style={{marginBottom: '30%'}}>
            <h2>Do you drink?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                {buttonTexts_Drink.map((text, index) => (
                  <TextButton key={index} text={text} />
                ))}
              </div>
  
            </div>
          </div>
        )}



        {step === 10 && (
          <div style={{marginBottom: '45%'}}>
            <h2>Things you love</h2>
            <div style={{marginBlockStart: '20%'}}>
              <h4>Creativity</h4>
              <div className="chip-container"> 
                {buttonTexts_Creativity.map((text, index) => (
                  <TextChip key={index} text={text} />
                ))}
              </div>
              <br />
              <h4>Sports</h4>
              <div className="chip-container"> 
                {buttonTexts_Sports.map((text, index) => (
                  <TextChip key={index} text={text} />
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 11 && (
          <div style={{marginBottom: '30%'}}>
            <div>
            <h2>Where do you like to <br /> go on a night out?</h2>

            <div className="input-outer-div-select">
            <select id="nightOut" name="Cinema" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
  
            <br /><br /><br />
            <h2>What do you like to <br /> do on a night in?</h2>
            <div className="input-outer-div-select">
            <select id="nightIn" name="Takeaway" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>

            </div>
          </div>
        )}
        {step === 12 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your type <br /> of personality?</h2>
            <div className="input-outer-div-select">
            <select id="typePersonality" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
            <br /> <br />


            <h2>Tell us about yourself</h2>
            <div className="textarea-container">
              <textarea className="centered-input" rows="12" cols="500"></textarea>
            </div>
       
          </div>
        )}
      </form>




      <div className="footer">
        {step !==  12 ? (
          <div>
          <div className="spcae1">
              <button type="button" className="button-A" onClick={handleNextStep}>Continue</button>
          </div>
          <div>
              <button className="a-button" onClick={handleNextStep}>Skip</button>
          </div>
          </div>
        ) : (
          <div>
          <div className="spcae1">
            <Link to="/bottomTab2">
              <button type="button" className="button-A">Continue</button>
            </Link>
          </div>
          <div>
            <Link to="/bottomTab2">
              <button className="a-button">Skip</button>
            </Link>
          </div>
          </div>
        )}



      </div>

    </div>
    </div>
  )

};

export default BuildProfile;