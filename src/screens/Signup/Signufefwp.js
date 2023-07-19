import React, { useState, useRef, useEffect } from "react";
import { Link, json } from "react-router-dom";

import "../../App.css";

import BackButton from "../../components/BackButton";
import { IoChevronBack } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

import logoIcon from "../../assets/SVG/logo icon.svg";
import masterCard from "../../assets/SVG/masterCard.svg";
import visa from "../../assets/SVG/visa.svg";
import IdentifyModal from "../../components/IdentifModal/IdentifyModal";

import { register, getData } from "../../services/authService";
import { loadStripe, StripeCardElement, useStripe } from "@stripe/stripe-js";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


import why_here_json from '../../data/why_here.json';




import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NameText from "./Details/NameText";
import Addimage from "./Details/Addimage";
import Birthdate from "./Details/Birthdate";
import Gender from "./Details/Gender";
import Location from "./Details/Location";
import Why_here from "./Details/Why_here";
import SelectPlan from "./Details/SelectPlan";




const Signup = () => {
  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  // const stripe = await loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');
  const currentDate = new Date();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [date, setDate] = useState(currentDate);
  const [month, setMonth] = useState(currentDate);
  const [year, setYear] = useState(currentDate);
  const [dob, setDob] = useState(new Date());

  const [gender, setGender] = useState(null);
  const [why_here, setWhy_here] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [planData, setPlanData] = useState([]);
  const [payment, setPayment] = useState('');


  const [plan, setPlan] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);


  const [formState, setFormState] = useState({
    name: "",
    image: null,
    dob: "",
    gender: "",
    why_here: "",
    location: "",
    email: "",
    phone: "",
    password: "",
    plan: "",
    payment: "",
  });



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

  const buttonTexts = [
    "Looking for a relationship",
    "Something casual",
    "I’m not sure yet",
    "Prefer not to say",
    "Here to date",
  ];

  const buttonTexts_Plan = [
    "Free Trial (1 month)",
    "6 months (£19.99)",
    "12 months (£29.99)",
  ];

  const TextButton = ({ text, setWhy_here, setPlan }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (text) => {
      {
        setWhy_here && setWhy_here(text);
      }
      {
        setPlan && setPlan(text);
      }
      setIsSelected(!isSelected);
    };

    return (
      <button
        className="selectableButton"
        style={{
          backgroundColor: isSelected ? "#733faa" : "#F4F4F4",
          color: isSelected ? "#ffffff" : "#733faa",
        }}
        // className={isSelected ? 'selectedIdentify' : '' }
        onClick={() => handleClick(text)}
        // unselectable="on"
      >
        {text}
      </button>
    );
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

  useEffect(() => {
    setDate(new Date(year.getFullYear(), month.getMonth(), 1));
    setDob(new Date(year.getFullYear(), month.getMonth(), date.getDate()));
  }, [month, year, setDate]);

  // name, email, dob, gender, location, phone, creativity, why_here, image

  // Handle Next or Back, Progress
  const handleNextStep = () => {
    console.log(step);

    if (step === 1) {
      if (name) {
        console.log(name);
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (image) {
        // console.log(image);
        setStep(step + 1);
      }
    } else if (step === 3) {
      if (dob < currentDate) {
        console.log("Dob :", dob);
        setStep(step + 1);
      }
    } else if (step === 4) {
      if (gender) {
        console.log(gender);
        setStep(step + 1);
      }
    } else if (step === 5) {
      if (why_here) {
        console.log(why_here);
        setStep(step + 1);
      }
    } else if (step === 6) {
      if (location) {
        console.log(location);
        setStep(step + 1);
      }
    } else if (step === 7) {
      if (email && phone && password) {
        console.log(email, "-", phone, "-", password);
        setStep(step + 1);
      } else {
        console.log("email elae");
      }
    } else if (step === 8) {
      if (plan) {
        console.log(plan);
        setStep(step + 1);
      }
    } else if (step === 9) {
      if (payment) {
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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

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




  const handleButtonClick_why_here = (buttonId, buttonName) => {
    console.log('why_here'+ buttonName)
    if (selectedButton === buttonId) {
      setSelectedButton(null);
      setWhy_here(null);
    } else {
      setSelectedButton(buttonId);
      setWhy_here(buttonName);
    }
  };




  //  Form Submission and Validation Part
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    console.log(step);

    if (name === "name") {
      setName(value);
    }
    if (name === "image") {
      setImage(image);
    }

    if (name === "date") {
      setDate(value);
    }
    if (name === "month") {
      setMonth(value);
    }
    if (name === "year") {
      setYear(value);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    const regex = /\S+@\S+\.\S+/;
    switch (step) {
      case 1:
        console.log("case 1");
        if (!name) {
          console.log("case 1 inside condition");
          newErrors.name = "Name is required";
          console.log("name :", newErrors);
        }
        break;
      case 2:
        if (!image) {
          newErrors.image = "First Photo is required";
        }
        break;
      case 3:
        if (!dob) {
          newErrors.dob = "Date Birth is required";
        }
        break;
      case 4:
        if (!gender) {
          newErrors.gender = "Gender is required";
        }
        break;
      case 5:
        if (!why_here) {
          newErrors.why_here = "Why Here is required";
        }
        break;
      case 6:
        if (!location) {
          newErrors.location = "Location is required";
        }
        break;
      case 7:
        if (!email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Email is invalid";
        }
        if (!phone) {
          newErrors.phone = "Phone is required";
        }
        if (!password) {
          newErrors.password = "Password is required";
        } else if (password.length < 6) {
          newErrors.password = "Password should be at least 6 characters long";
        }
        break;
      case 8:
        if (!plan) {
          newErrors.plan = "Plan selection is required";
        }
        break;
      default:
        break;
    }
    // Set form errors
    setErrors(newErrors);

    console.log("errors :", Object.keys(errors).length, Object.keys(errors));
    if (Object.keys(newErrors).length === 0) {
      setStep((prevScreen) => prevScreen + 1);
    }



    
    //old code

    // if (!name) {
    //   formIsValid = false;
    //   newErrors.name = "Name is required";
    //   console.log("name is required");
    // }
    // if (!image) {
    //   formIsValid = false;
    //   newErrors.image = "First Photo is required";
    // }
    // if (!dob) {
    //   formIsValid = false;
    //   newErrors.dob = "Date Birth is required";
    // }
    // if (!gender) {
    //   formIsValid = false;
    //   newErrors.gender = "Gender is required";
    // }
    // if (!why_here) {
    //   formIsValid = false;
    //   newErrors.why_here = "Why Here is required";
    // }
    // if (!location) {
    //   formIsValid = false;
    //   newErrors.location = "Location is required";
    // }
    // if (!email) {
    //   formIsValid = false;
    //   newErrors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   formIsValid = false;
    //   newErrors.email = "Email is invalid";
    // }
    // if (!phone) {
    //   formIsValid = false;
    //   newErrors.phone = "Phone is required";
    // }
    // if (!password) {
    //   formIsValid = false;
    //   newErrors.password = "Password is required";
    // } else if (password.length < 6) {
    //   formIsValid = false;
    //   newErrors.password = "Password should be at least 6 characters long";
    // }
    // if (!plan) {
    //   formIsValid = false;
    //   newErrors.plan = "Plan selection is required";
    // }
    // if (!payment) {
    //   formIsValid = false;
    //   newErrors.payment = "Payment is required";
    // }

    // setErrors(newErrors);
    // return formIsValid;
  };





  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    // if (validateForm()) {
    console.log("plan :", plan);
    if (plan && plan === "Free Trial (1 month)" && step === 8) {
      setPlan(buttonTexts_Plan.indexOf(plan));
      setIsLoading(true);
      const payload2 = {
        image: image,
        name: name,
        email: email,
        dob: dob,
        gender: gender,
        location: location,
        phone: phone,
        why_here: why_here,
        password: password,
        plan: plan,
      };

      console.log(payload2);

      register(payload2)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("error", error);
          newErrors.server = error;
          setErrors(newErrors);
        }); 
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
              <IoChevronBack
                style={{ fontSize: 18, color: "#733faa", marginRight: 12 }}
              ></IoChevronBack>
              <span className="back-button-text">Back</span>
            </button>
          </Link>
        </div>
      )}

      {step > 1 && (
        <div className="header-back">
          <button className="back-button" onClick={handlePreviousStep}>
            <IoChevronBack
              style={{ fontSize: 18, color: "#733faa", marginRight: 12 }}
            ></IoChevronBack>
            <span className="back-button-text">Back</span>
          </button>
        </div>
      )}

      <div className="main-content">
        {/* <form onSubmit={handleFormSubmit}> */}
        {step === 1 && (
          <NameText
            name={name}
            handleChange={handleInputChange}
            errors={errors.name}
          />
        )}

        {step === 2 && (
          <Addimage
            handleButtonClick1={handleButtonClick1}
            handleFileSelected1={handleFileSelected1}
            fileInputRef1={fileInputRef1}
            image={image}
            errors={errors.image}
          />
        )}

        {step === 3 && (
          <Birthdate
            currentDate={currentDate}
            date={date}
            month={month}
            year={year}
            setDate={setDate}
            setMonth={setMonth}
            setYear={setYear}
            errors={errors.dob}
          />
        )}

        {step === 4 && (
          <Gender
            gender={gender}
            setGender={setGender}
            isModal_Identify={isModal_Identify}
            openModalIdentify={openModalIdentify}
            closeModalIdentify={closeModalIdentify}
            errors={errors.gender}
          />
        )}

        {/* {step === 5 && (
          <div style={{ height: 560 }}>
            <h2>
              Tell people why <br /> you are here
              <br />
            </h2>
            <div>
              <h5>
                You can change this whenever you want and will show on your
                profile unless you’re unsure
              </h5>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {buttonTexts.map((text, index) => (
                  <TextButton
                    setWhy_here={setWhy_here}
                    key={index}
                    text={text}
                  />
                ))}
              </div>

              
              {errors.why_here && (
                <p style={{ color: "#ff0037" }}>{errors.why_here}</p>
              )}
            </div>
          </div>
          // <Why_here
          //   setWhy_here={setWhy_here}
          //   buttonTexts={buttonTexts}
          //   errors={errors}
          // />
        )} */}
        {step === 5 && (
          <div style={{ height: 560 }}>
            <h2>
              Tell people why <br /> you are here
              <br />
            </h2>
            <div>
              <h5>
                You can change this whenever you want and will show on your
                profile unless you’re unsure
              </h5>
              {/* <div style={{ display: "flex", flexDirection: "column" }}>
                {buttonTexts.map((text, index) => (
                  <TextButton
                    setWhy_here={setWhy_here}
                    key={index}
                    text={text}
                  />
                ))}
              </div> */}
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                  {why_here_json.map((button) => (
                    <>
                    <button className="selectableButton"
                      key={button.id}
                      onClick={() => handleButtonClick_why_here(button.id, button.name)}
                      style={{ backgroundColor: selectedButton === button.id ? '#733faa' : '#F4F4F4', 
                      color: selectedButton === button.id ? '#ffffff' : '#733faa', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{button.name}</button>
                    </>
                  ))}
              </div>
              
              {errors.why_here && (
                <p style={{ color: "#ff0037" }}>{errors.why_here}</p>
              )}
            </div>
          </div>
          // <Why_here
          //   setWhy_here={setWhy_here}
          //   buttonTexts={buttonTexts}
          //   errors={errors}
          // />
        )}

        {step === 6 && (
          <Location setLocation={setLocation} errors={errors.location} />
        )}



        {step === 7 && (
          <div style={{ height: 560 }}>
            <h2>
              Almost there, <br /> let’s create your <br />
              login details{" "}
            </h2>
            <div>
              <br />
              <div className="title-div">Email address</div>
              <input
                type="text"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="centered-input"
              />
              {errors.email && (
                <p style={{ color: "#ff0037" }}>{errors.email}</p>
              )}

              <div className="title-div">Telephone</div>
              <input
                type="tel"
                required={true}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Telephone"
                className="centered-input"
              />
              {errors.phone && (
                <p style={{ color: "#ff0037" }}>{errors.phone}</p>
              )}

              <div className="title-div">Password</div>
              <input
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                className="centered-input"
              />
            </div>
            {errors.password && (
              <p style={{ color: "#ff0037" }}>{errors.password}</p>
            )}
          </div>
        )}

        {step === 8 && (
          <SelectPlan
            setPlan={setPlan}
            isChecked={isChecked}
            buttonTexts_Plan={buttonTexts_Plan}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}

        {step === 9 && (
          <div style={{ height: 500 }}>
            <h2>Pay with card</h2>

            <div style={{ marginBlockStart: "30%" }}>
              <div className="title-div">Name on card</div>
              <input
                type="text"
                placeholder="ex: Alex Smith"
                className="centered-input"
              />

              <div className="title-div" style={{ marginTop: 15 }}>
                Card information
              </div>
              <div
                className="centered-input"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <input
                  className="borderless-input"
                  type="text"
                  placeholder="1234 1234 1234 1234"
                />
                <div>
                  <img id="myImage" src={masterCard} style={{ height: 20 }} />
                  &nbsp;
                  <img id="myImage" src={visa} style={{ height: 20 }} />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="number"
                  placeholder="MM/YY"
                  className="centered-input"
                  style={{ width: "120px" }}
                />
                <input
                  type="number"
                  placeholder="CVC"
                  className="centered-input"
                  style={{ width: "120px" }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="footer">
          {step !== 9 ? (
            plan && plan === "Free Trial (1 month)" && step === 8 ? (
              <div>
                <div className="image-container-signup">
                  <img
                    src={logoIcon}
                    alt="SVG Image"
                    className="centered-image"
                  />
                </div>
                <button
                  className="button-A"
                  onClick={handleFormSubmit}
                  disabled={isButtonDisabled}
                  style={{ opacity: isButtonDisabled === true ? 0.5 : 1 }}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>
                <div className="image-container-signup">
                  <img
                    src={logoIcon}
                    alt="SVG Image"
                    className="centered-image"
                  />
                </div>
                <button
                  className="button-A"
                  onClick={() => validateForm()}
                  disabled={isButtonDisabled}
                  style={{ opacity: isButtonDisabled === true ? 0.5 : 1 }}
                >
                  Continue
                </button>
              </div>
            )
          ) : (
            <div>
              <div
                className="title-div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Powered by&nbsp;<span style={{ fontSize: 22 }}>stripe</span>
              </div>
              <br />
              <Link to="/congratulations">
                <button className="button-C">Pay £19.99</button>
              </Link>
            </div>
          )}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};





export default Signup;
