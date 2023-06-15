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


const Signup = () => {

  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Stripe Setting
  // const stripe = await loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');


  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dob, setDob] = useState(new Date());


  const [gender, setGender] = useState('');
  const [why_here, setWhy_here] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState('');
  const [payment, setPayment] = useState('');




  // 2). Image selection
  const fileInputRef1 = useRef(null);
  const handleButtonClick1 = () => {
    fileInputRef1.current.click();
  };
  const handleFileSelected1 = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
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

  // Gender identify modal
  const [isModal_Identify, setIsModal_Identify] = useState(false);
  const openModalIdentify = () => {
    setIsModal_Identify(true);
  };

  const closeModalIdentify = () => {
    setIsModal_Identify(false);
  };




  // name, email, dob, gender, location, phone, creativity, why_here, image



  // Handle Next or Back, Progress  
  const handleNextStep = () => {
    console.log(step);

    if(step === 1){
     if(name){
      console.log(name);
      setStep(step + 1);
     }
    }else if(step === 2){
      if(image){
        // console.log(image);
        setStep(step + 1);
      }
    }else if(step === 3){
      // if(date && month && year){
      //   console.log(date + month +year);
      //   setStep(step + 1);
      // }
      setStep(step + 1);
    }else if(step === 4){
      // if(gender){
      //   console.log(gender);
      //   setStep(step + 1);
      // }
      setStep(step + 1);
    }else if(step === 5){
      if(why_here){
        console.log(why_here);
        setStep(step + 1);
      }
    }else if(step === 6){
      if(location){
        console.log(location);
        setStep(step + 1);
      }
    }else if(step === 7){
      if(email && phone && password){
        console.log(email + phone + password);
        setStep(step + 1);
      }
    }else if(step === 8){
      if(plan){
        console.log(plan);
        setStep(step + 1);
      }
    }else if(step === 9){
      if(payment){
        console.log(payment);
        setStep(step + 1);
      }
    }

    //  setStep(step + 1);
  };

  const handlePreviousStep = () => {
     setStep(step - 1);
  };



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




  const buttonTexts = [
    'Looking for a relationship',
    'Something casual',
    'I’m not sure yet',
    'Prefer not to say',
    'Here to date'
  ];

  const buttonTexts_Plan = [
    'Free Trial (1 month)',
    '6 months (£19.99)',
    '12 months (£29.99)'
  ];



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




  useEffect(() => {
    getPlan_Data();
  }, []); // Empty dependency array means the effect runs only once, similar to componentDidMount




  const getPlan_Data = () => {
    getData('/plan', '').then((res) => {
      console.log(res);

      // if(res.success){
      //   localStorage.setItem('userToken', res.success.token);
      //   window.location.href = '/bottomTab2';
      // }else if(res.error){
      //   setError(res.error);
      // }
    })
    .catch(error => {
      console.log(error);
      // if (error.response.status === 401) {
      //   setError('Invalid username or password');
      // } else {
      //   setError('An error occurred');
      // }
    });
  }



//  Form Submission and Validation Part
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    console.log(step);

    if (name === 'name') {
      setName(value);
    }
    if (name === 'image') {
      setImage(image);
    }

    if (name === 'date') {
      setDate(value);
    }
    if (name === 'month') {
      setMonth(value);
    } 
    if (name === 'year') {
      setYear(value);
    }
  };



  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate name
    if (!name) {
      formIsValid = false;
      newErrors.name = 'Name is required';
    }

    // Validate image
    if (!image) {
      formIsValid = false;
      newErrors.image = 'First Photo is required';
    }

    // Validate dob
    if (!dob) {
      formIsValid = false;
      newErrors.dob = 'Date Birth is required';
    }

    // Validate gender
    if (!gender) {
      formIsValid = false;
      newErrors.gender = 'Gender is required';
    }

    // Validate why_here
    if (!why_here) {
      formIsValid = false;
      newErrors.why_here = 'Why Here is required';
    }

    // Validate location
    if (!location) {
      formIsValid = false;
      newErrors.location = 'Location is required';
    }
    
    // Validate email
    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors.email = 'Email is invalid';
    }

    // Validate phone
    if (!phone) {
      formIsValid = false;
      newErrors.phone = 'Phone is required';
    }

    // Validate password
    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formIsValid = false;
      newErrors.password = 'Password should be at least 6 characters long';
    }

    // Validate dob
    if (!plan) {
      formIsValid = false;
      newErrors.plan = 'Plan selection is required';
    }

    // Validate payment
    if (!payment) {
      formIsValid = false;
      newErrors.payment = 'Payment is required';
    }


    setErrors(newErrors);
    return formIsValid;
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    // console.log(event)
    console.log()
    if (validateForm()) {
      setIsLoading(true);
      //   register(name, email, dob, gender, location, phone, creativity, why_here, image)
      // postData('/register', email, '').then((res) => {
      //   console.log(res)
      //   setIsLoading(false);
      //   setErrors(newErrors);
      // }).catch(error => {
      //     setIsLoading(false);
      //      newErrors.server = error;
      //      setErrors(newErrors);
      // });
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
          <div  style={{height: 460}}>
            <h2>Ok, let's set up your <br /> account! First, what's <br /> your name?</h2>
            <div style={{marginBlockStart: '30%'}}>
              <h5>This is how you'll appear on Smoochy</h5>
              <div className="input-outer-div">
                <input type="text" className="left-input" style={{color: '#000'}}                
                name="name" value={name} onChange={handleInputChange}/>
              </div>
              {errors.name && <p style={{color: '#ff0037'}}>{errors.name}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div  style={{height: 460}}>
            <h2>Add your first photo</h2>
            <div className="file-Selected item2" onClick={handleButtonClick1} style={{marginBlockStart: '18%',backgroundImage: `url(${image})`}}>
              <div>
              <BsPlus style={{fontSize: 25}}/>
              </div>
              <input type="file" name="file" style={{ display: 'none' }} ref={fileInputRef1} onChange={handleFileSelected1}/>
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
              <input type="number" placeholder="Day" className="centered-input" style={{ width: '80px' }} max="2"
               name="date" value={date} onChange={handleInputChange}/>
              <input type="number" placeholder="Month"  value={month} className="centered-input" style={{ width: '120px' }} max="2"
               name="month" value={month} onChange={handleInputChange}/>
              <input type="number" placeholder="Year"  value={year} className="centered-input" style={{ width: '100px' }} max="4"
               name="year" value={year} onChange={handleInputChange}/>
            </div>
            {errors.dob && <p style={{color: '#ff0037'}}>{errors.dob}</p>}

            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{height: 350}}>
            <h2>How do you identify?</h2>

            <div style={{display: 'flex', justifyContent: 'space-evenly', marginBlockStart: '18%', marginBlockEnd: 20}}>
               <button onClick={handleButton1Click} className="selectableButton"
                 style={{ backgroundColor: button1Selected ? '#733faa' : '#ffffff', color: button1Selected ? '#ffffff' : '#733faa' }}>Male</button>
               <button onClick={handleButton2Click} className="selectableButton"
                 style={{ backgroundColor: button2Selected ? '#733faa' : '#ffffff', color: button2Selected ? '#ffffff' : '#733faa' }}>Female</button>
            </div>
            {errors.gender && <p style={{color: '#ff0037'}}>{errors.gender}</p>}

            <div className="spcae1">
              <button onClick={openModalIdentify} className="a-button">Another Gender</button>
            </div>
  
           <IdentifyModal isModal_Identify={isModal_Identify} onClose={closeModalIdentify}></IdentifyModal>
          </div>
        )}

        {step === 5 && (
          <div style={{height: 560}}>
            <h2>Tell people why <br /> you are here<br /></h2>
            <div>
              <h5>You can change this whenever you want and will show on your profile unless you’re unsure</h5>
              <div style={{display: 'flex',flexDirection: 'column'}}> 
                {buttonTexts.map((text, index) => (
                  <TextButton key={index} text={text} />
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
            <select id="location" name="New York" className="left-input-select">
               <option value="London">London</option>
               <option value="San Diago">San Diago</option>
               <option value="Rio">Rio</option>
               <option value="Tokyo">Tokyo</option>
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
              <input type="text" placeholder="Your Name" className="centered-input"/>

              <div className="title-div">Telephone</div>
              <input type="text" placeholder="Your Telephone" className="centered-input"/>

              <div className="title-div">Password</div>
              <input type="text" placeholder="Your Password" className="centered-input"/>
            </div>
            {errors.email && <p style={{color: '#ff0037'}}>{errors.email}</p>}
            {errors.image && <p style={{color: '#ff0037'}}>{errors.image}</p>}

          </div>
        )}

        {step === 8 && (
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
                  checked={isChecked}
                  onChange={handleCheckboxChange}/>
              </label>
              </div>

            <div><br />
              <Link to="/terms">
                <button className="a-button">View Terms & Conditions</button>
              </Link>
            </div>

            </div>
          </div>
        )}

        {step === 9 && (
          <div  style={{height: 500}}>
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
        {step !==  9 ? (
        <div>
          <div className="image-container-signup">
           <img src={logoIcon} alt="SVG Image" className="centered-image" />
          </div>
          <button className="button-A" onClick={handleNextStep} disabled={isButtonDisabled} style={{opacity: isButtonDisabled === true ? 0.5 : 1 }}>Continue</button>
        </div>
        ) : (
        <div>
          <div className="title-div" style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>Powered by&nbsp;<span style={{fontSize: 22}}>stripe</span></div>
           <br />
           <Link to="/congratulations">
             <button className="button-C">Pay £19.99</button>
           </Link>
        </div>
        )}
      </div>

      </form>

    </div>
    </div>
  )

};

export default Signup;