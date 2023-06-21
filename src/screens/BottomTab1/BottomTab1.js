import React, { useState, useRef, useEffect } from 'react';

import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Link } from 'react-router-dom';

import { BsPlus } from "react-icons/bs";

import logo from '../../assets/SVG/logo.svg';
import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';
import myprofile from '../../assets/PNG/myprofile.png';

import { getData, postFormData, register } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const BottomTab1 = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage5, setSelectedImage5] = useState(null);
  const [selectedImage6, setSelectedImage6] = useState(null);
  

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [nationality, setNationality] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [relationship, setRelationship] = useState("");
  const [eduction, setEduction] = useState("");

  

  const [errors, setErrors] = useState({});

  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);
  const fileInputRef6 = useRef(null);


  const handleButtonClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleButtonClick3 = () => {
    fileInputRef3.current.click();
  };
  const handleButtonClick4 = () => {
    fileInputRef4.current.click();
  };
  const handleButtonClick5 = () => {
    fileInputRef5.current.click();
  };
  const handleButtonClick6 = () => {
    fileInputRef6.current.click();
  };


  const handleFileSelected2 = (event) => {
    const selectedFile = event.target.files[0];
    // Do something with the selected file
    console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage2(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileSelected3 = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage3(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileSelected4 = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage4(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileSelected5 = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage5(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileSelected6 = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage6(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };



  const buttonTexts_Intersts = [
    'Writing',
    'Runing',
    'Gym',
    'Tennis',
    'Running',
    'Football',
    'Cricket',
  ];



  
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






  useEffect(() => {
      // handleLocation_Data();
      handleUserProfile_Data();
  }, []);



  const handleUserProfile_Data = () => {
    setIsLoading(true);
    getData('/my-profile', token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        console.log(res.data)
        setIsLoading(false);
      
        setName(res.data.name);
        setDob(res.data.dob);
        setGender(res.data.gender);
        // setLocation(res.data.location);
        // setNationality(res.data.nationality);
        // setEthnicity(res.data.ethnicity);
        // setEthnicity(res.data.ethnicity);
        // setEthnicity(res.data.ethnicity);



        // const [ethnicity, setEthnicity] = useState("");
      
        // const [bio, setBio] = useState("");
        // const [interests, setInterests] = useState("");
        // const [relationship, setRelationship] = useState("");
        // const [eduction, setEduction] = useState("");
      


       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };



  const handleUserProfile_UpdateData = () => {
    setIsLoading(true);

    let formData = new FormData();
      formData.append('image', '');
      formData.append('image1', '');
      formData.append('image2', '');
      formData.append('image3', '');
      formData.append('image4', '');
      formData.append('image5', '');
      formData.append('name', '');
      formData.append('dob', '');
      formData.append('gender', '');
      formData.append('location', '');
      formData.append('nationality', '');
      formData.append('ethnicity', '');
      formData.append('about', '');
      formData.append('relationship', '');
      formData.append('education', '');
      formData.append('children', '');
      formData.append('height', '');
      formData.append('eye_colour', '');
      formData.append('body_type', '');
      formData.append('smoke', '');
      formData.append('drink', '');
      formData.append('night_out', '');
      formData.append('night_in', '');
      formData.append('personality', '');
      formData.append('interest', '');


    const payload = {
      image: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      name: 'dthgfngf',
      dob: '',
      gender: 'male',
      location: 'Dhampur',
      nationality: 'Indian',
      ethnicity: 'White',
      about: 'Hi, mere haaa h',
      relationship: '',
      education: 'MCA',
      children: 'NO',
      height: '5',
      eye_colour: 'Black',
      body_type: 'Chuby',
      smoke: 'NO',
      drink: 'NO',
      night_out: 'NO',
      night_in: 'NO',
      personality: 'Great',
      interest: 'Shy',
    };

    const payload2 = {
      image: "data:image/jpeg;base64,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",
      name: 'dthgfngf',
      email: 'saurabh@gmail.com',
      dob: '18-02-1999',
      gender: 'male',
      location: '1',
      phone: '7418529635',
      creativity: 'craft,singing',
      why_here: 'Here to date',
      password: '123456789',
      plan: '1',
      sports: 'yoga,gym',
    };


    register(payload2).then((res) => {
       console.log(res);
      //  if(res.status === 'success'){ 
      //   setIsLoading(false);
      //   setUserData(res.data)
      //  }else if(res.error){
      //   setIsLoading(false);
      //  }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };




  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    }
  };




  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate email
    if (!name) {
      formIsValid = false;
      newErrors.name = 'Email is required';
    }
    setErrors(newErrors);
    return formIsValid;
  };




  const handleSubmit = (e) => {
    console.log(e)
  }





  const handleLocation_Data = () => {
    getData('/location', '').then((res) => {
      console.log(res)
      if(res.status === 'success'){ 

      }
    }).catch(error => {
    });
  };





  return (
    <div className="app">
    <TopHeader></TopHeader>

    <main className="content-main">
      <div className="dashboard-content">

      <div style={{width: '90%', margin: '0px auto'}}>
          <br />
          <h3 style={{textAlign:'center'}}>My Profile</h3>
   

        <div className="grid-container">
          <div className="item1" style={{backgroundImage: `url(${myprofile})`}}>
          </div>

          <div className="item2" style={{backgroundImage: `url(${selectedImage2})`}}>
            <button className="icon-button" onClick={handleButtonClick2}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef2} onChange={handleFileSelected2}/>
            </button>
          </div>


          <div className="item3" style={{backgroundImage: `url(${selectedImage3})`}}>
            <button className="icon-button" onClick={handleButtonClick3}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef3} onChange={handleFileSelected3}/>
            </button>
          </div>  


          <div className="item4" style={{backgroundImage: `url(${selectedImage4})`}}>
            <button className="icon-button" onClick={handleButtonClick4}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef4} onChange={handleFileSelected4}/>
            </button>
          </div>


          <div className="item5" style={{backgroundImage: `url(${selectedImage5})`}}>
            <button className="icon-button" onClick={handleButtonClick5}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef5} onChange={handleFileSelected5}/>
            </button>
          </div>


          <div className="item6" style={{backgroundImage: `url(${selectedImage6})`}}>
            <button className="icon-button" onClick={handleButtonClick6}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef6} onChange={handleFileSelected6}/>
            </button>
          </div>
        </div>

        <div style={{padding: 10}}>
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Name</p>
            <div className="input-outer-div">
              <input type="text" placeholder="Your Name" className="left-input" 
               name="name" value={name} onChange={handleInputChange}/>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Birthday</p>
            <div className="input-outer-div">
              <input type="text" placeholder="Birthday" className="left-input" value={dob} onChange={handleInputChange}/>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Gender</p>
            <div className="input-outer-div-select">
            <select id="gender" className="left-input-select"  value={gender} onChange={handleInputChange}>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               <option value="Agender">Agender</option>
               <option value="Bigender">Bigender</option>
               <option value="Gender Fluid">Gender Fluid</option>
               <option value="Non-Binary">Non-Binary</option>
               <option value="Transgender">Transgender</option>
               <option value="Transgender Man">Transgender Man</option>
               <option value="Transgender Woman">Transgender Woman</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Current Location</p>
            <div className="input-outer-div-select">
            <select id="location" name="Bournemouth" className="left-input-select">
               <option value="Indian">America</option>
               <option value="American">New York</option>
               <option value="NRI">San Diago</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Nationality</p>
            <div className="input-outer-div-select">
            <select id="nationality" name="British" className="left-input-select">
               <option value="Indian">Indian</option>
               <option value="American">American</option>
               <option value="NRI">NRI</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Ethnicity</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <br />
          <div>
            <h3 style={{textAlign:'center'}}>My Bio</h3>
            <div style={{backgroundColor: '#fff', padding: '10px 20px', borderRadius: 20}}>
            <p style={{color: '#000', fontWeight: 500}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada fringilla sem, non viverra velit accumsan non. Etiam faucibus, leo in tempus faucibus, sem lacus ullamcorper turpis, sed semper ante velit quis nunc.</p>
            </div>
          </div>

          <br />
          <div>
            <h3 style={{textAlign:'center'}}>My Interests</h3>
            <div style={{backgroundColor: '#fff', padding: '10px 20px', borderRadius: 20}}>
            <div className="chip-container"> 
                {buttonTexts_Intersts.map((text, index) => (
                  <TextChip key={index} text={text} />
                ))}
            </div>
            </div>
          </div>

          <br />
          <div>
          <h3 style={{textAlign:'center'}}>My Basics</h3>
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Relationship</p>
            <div className="input-outer-div-select">
            <select id="gender" name="Male" className="left-input-select">
               <option value="Indian">Male</option>
               <option value="American">Female</option>
               <option value="NRI">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Education</p>
            <div className="input-outer-div-select">
            <select id="location" name="Bournemouth" className="left-input-select">
               <option value="Indian">America</option>
               <option value="American">New York</option>
               <option value="NRI">San Diago</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Children</p>
            <div className="input-outer-div-select">
            <select id="nationality" name="British" className="left-input-select">
               <option value="Indian">Indian</option>
               <option value="American">American</option>
               <option value="NRI">NRI</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Height</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Eye Colour</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Body Type</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Smoke</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Drink</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Perfect Night Out</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Perfect Night in</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Personality</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="White British" className="left-input-select">
               <option value="Brown">Brown</option>
               <option value="Blank Nigro">Blank Nigro</option>
               <option value="Other">Other</option>
            </select>
            </div>
          </div>
          <br />
          </div>

        </div>


        <div style={{margin: '10px 10px 40px'}}>
          <button type="submit" className="button-A" style={{margin: 0}} onClick={handleUserProfile_UpdateData}>Update</button>
        </div>

      </div>
      </div>

    </main>

    <BottomTabs></BottomTabs> 
    {isLoading && <LoaderService />}
    </div>
  );
};

export default BottomTab1;