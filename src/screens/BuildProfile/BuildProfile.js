import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import BackButton from '../../components/BackButton';
import { IoChevronBack, IoAdd } from 'react-icons/io5';

import logoIcon from '../../assets/SVG/logo icon.svg';
import masterCard from '../../assets/SVG/masterCard.svg';
import visa from '../../assets/SVG/visa.svg';
import IdentifyModal from '../../components/IdentifModal/IdentifyModal';

import { getData, postFormData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';
import { showToast } from '../../services/toastService';

import Slider from '@mui/material/Slider';

import education_json from '../../data/education.json';
import have_children_json from '../../data/have_children.json';
import eye_colour_json from '../../data/eye_colour.json';
import body_type_json from '../../data/body_type.json';
import smoke_json from '../../data/smoke.json';
import drink_json from '../../data/drink.json';


import creativity_json from '../../data/creativity.json';
import sports_json from '../../data/sports.json';





const BuildProfile = () => {

  // const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [step, setStep] = useState(1);

  const [nationality, setNationality] = useState("");
  const [nationalityOptions, setNationalityOptions] = useState([]);

  const [ethnicity, setEthnicity] = useState("");
  const [ethnicityOptions, setEthnicityOptions] = useState([]);

  const [education, setEducation] = useState("");
  const [selectedButton_education, setSelectedButton_education] = useState(null);

  const [children, setChildren] = useState("");
  const [selectedButton_have_children, setSelectedButton_have_children] = useState(null);
  
  const [height, setHeight] = useState(180);

  const [eye_colour, setEyeColour] = useState("");
  const [selectedButton_eye_colour, setSelectedButton_eye_colour] = useState(null);

  const [body_type, setBodyType] = useState("");
  const [selectedButton_body_type, setSelectedButton_body_type] = useState(null);

  const [smoke, setSmoke] = useState("");
  const [selectedButton_smoke, setSelectedButton_smoke] = useState(null);

  const [drink, setDrink] = useState("");
  const [selectedButton_drink, setSelectedButton_drink] = useState(null);

  const [creativity, setCreativity] = useState([]);
  const [sports, setSports] = useState([]);

  const [night_out, setNightOut] = useState("");
  const [night_outOptions, setNightOutOptions] = useState([]);

  const [night_in, setNightIn] = useState("");
  const [night_inOptions, setNightInOptions] = useState([]);

  const [personality, setPersonality] = useState("");
  const [personalityOptions, setPersonalityOptions] = useState([]);

  const [about, setAbout] = useState('')





  useEffect(() => {
    console.log(token);
    handleNationality_Data();
    handleEthnicity_Data();
    handleNightIn_Data();
    handleNightOut_Data();
    handlePersonality_Data();
  }, []); // Empty dependency array means the effect runs only once, similar to componentDidMount



  const handleNationality_Data = () => {
    getData('/nationality', '').then((res) => {  console.log(res);
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setNationalityOptions(newArray);
       }
      })
      .catch(error => {
      });
  };

  const handleNightIn_Data = () => {
    getData('/interest-night-in', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setNightInOptions(newArray);
       }
      })
      .catch(error => {
      });
  };

  const handleNightOut_Data = () => {
    getData('/interest-night-out', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setNightOutOptions(newArray);
       }
      })
      .catch(error => {
      });
  };

  const handlePersonality_Data = () => {
    getData('/personality', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setPersonalityOptions(newArray);
       }
      })
      .catch(error => {
      });
  };

  const handleEthnicity_Data = () => {
    getData('/ethnicity', '').then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setEthnicityOptions(newArray);
       }
      })
      .catch(error => {
      });
  };


  const handleButtonClick_education = (buttonId, buttonName) => {
    setEducation('');
    setSelectedButton_education(null);
    if (selectedButton_education === buttonId) {
      setEducation('');
      setSelectedButton_education(null);
    } else {
      setSelectedButton_education(buttonId);
      setEducation(buttonName);
    }
  };

  const handleButtonClick_have_children = (buttonId, buttonName) => {
    setChildren('');
    setSelectedButton_have_children(null);
    if (selectedButton_have_children === buttonId) {
      setChildren('');
      setSelectedButton_have_children(null);
    } else {
      setSelectedButton_have_children(buttonId);
      setChildren(buttonName);
    }
  };

  const handleButtonClick_eye_colour = (buttonId, buttonName) => {
    setEyeColour('');
    setSelectedButton_eye_colour(null);
    if (selectedButton_eye_colour === buttonId) {
      setEyeColour('');
      setSelectedButton_eye_colour(null);
    } else {
      setSelectedButton_eye_colour(buttonId);
      setEyeColour(buttonName);
    }
  };

  const handleButtonClick_body_type = (buttonId, buttonName) => {
    setBodyType('');
    setSelectedButton_body_type(null);
    if (selectedButton_body_type === buttonId) {
      setBodyType('');
      setSelectedButton_body_type(null);
    } else {
      setSelectedButton_body_type(buttonId);
      setBodyType(buttonName);
    }
  };

  const handleButtonClick_smoke = (buttonId, buttonName) => {
    setSmoke('');
    setSelectedButton_smoke(null);
    if (selectedButton_smoke === buttonId) {
      setSmoke('');
      setSelectedButton_smoke(null);
    } else {
      setSelectedButton_smoke(buttonId);
      setSmoke(buttonName);
    }
  };

  const handleButtonClick_drink = (buttonId, buttonName) => {
    setDrink('');
    setSelectedButton_drink(null);
    if (selectedButton_drink === buttonId) {
      setDrink('');
      setSelectedButton_drink(null);
    } else {
      setSelectedButton_drink(buttonId);
      setDrink(buttonName);
    }
  };


  const handleButtonClick_Creativity = (values) => {
    if (creativity.includes(values)) {
      setCreativity(creativity.filter((s) => s !== values));
    } else {
      setCreativity([...creativity, values]);
    }
  }
  

  const handleButtonClick_Sports = (values) => {
    if (sports.includes(values)) {
      // If sport is already selected, remove it from the selection
      setSports(sports.filter((s) => s !== values));
    } else {
      // If sport is not selected, add it to the selection
      setSports([...sports, values]);
    }
  }
  
  


  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };


  const handleSliderChange = (event, value) => {
    setHeight(value);
  };

  const convertToFeetInches = (centimeters) => {
    const feet = Math.floor(centimeters / 30.48);
    const inches = Math.round((centimeters % 30.48) / 2.54);
    return `${feet}'${inches}"`;
  };

  const convertToCentimeters = (feetInches) => {
    const [feet, inches] = feetInches.split("'");
    const centimeters = Math.round((parseFloat(feet) * 30.48) + (parseFloat(inches) * 2.54));
    return centimeters;
  };




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name +' : '+ value);

    if (name === 'nationality') {
      setNationality(value);
    }
    if (name === 'ethnicity') {
      setEthnicity(value);
    }
    if (name === 'education') {
      setEducation(value);
    }
    if (name === 'children') {
      setChildren(value);
    }
    if (name === 'eye_colour') {
      setEyeColour(value);
    }
    if (name === 'body_type') {
      setBodyType(value);
    }
    if (name === 'smoke') {
      setSmoke(value);
    }
    if (name === 'drink') {
      setDrink(value);
    }
    if (name === 'night_out') {
      setNightOut(value);
    }
    if (name === 'night_in') {
      setNightIn(value);
    }
    if (name === 'personality') {
      setPersonality(value);
    }
    if (name === 'about') {
      setAbout(value);
    }
  };


  
  const handleFormSubmit = (event) => {
      event.preventDefault();
      const newErrors = {};

      const payload = {
        nationality: nationality,
        ethnicity: ethnicity,
        education: education,
        like_have_children: children,
        height: height,
        eye_colour: eye_colour,
        body_type: body_type,
        do_smoke: smoke,
        do_drink: drink,
        creativity: creativity,
        sports: sports,
        like_night_out: night_out,
        like_night_in: night_in,
        personality: personality,
        about: about
      }
      console.log(payload);


      // postData('/build-profile', payload, '').then((res) => {
      //   console.log(res);
      //   if(res.status === 'success'){ 
      //    showToast('Profile Updated.', 'success');
      //   }
      //  })
      //  .catch(error => {
      //    console.log(error)
      //   //  setIsLoading(false);
      //    showToast('Server side issue!', 'error');
      //  });
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
            <select id="nationality" name="nationality" className="left-input-select" onChange={handleInputChange}>             
              {nationalityOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
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
            <select id="ethnicity" name="ethnicity"  className="left-input-select" onChange={handleInputChange}>
              {ethnicityOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your education?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                  {education_json.map((button) => (
                    <button className="selectableButton"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_education(button.id, button.name)}
                      style={{ backgroundColor: selectedButton_education === button.id ? '#733faa' : '#F4F4F4', 
                      color: selectedButton_education === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                  ))}
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div style={{marginBottom: '30%'}}>
          <h2>Would you like to <br /> have children?</h2>
          <div style={{marginBlockStart: '20%'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}> 
                {have_children_json.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_have_children(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_have_children === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_have_children === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
            </div>
          </div>
        </div>
        )}
        {step === 5 && (
          <div style={{height: 300}}>
            <h2>How tall are you?</h2>

            <input type="text" value={`${convertToFeetInches(height)} (${height}cm)`} className="centered-input" readOnly />
            <br />
            <div>
              <Slider
                value={height}
                onChange={handleSliderChange}
                min={100}
                max={250}
                step={1}
                // marks={[
                //   { value: 100, label: convertToFeetInches(100) },
                //   { value: 150, label: convertToFeetInches(150) },
                //   { value: 200, label: convertToFeetInches(200) },
                //   { value: 250, label: convertToFeetInches(250) },
                // ]}
              />
              {/* <div>{`${height} cm (${convertToFeetInches(height)})`}</div>
              <div>{`${convertToFeetInches(height)} (${height}cm)`}</div>
              <div>{`${convertToCentimeters("5'11\"")} cm (5'11")`}</div> */}
            </div>
          </div>
        )}
        {step === 6 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your <br /> eye colour?</h2>
            <div style={{marginBlockStart: '15%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {eye_colour_json.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_eye_colour(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_eye_colour === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_eye_colour === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 7 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your <br /> Body type?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {body_type_json.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_body_type(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_body_type === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_body_type === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 8 && (
          <div style={{marginBottom: '30%'}}>
            <h2>Do you smoke?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {smoke_json.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_smoke(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_smoke === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_smoke === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                ))}
              </div>
  
            </div>
          </div>
        )}
        {step === 9 && (
          <div style={{marginBottom: '30%'}}>
            <h2>Do you drink?</h2>
            <div style={{marginBlockStart: '20%'}}>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                {drink_json.map((button) => (
                  <button className="selectableButton"
                    key={button.id} type="button"
                    onClick={() => handleButtonClick_drink(button.id, button.name)}
                    style={{ backgroundColor: selectedButton_drink === button.id ? '#733faa' : '#F4F4F4', 
                    color: selectedButton_drink === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
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
                  {creativity_json.map((button) => (
                    <button className="selectableButton chip-container"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_Creativity(button.name)}
                      style={{ backgroundColor: creativity.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: creativity.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                  ))}
              </div>
              <br />
              <h4>Sports</h4>
              <div className="chip-container"> 
                  {sports_json.map((button) => (
                    <button className="selectableButton chip-container"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_Sports(button.name)}
                      style={{ backgroundColor: sports.includes(button.name) ? '#733faa' : '#F4F4F4', 
                      color: sports.includes(button.name) ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
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
            <select id="night_out" name="night_out" className="left-input-select" onChange={handleInputChange}>
              {night_outOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
  
            <br /><br /><br />
            <h2>What do you like to <br /> do on a night in?</h2>
            <div className="input-outer-div-select">
            <select id="night_in" name="night_in" className="left-input-select" onChange={handleInputChange}>
              {night_inOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>

            </div>
          </div>
        )}
        {step === 12 && (
          <div style={{marginBottom: '30%'}}>
            <h2>What is your type <br /> of personality?</h2>
            <div className="input-outer-div-select">
            <select id="personality" name="personality" className="left-input-select" onChange={handleInputChange}>
              {personalityOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
            <br /> <br />

            <h2>Tell us about yourself</h2>
            <div className="input-outer-div" style={{minHeight: 150}}>
                <textarea id="about" rows="4" cols="50" className="left-input-textarea" style={{color: '#333', height: 130}}
                name="about" onChange={handleInputChange}/>
            </div>
       
          </div>
        )}





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
              {/* <button type="button" className="button-A" onClick={handleBuildProfile_Submit}>Submit</button> */}
              <button type="submit" className="button-A">Submit</button>
          </div>
          <div>
            <Link to="/bottomTab2">
              <button className="a-button">Skip</button>
            </Link>
          </div>
          </div>
        )}



      </div>
      </form>

    </div>
    </div>
  )

};

export default BuildProfile;