import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import BackButton from '../../components/BackButton';
import { IoChevronBack, IoAdd } from 'react-icons/io5';

import logoIcon from '../../assets/SVG/logo icon.svg';
import masterCard from '../../assets/SVG/masterCard.svg';
import visa from '../../assets/SVG/visa.svg';
import IdentifyModal from '../../components/IdentifModal/IdentifyModal';


import why_here_json from '../../data/why_here.json';

import { register, getData } from "../../services/authService";


const Signup = () => {
  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  


  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [why_here, setWhy_here] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState('');
  const [payment, setPayment] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [photo, setPhoto] = useState('');

  const [planData, setPlanData] = useState([]);


  const currentDate = new Date();


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





  useEffect(() => {
    getPlan_Data();
  }, []); // Empty dependency array means the effect runs only once, similar to componentDidMount


  const getPlan_Data = () => {
    setIsLoading(true);
    getData('/plan', '').then((res) => {
      console.log(res);
      if(res.status === 'success'){
        setIsLoading(false);
        setPlanData(res.data);
      }else if(res.error){
        setIsLoading(false);
        setErrors(res.error);
      }
    })
    .catch(error => {
      setIsLoading(false);
      console.log(error);
    });
  }










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





  // let slider_1 = document.getElementById("myRange");
  //  slider_1.oninput = function() {
  //  slider_1.value = this.value;
  //  var value = (this.value-this.min)/(this.max-this.min)*100
  //  this.style.background = 'linear-gradient(to right, #95DCF8 0%, #95DCF8 ' + value + '%, #d3d3d3 ' + value + '%, #d3d3d3 100%)'
  // }
 
  // const handleFormSubmit = e => {
  //   console.log(e)
  //   e.preventDefault();

  //   // Call the login method from the AuthService
  //   register(name, email, dob, gender, location, phone, creativity, why_here, image)
  //     .then((res) => {
  //       console.log(res);
  //       // Redirect or handle successful login
  //       console.log('Login successful');
  //     })
  //     .catch(error => {
  //       // Handle login error
  //       console.error('Login failed', error);
  //     });
  // };






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
            <input type="text" placeholder="Your Name" className="centered-input"/>
            </div>
          </div>
        )}
        {step === 2 && (
          <div  style={{height: 460}}>
            <h2>Add your first photo</h2>
            <div className="file-Selected" onClick={handleButtonClick1} style={{ marginBlockStart: '18%' }}>
              <div>
              <IoAdd style={{fontSize: 22, color: '#000000'}}></IoAdd>
              </div>
            <input
              ref={fileInputRef1}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileSelected1}/>
            </div>
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
              <input type="number" placeholder="Day"  className="centered-input" style={{ width: '80px' }} />
              <input type="number" placeholder="Month"  className="centered-input" style={{ width: '120px' }} />
              <input type="number" placeholder="Year"  className="centered-input" style={{ width: '100px' }} />
            </div>
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
            </div>
          </div>
        )}
        {step === 6 && (
          <div style={{height: 260}}>
            <h2>What town or city are <br /> you currently located in?</h2>
            <div style={{marginBlockStart: '10%'}}>
            <div class="input-outer-div-select">
            <select id="location" name="New York" className="left-input-select">
               <option value="London">London</option>
               <option value="San Diago">San Diago</option>
               <option value="Rio">Rio</option>
               <option value="Tokyo">Tokyo</option>
            </select>
            </div>
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
      </form>



      <div className="footer">
        {step !==  9 ? (
        <div>
          <div className="image-container-signup">
           <img src={logoIcon} alt="SVG Image" className="centered-image" />
          </div>
          <button className="button-A" onClick={handleNextStep}>Continue</button>
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

    </div>
    </div>
  )

};

export default Signup;