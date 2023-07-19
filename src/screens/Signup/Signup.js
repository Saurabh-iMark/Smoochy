import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css';

import BackButton from '../../components/BackButton';
import { IoChevronBack } from 'react-icons/io5';
import { BsPlus } from "react-icons/bs";
import { BiPound } from "react-icons/bi";

import logoIcon from '../../assets/SVG/logo icon.svg';
import masterCard from '../../assets/SVG/masterCard.svg';
import visa from '../../assets/SVG/visa.svg';
import IdentifyModal from '../../components/IdentifModal/IdentifyModal';


import { register, getData, postData, postFormData } from '../../services/authService';
import LoaderService from '../../services/loader';

import { loadStripe, StripeCardElement, useStripe } from '@stripe/stripe-js';

import gender_json from '../../data/gender.json';
import why_here_json from '../../data/why_here.json';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setStore } from '../../services/storageService';
import { showToast } from '../../services/toastService';





const Signup = () => {
  const navigate = useNavigate();

  // const stripe = await loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

  const currentDate = new Date();
  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState(currentDate);
  const [month, setMonth] = useState(currentDate);
  const [year, setYear] = useState(currentDate);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const [modalGender, setModalGender] = useState('');

  const [why_here, setWhy_here] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState('');
  const [isChecked_Terms, setIsChecked_Terms] = useState(false);

  const [payment, setPayment] = useState('');


  const gender_firstPhase = gender_json.slice(0, 2);

  const [locationData, setLocationData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [selectedButton_gender, setSelectedButton_gender] = useState(null);
  const [selectedButton_why_here, setSelectedButton_why_here] = useState(null);
  const [selectedButton_plan, setSelectedButton_plan] = useState(null);

  // Gender identify modal
  const [isModal_Identify, setIsModal_Identify] = useState(false);

  


  // Image selection
  const fileInputRef1 = useRef(null);
  const handleButtonClick1 = () => {
    fileInputRef1.current.click();
  };

  const handleFileSelected1 = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsButtonDisabled(false);
    }
  };



  // Gender male/female
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




  const openModalIdentify = () => {
    console.log(selectedButton_gender);
    setSelectedButton_gender('');
    setGender('');
    setIsModal_Identify(true);
  };

  const closeModalIdentify = (modalValue) => {
    setIsModal_Identify(false);
    setModalGender(modalValue);

    if(modalValue){
      setGender(modalValue);
    }else{
      setGender('');
    }
  };

  const removeModalSelectableGender = (modalValue) => {
    setGender('');
    setModalGender('');
  }

  


  useEffect(() => {
    getPlan_Data();
    getLocation_Data();
  }, []); // Empty dependency array means the effect runs only once, similar to componentDidMount




  const getPlan_Data = () => {
    getData('/plan', '').then((res) => {
      // console.log(res);
      if(res.status === 'success'){
        setPlanData(res.data);
      }else if(res.error){
        setErrors(res.error);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  
  const getLocation_Data = () => {
    getData('/location', '').then((res) => {
      // console.log(res);
      if(res.status === 'success'){
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setLocationData(newArray);
      }else if(res.error){
        setErrors(res.error);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }


  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const handleCheckboxChange_Terms = () => {
    setIsChecked_Terms(!isChecked_Terms);
  };

  const handleButtonClick_gender = (buttonId, buttonName) => {
    setModalGender('');
    setSelectedButton_gender(null);
    if (selectedButton_gender === buttonId) {
      setSelectedButton_gender(null);
      setGender('');
    } else {
      setSelectedButton_gender(buttonId);
      setGender(buttonName);
    }
  };

  const handleButtonClick_why_here = (buttonId, buttonName) => {
    setWhy_here('');
    setSelectedButton_why_here(null);
    if (selectedButton_why_here === buttonId) {
      setSelectedButton_why_here(null);
      setWhy_here('');
    } else {
      setSelectedButton_why_here(buttonId);
      setWhy_here(buttonName);
    }
  };

  const handleButtonClick_Plan = (planId) => {
    setPlan('');
    setSelectedButton_plan(null);
    if (selectedButton_plan === planId) {
      setSelectedButton_plan(null);
      setPlan('');
    } else {
      setSelectedButton_plan(planId);
      setPlan(planId);
    }
  };



  function validatePhoneNumber(phoneNumber) {
    // Regular expression pattern for phone numbers (e.g., 123-456-7890 or 1234567890)
    const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;
  
    // Check if the phone number matches the pattern
    return phonePattern.test(phoneNumber);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name +' : '+ value);

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'image':
        setImage(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'why_here':
        setWhy_here(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'plan':
        setPlan(value);
        break;
      case 'terms':
        setIsChecked_Terms(value);
        break;
      default:
        break;
    }
  };

  const validateStepOne = () => {
    let stepOneErrors = {};
    let isValid = true;

    if (name.trim().length === 0) {
      stepOneErrors.name = 'Name is required, and cannot be empty!';
      isValid = false;
    }
    setErrors(stepOneErrors);
    return isValid;
  };

  const validateStepTwo = () => {
    let stepTwoErrors = {};
    let isValid = true;

    if (image.trim() === '') {
      stepTwoErrors.image = 'First Image selection is required!';
      isValid = false;
    }
    setErrors(stepTwoErrors);
    return isValid;
  };

  const validateStepThree = () => {
    let stepThreeErrors = {};
    let isValid = true;

    if (dob === '') {
      stepThreeErrors.dob = 'Date of Birth is required!';
      isValid = false;
    }
    setErrors(stepThreeErrors);
    return isValid;
  };

  const validateStepFour = () => {
    let stepFourErrors = {};
    let isValid = true;

    if (gender === '') {
      stepFourErrors.gender = 'Gender is required!';
      isValid = false;
    }
    setErrors(stepFourErrors);
    return isValid;
  };

  const validateStepFive = () => {
    let stepFiveErrors = {};
    let isValid = true;

    if (why_here === '') {
      stepFiveErrors.why_here = 'Why here is required!';
      isValid = false;
    }
    setErrors(stepFiveErrors);
    return isValid;
  };

  const validateStepSix = () => {
    let stepSixErrors = {};
    let isValid = true;
    if (location === '') {
      stepSixErrors.location = 'Location is required!';
      isValid = false;
    }
    setErrors(stepSixErrors);
    return isValid;
  };

  const validateStepSeven = () => {
    let stepSevenErrors = {};
    let isValid = true;

    if (email.trim() === '') {
      stepSevenErrors.email = 'Email is required!';
      isValid = false;
    }

    if (phone.trim() === '') {
      stepSevenErrors.phone = 'Phone is required!';
      isValid = false;
    }

    const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;
    if (!phonePattern.test(phone)) {
      stepSevenErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    if (password.trim() === '') {
      stepSevenErrors.password = 'Pasword is required!';
      isValid = false;
    }

    if (password.length < 8) {
      stepSevenErrors.password = 'Password should be at least 8 characters long!';
      isValid = false;
    }



    setErrors(stepSevenErrors);
    return isValid;
  };

  const validateStepEight = () => {
    let stepEightErrors = {};
    let isValid = true;
    if (plan === '') {
      stepEightErrors.plan = 'Plan selection is required';
      isValid = false;
    }

    if (isChecked_Terms === false) {
      stepEightErrors.isChecked_Terms = 'Please accept the terms and conditions!';
      isValid = false;
    }

    setErrors(stepEightErrors);
    return isValid;
  };

  const validateStepNine = () => {
    let stepNineErrors = {};
    let isValid = true;
    if (payment.trim() === '') {
      stepNineErrors.payment = 'Payment is required';
      isValid = false;
    }
    setErrors(stepNineErrors);
    return isValid;
  };




  // Handle Next, Progress  
  const handleNextStep = () => {
    let isValid = false;

    if (step === 1) {
      isValid = validateStepOne();
    } else if (step === 2) {
      isValid = validateStepTwo();
    } else if (step === 3) {
      isValid = validateStepThree();
    } else if (step === 4) {
      isValid = validateStepFour();
    } else if (step === 5) {
      isValid = validateStepFive();
    } else if (step === 6) {
      isValid = validateStepSix();
    } else if (step === 7) {
      isValid = validateStepSeven();
    } else if (step === 8) {
      isValid = validateStepEight();
    } else if (step === 9) {
      isValid = validateStepNine();
    }

    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }

    console.log('Active step: ' + step)
  };

  // Handle Back, Progress  
  const handlePreviousStep = () => {
     setStep(step - 1);

     setPlan('');
     setIsChecked_Terms(false);
     setSelectedButton_plan(null);
     console.log('all: ' + step + isChecked_Terms + plan);
  };





  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    const originalDate = dob;
    const formattedDate = formatDate(originalDate);

    const payload = {
      name: name,
      image: image,
      dob: formattedDate,
      gender: gender,
      why_here: why_here,
      location: location,
      email: email,
      phone: phone,
      password: password,
      plan: plan,
    };
    console.log(payload);

    if(payload.plan === 1 && isChecked_Terms === true ){
      setIsLoading(true);
      register(payload, '').then((res) => {
        console.log(res);
        setIsLoading(false);
        // setErrors(newErrors);
        if(res.status === 'success'){
            let token = res.token;
            const setToken = setStore('userToken', res.token).then( (res) => {
              if(res === true){
                showToast('User registration success.', 'success');
                setIsLoading(false);
                setTimeout( () => {
                  // navigate('/congratulations');
                  navigate('/congratulations');
                }, 1000);
              }
            }); 
        }else if(res.status === 'required'){
          if(res.message.email){
            showToast(res.message.email, 'warning');
          }            
        }
      }).catch(error => {
          console.log(error);
          showToast(error, 'error');
          setIsLoading(false);
          // newErrors.server = error;
          // setErrors(newErrors);
      });
    }else{
      showToast('Please fill the form completely!', 'warning');
    }
  };






  return (
    <div className="main-container">
      <div className="top-progress-bar">
        <progress value={step} max={9} id="myProgress"></progress>
      </div>


      {step === 1 && (
      <div className="header-back">
        <Link to="/">
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
          <div style={{height: 460}}>
            <h2>Ok, let's set up your <br /> account! First, what's <br /> your name?</h2>
            <div style={{marginBlockStart: '30%'}}>
              <h5>This is how you'll appear on Smoochy</h5>
              <div className="input-outer-div">
                <input type="text" className="left-input" style={{color: '#000'}}                
                name="name" value={name}  onChange={handleInputChange} />
              </div>
              {errors.name && <p style={{color: '#ff0037'}}>{errors.name}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{height: 460}}>
            <h2>Add your first photo</h2>
            <div className="file-Selected item2" onClick={handleButtonClick1} style={{marginBlockStart: '18%',backgroundImage: `url(${image})`}}>
              <div> <BsPlus style={{fontSize: 25}}/> </div>
              <input type="file" name="image" style={{ display: 'none' }} ref={fileInputRef1} onChange={handleFileSelected1}/>
            </div>
            {errors.image && <p style={{color: '#ff0037'}}>{errors.image}</p>}
          </div>
        )}

        {step === 3 && (
          <div style={{height: 350}}>
            <h2>When’s your birthday?</h2>
            
            <div style={{ marginBlockStart: '18%' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <div style={{ width: '80px'}}><h4>Day</h4></div>
              <div style={{ width: '120px'}}><h4>Month</h4></div>
              <div style={{ width: '100px'}}><h4>Year</h4></div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {/* <DatePicker
                dateFormat="dd"
                placeholderText="Day"
                className="centered-input"
                style={{ width: "80px" }}
                selected={date}
                maxDate={currentDate}
                onChange={(date) => setDate(date)}
                name="date"
              />

              <DatePicker
                showMonthYearPicker
                dateFormat="MMMM"
                placeholderText="Month"
                className="centered-input"
                style={{ width: "120px" }}
                name="month"
                // renderCustomHeader={({ date }) => <div></div>}
                selected={month}
                maxDate={currentDate}
                onChange={(date) => setMonth(date)}
              />

              <DatePicker
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Year"
                className="centered-input"
                style={{ width: "100px" }}
                name="year"
                selected={year}
                maxDate={currentDate}
                onChange={(date) => {
                  setYear(date);
                }}
              /> */}

              <DatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="Date of Birth"
                className="centered-input"
                style={{ width: "100px" }}
                name="dob"
                selected={dob}
                maxDate={currentDate}
                // onChange={(date) => { console.log(date);
                //   const originalDate = date;
                //   const formattedDate = formatDate(originalDate);
                //   console.log(dob);
                //   console.log(formattedDate);
                //   setDob(formattedDate);
                // }}
                // onChange={handleInputChange}
                onChange={(date) => { console.log(date);
                  setDob(date);
                }}
              />

              {/* <input type="number" placeholder="Day" className="centered-input" style={{ width: '80px' }} max="2"
               name="date" value={date} onChange={handleInputChange}/>
              <input type="number" placeholder="Month"  value={month} className="centered-input" style={{ width: '120px' }} max="2"
               name="month" value={month} onChange={handleInputChange}/>
              <input type="number" placeholder="Year"  value={year} className="centered-input" style={{ width: '100px' }} max="4"
               name="year" value={year} onChange={handleInputChange}/> */}
            </div>
            {errors.dob && <p style={{color: '#ff0037'}}>{errors.dob}</p>}
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{height: 350}}>
            <h2>How do you identify?</h2>

            <div style={{display: 'flex', justifyContent: 'space-around', marginBlockStart: '18%', marginBlockEnd: 20}}>
              {gender_firstPhase.map((button) => (
                <button className="selectableButton"
                  key={button.id} type="button"
                  onClick={() => handleButtonClick_gender(button.id, button.name)}
                  style={{ backgroundColor: selectedButton_gender === button.id ? '#733faa' : '#F4F4F4', 
                  color: selectedButton_gender === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex',
                  alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
              ))}
            </div>

            {modalGender !== '' && (
            <div style={{display: 'flex', justifyContent: 'space-around', marginBlockStart: 20, marginBlockEnd: 20}}>
              <button className="selectableButton"
                  key={modalGender} type="button"
                  onClick={() => removeModalSelectableGender(modalGender)}
                  style={{ backgroundColor: '#733faa', color: '#ffffff', fontWeight: 500, display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', minWidth: '100%'}}>{modalGender}</button>
            </div> 
            )}


            <div>
              <button onClick={openModalIdentify} type="button" className="a-button">Another Gender</button>
              {/* <button className="a-button">Another Gender</button> */}
            </div>

            {errors.gender && <p style={{color: '#ff0037'}}>{errors.gender}</p>}
           <IdentifyModal isModal_Identify={isModal_Identify} onClose={closeModalIdentify}></IdentifyModal>
          </div>
        )}

        {step === 5 && (
          <div style={{height: 560}}>
            <h2>Tell people why <br /> you are here<br /></h2>
            <div>
              <h5>You can change this whenever you want and will show on your profile unless you’re unsure</h5>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                  {why_here_json.map((button) => (
                    <button className="selectableButton"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_why_here(button.id, button.name)}
                      style={{ backgroundColor: selectedButton_why_here === button.id ? '#733faa' : '#F4F4F4', 
                      color: selectedButton_why_here === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                  ))}
              </div>
              {errors.why_here && <p style={{color: '#ff0037'}}>{errors.why_here}</p>}
            </div>
          </div>
        )}

        {step === 6 && (
          <div style={{height: 260}}>
            <h2>What town or city are <br /> you currently located in?</h2>
            <div style={{marginBlockStart: '10%'}}>
            <div className="input-outer-div-select">
            <select id="location" name="location" className="left-input-select" onChange={(e) => {
              setLocation(e.target.value) }}>
                {locationData.map((item) => (
                 <option value={item.value}>{item.label}</option>
                ))}
            </select>
            </div>
            {errors.location && <p style={{color: '#ff0037'}}>{errors.location}</p>}
            </div>
          </div>
        )}

        {step === 7 && (
          <div style={{height: 560}}>
            <h2>Almost there, <br /> let’s create your <br />login details </h2>
            <div>
              <br />
              <div className="title-div">Email address</div>
              <input type="text" placeholder="Your Email Address" className="centered-input"
              name="email" value={email} onChange={handleInputChange}/>
              {errors.email && <p style={{color: '#ff0037', margin: '0px 0px 20px'}}>{errors.email}</p>}

              <div className="title-div">Telephone</div>
              <input type="number" placeholder="Your Telephone" className="centered-input"
              name="phone" value={phone} onChange={handleInputChange}/>
              {errors.phone && <p style={{color: '#ff0037', margin: '0px 0px 20px'}}>{errors.phone}</p>}

              <div className="title-div">Password</div>
              <input type="password" placeholder="Your Password" className="centered-input"
              name="password" value={password} onChange={handleInputChange}/>
              {errors.password && <p style={{color: '#ff0037', margin: '0px 0px 20px'}}>{errors.password}</p>}
            </div>
          </div>
        )}

        {step === 8 && (
          <div style={{height: 560}}>
            <h2>Select your plan</h2>
            <div>
              <h5>Both plans come with <br /> unlimited messaging</h5>
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                  {planData.map((button) => (
                    <>
                    {button.price === "0" ? (
                    <button className="selectableButton"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_Plan(button.id)}
                      style={{ backgroundColor: selectedButton_plan === button.id ? '#733faa' : '#F4F4F4', 
                      color: selectedButton_plan === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}> Free Trial (1 month)</button>              
                    ) : (
                    <button className="selectableButton"
                      key={button.id} type="button"
                      onClick={() => handleButtonClick_Plan(button.id)}
                      style={{ backgroundColor: selectedButton_plan === button.id ? '#733faa' : '#F4F4F4', 
                      color: selectedButton_plan === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name} (<BiPound /> {button.price}) </button>
                    )}
                    </>
                  ))}
              </div>
              {errors.plan && <p style={{color: '#ff0037', margin: '0px 0px 20px'}}>{errors.plan}</p>}


              <div className="centered-input custom-checkbox" style={{display:'flex', alignItems:'center', justifyContent: 'center', backgroundColor: '#a5e7fe'}}> 
              <label style={{color: '#733faa', fontSize: 12, display: 'flex', alignItems: 'center'}}>I agree to the terms & conditions&nbsp;&nbsp;
                <input
                  type="checkbox" name="terms"
                  checked={isChecked_Terms}
                  onChange={handleCheckboxChange_Terms}/>
              </label>
              </div>
              {errors.isChecked_Terms && <p style={{color: '#ff0037', margin: '0px 0px 20px'}}>{errors.isChecked_Terms}</p>}

            <div>
              <Link to="/terms">
                <button className="a-button">View Terms & Conditions</button>
              </Link>
            </div>

            </div>
          </div>
        )}

        {step === 9 && (plan === 2 || plan === 3) && (
          <div style={{height: 500}}>
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
          </div>
        )}





      <div className="footer">
           {step !==  9 && (plan !== 1) && (
           <div>
             <div className="image-container-signup">
              <img src={logoIcon} alt="SVG Image" className="centered-image" />
             </div>
             {/* <button className="button-A" type="submit" onClick={handleNextStep} disabled={isButtonDisabled} style={{opacity: isButtonDisabled === true ? 0.5 : 1 }}>Continue</button> */}
             <button id="continueButtton" className="button-A" type="button" onClick={handleNextStep}>Continue</button>
           </div>
           )}
   
   
           {step === 8 && (plan === 1) && (
           <div>
             <div className="image-container-signup">
              <img src={logoIcon} alt="SVG Image" className="centered-image" />
             </div>
             <button className="button-A" type="submit">Submit</button>
           </div>
           )}
   
   
           {step === 9 && (plan === 2 || plan === 3) && (
           <div>
             <div className="title-div" style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>Powered by&nbsp;<span style={{fontSize: 22}}>stripe</span></div>
              <br />
                <button className="button-C" type="submit">Pay £19.99</button>
           </div>
           )}
      </div>
      </form>

    </div>
    {isLoading && <LoaderService />}
    </div>
  )

};

export default Signup;