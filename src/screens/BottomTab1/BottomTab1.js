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

import { getData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const BottomTab1 = () => {


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




  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const userToken = getUserToken().then( (res) => {
      console.log(res.token);
      handleUserProfile_Data(res.token);
    })
  }, []);



  const handleUserProfile_Data = (token) => {
    setIsLoading(true);
    getData('/my-profile', token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        console.log(res.data.name)
        // setIsLoading(false);
        // setUserData(res.data)

        setName(res.data.name);
        // setDob(res.data.dob);
        // setGender(res.data.gender);
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


  const handleUserProfile_UpdateData = (token) => {
    setIsLoading(true);
    getData('/update-profile', token).then((res) => {
       console.log(res)
       if(res.success){ 
        setIsLoading(false);
        setUserData(res.data)
       }else if(res.error){
        setIsLoading(false);
       }
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


  return (
    <div className="app">
    <TopHeader></TopHeader>

    <main className="content-main">
      <div className="dashboard-content">

      <div style={{width: '90%', margin: '0px auto'}}>
          <br />
          <h3 style={{textAlign:'center'}}>My Profile</h3>
        <form onSubmit={handleSubmit}>

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
              <input type="text" placeholder="Birthday" className="left-input" value="01/04/1998"/>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Gender</p>
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
          <button type="submit" className="button-A" style={{margin: 0}}>Update</button>
        </div>
        
        </form>
      </div>
      </div>

    </main>

    <BottomTabs></BottomTabs>  
    </div>
  );
};

export default BottomTab1;