import React, { useState, useRef, useEffect } from 'react';
import Select from "react-select";

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

import { getData, postFormData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';
import { showToast } from '../../services/toastService';

import body_type_json from '../../data/body_type.json';
import drink_json from '../../data/drink.json';
import education_json from '../../data/education.json';
import ethnicity_json from '../../data/ethnicity.json';
import eye_colour_json from '../../data/eye_colour.json';
import gender_json from '../../data/gender.json';
import have_children_json from '../../data/have_children.json';
import night_in_json from '../../data/night_in.json';
import night_out_json from '../../data/night_out.json';
import smoke_json from '../../data/smoke.json';
import things_creativity_json from '../../data/things_creativity.json';
import things_sports_json from '../../data/things_sports.json';
import type_personality_json from '../../data/type_personality.json';
import why_here_json from '../../data/why_here.json';



const BottomTab1 = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage5, setSelectedImage5] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [location, setLocation] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  const [nationality, setNationality] = useState("");
  const [nationality_id, setNationality_id] = useState("");
  const [nationalityOptions, setNationalityOptions] = useState([]);

  const [ethnicity, setEthnicity] = useState("");
  const [ethnicity_id, setEthnicity_id] = useState("");
  const [ethnicityOptions, setEthnicityOptions] = useState([]);

  const [night_out, setNightOut] = useState("");
  const [night_out_id, setNightOut_id] = useState("");
  const [night_outOptions, setNightOutOptions] = useState([]);

  const [night_in, setNightIn] = useState("");
  const [night_in_id, setNightIn_id] = useState("");
  const [night_inOptions, setNightInOptions] = useState([]);

  const [personality, setPersonality] = useState("");
  const [personality_id, setPersonality_id] = useState("");
  const [personalityOptions, setPersonalityOptions] = useState([]);

  const [bio, setBio] = useState("");
  const [relationship, setRelationship] = useState("");
  const [education, setEducation] = useState("");
  const [children, setChildren] = useState("");
  const [height, setHeight] = useState("");
  const [eye_colour, setEyeColour] = useState("");
  const [body_type, setBodyType] = useState("");
  const [smoke, setSmoke] = useState("");
  const [drink, setDrink] = useState("");
  const [interest, setInterest] = useState([]);


    const fileInputRef = useRef(null);
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);
    const fileInputRef4 = useRef(null);
    const fileInputRef5 = useRef(null);
      const handleButtonClick = () => {
        fileInputRef.current.click();
      };
      const handleButtonClick1 = () => {
        fileInputRef1.current.click();
      };
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




    const handleFileSelected = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };

      const handleFileSelected1 = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage1(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
      };
        

    const handleFileSelected2 = (event) => {
      const selectedFile = event.target.files[0];
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
      handleUserProfile_Data();
      handleLocation_Data();
      handleNationality_Data();

      handleNightIn_Data();
      handleNightOut_Data();
      handlePersonality_Data();
      handleEthnicity_Data();
  }, []);



  const handleUserProfile_Data = () => {
    setIsLoading(true);
    getData('/my-profile', token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
         
        if(res.data.image){
          setSelectedImage(res.data.image);
        }
        if(res.data.image){
          setSelectedImage1(res.data.image1);
        }
        if(res.data.image){
          setSelectedImage2(res.data.image2);
        }
        if(res.data.image){
          setSelectedImage3(res.data.image3);
        }
        if(res.data.image){
          setSelectedImage4(res.data.image4);
        }
        if(res.data.image){
          setSelectedImage5(res.data.image5);
        }

        setName(res.data.name);
        setDob(res.data.dob);
        setGender(res.data.gender);
        setLocation(res.data.location_id);
        setLocation_id(res.data.location);
        setNationality(res.data.nationality_id);
        setNationality_id(res.data.nationality);
        setEthnicity(res.data.ethnicity_id);
        setEthnicity_id(res.data.ethnicity);
        setBio(res.data.about);
        setRelationship(res.data.why_here);
        setEducation(res.data.education);
        setChildren(res.data.like_have_children);
        setHeight(res.data.height);
        setEyeColour(res.data.eye_colour);
        setBodyType(res.data.body_type);
        setSmoke(res.data.do_smoke);
        setDrink(res.data.do_drink);
        setInterest(res.interest);
        setNightOut(res.data.night_out_interest);
        setNightOut_id(res.data.night_out_interest);
        setNightIn(res.data.night_in_interest_id);
        setNightIn_id(res.data.night_in_interest);
        setPersonality(res.data.personality_id);
        setPersonality_id(res.data.personality);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };



  const handleLocation_Data = () => {
    getData('/location', token).then((res) => { // console.log(res);
       if(res.status === 'success'){ 
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setLocationOptions(newArray);
       }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleNationality_Data = () => {
    getData('/nationality', token).then((res) => { // console.log(res);
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
    getData('/interest-night-in', token).then((res) => { // console.log(res);
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
    getData('/interest-night-out', token).then((res) => { // console.log(res);
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
    getData('/personality', token).then((res) => { // console.log(res);
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
    getData('/ethnicity', token).then((res) => { // console.log(res);
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



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name +' : '+ value);

    if (name === 'name') {
      setName(value);
    }
    if (name === 'dob') {
      setDob(value);
    }
    if (name === 'gender') {
      setGender(value);
    }
    if (name === 'location') {
      setLocation(value);
    }
    if (name === 'nationality') {
      setNationality(value);
    }
    if (name === 'ethnicity') {
      setEthnicity(value);
    }
    if (name === 'bio') {
      setBio(value);
    }
    if (name === 'relationship') {
      setRelationship(value);
    }
    if (name === 'education') {
      setEducation(value);
    }
    if (name === 'children') {
      setChildren(value);
    }
    if (name === 'height') {
      setHeight(value);
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
  };


  const handleUserProfile_UpdateData = () => {
     let image;
     let image1;
     let image2;
     let image3; 
     let image4;
     let image5;

     if(selectedImage.startsWith("https://")){
       image = "";
     }else{
       image = selectedImage; 
     }

     if(selectedImage1.startsWith("https://")){
       image1 = "";
     }else{
       image1 = selectedImage1; 
     }

     if(selectedImage2.startsWith("https://")){
       image2 = "";
     }else{
       image2 = selectedImage2; 
     }

     if(selectedImage3.startsWith("https://")){
        image3 = "";
     }else{
        image3 = selectedImage3; 
     }

     if(selectedImage4.startsWith("https://")){
        image4 = "";
     }else{
        image4 = selectedImage4;
     }

     if(selectedImage5.startsWith("https://")){
       image5 = "";
     }else{
       image5 = selectedImage5; 
     }


      const payload = {
        image: image,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        name: name,
        dob: dob,
        gender: gender,
        location: location,
        nationality: nationality,
        ethnicity: ethnicity,
        about: bio,
        relationship: relationship,
        education: education,
        children: children,
        height: height,
        eye_colour: eye_colour,
        body_type: body_type,
        smoke: smoke,
        drink: drink,
        night_out: night_out,
        night_in: night_in,
        personality: personality,
        interest: interest,
      };
      console.log(payload);

      postData('/build-profile', payload, token).then((res) => {
        console.log(res);
        if(res.status === 'success'){ 
         showToast('Profile Updated.', 'success');
        }
       })
       .catch(error => {
         console.log(error)
         setIsLoading(false);
         showToast('Server side issue!', 'error');
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
          <div className="item1" style={{backgroundImage: `url(${selectedImage})`}}>
           <button className="icon-button" onClick={handleButtonClick}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileSelected}/>
            </button>
          </div>

          <div className="item2" style={{backgroundImage: `url(${selectedImage1})`}}>
            <button className="icon-button" onClick={handleButtonClick1}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef1} onChange={handleFileSelected1}/>
            </button>
          </div>


          <div className="item3" style={{backgroundImage: `url(${selectedImage2})`}}>
            <button className="icon-button" onClick={handleButtonClick2}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef2} onChange={handleFileSelected2}/>
            </button>
          </div>  


          <div className="item4" style={{backgroundImage: `url(${selectedImage3})`}}>
            <button className="icon-button" onClick={handleButtonClick3}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef3} onChange={handleFileSelected3}/>
            </button>
          </div>


          <div className="item5" style={{backgroundImage: `url(${selectedImage4})`}}>
            <button className="icon-button" onClick={handleButtonClick4}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef4} onChange={handleFileSelected4}/>
            </button>
          </div>


          <div className="item6" style={{backgroundImage: `url(${selectedImage5})`}}>
            <button className="icon-button" onClick={handleButtonClick5}>
            <BsPlus style={{fontSize: 25}}/>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef5} onChange={handleFileSelected5}/>
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
              <input type="text" placeholder="Birthday" className="left-input" 
              name="dob" value={dob} onChange={handleInputChange}/>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Gender</p>
            <div className="input-outer-div-select">
            <select id="gender" name="gender" className="left-input-select" onChange={handleInputChange}>
              {gender ? (
               <option value={gender}>{gender}</option>
              ) : (
               <option value="">Select</option>
              )}
              {gender_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Current Location</p>
            <div className="input-outer-div-select">
            <select id="location" name="location" className="left-input-select" onChange={handleInputChange}>
              {location ? (
               <option value={location}>{location_id}</option>
              ) : (
               <option value="">Select</option>
              )}
              {locationOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Nationality</p>
            <div className="input-outer-div-select">
            <select id="nationality" name="nationality" className="left-input-select" onChange={handleInputChange}>
              {nationality ? (
               <option value={nationality}>{nationality_id}</option>
              ) : (
               <option value="">Select</option>
              )}
              {nationalityOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Ethnicity</p>
            <div className="input-outer-div-select">
            <select id="ethnicity" name="ethnicity" className="left-input-select" onChange={handleInputChange}>
              {ethnicity ? (
               <option value={ethnicity}>{ethnicity_id}</option>
              ) : (
               <option value="">Select</option>
              )}
              {ethnicityOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
          </div>
          <br />

          <br />
          <div>
            <h3 style={{textAlign:'center'}}>My Bio</h3>
            <div style={{backgroundColor: '#fff', padding: '10px 20px', borderRadius: 20}}>
              <div>
              <textarea  id="bio" rows="4" cols="50" className="left-input-textarea" style={{color: '#000', padding: 0, borderRadius: 0}}
                  name="bio" value={bio}  onChange={handleInputChange}></textarea>
              {/* <p style={{color: '#000', fontWeight: 500}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada fringilla sem, non viverra velit accumsan non. Etiam faucibus
              </p> */}
              </div>
            </div>
          </div>

          <br />
          <div>
            <h3 style={{textAlign:'center'}}>My Interests</h3>
            <div style={{backgroundColor: '#fff', padding: '10px 20px', borderRadius: 20, minHeight: 80}}>
            
            {interest.length >= 1 ? (
              <div className="chip-container"> 
              {buttonTexts_Intersts.map((text, index) => (
                <TextChip key={index} text={text} />
              ))}
              </div>
            ):(
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px'}}>
              <div>
               <p style={{color: '#beb6b6', textAlign: 'center'}}>No Interest data found!</p>
              </div>
              </div>
            )}
            </div>
          </div>

          <br />
          <div>
          <h3 style={{textAlign:'center'}}>My Basics</h3>
          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Relationship</p>
            <div className="input-outer-div-select">
            <select name="relationship" className="left-input-select" onChange={handleInputChange}>
              {relationship ? (
               <option value={relationship}>{relationship}</option>
              ) : (
               <option value="">Select</option>
              )}
              {why_here_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Education</p>
            <div className="input-outer-div-select">
            <select name="education" className="left-input-select" onChange={handleInputChange}>
              {education ? (
               <option value={education}>{education}</option>
              ) : (
               <option value="">Select</option>
              )}
              {education_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Children</p>
            <div className="input-outer-div-select">
            <select name="children" className="left-input-select" onChange={handleInputChange}>
              {children ? (
               <option value={children}>{children}</option>
              ) : (
               <option value="">Select</option>
              )}
              {have_children_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Height</p>
            <div className="input-outer-div">
              <input type="text" placeholder="Your Height" className="left-input" 
               name="height" value={height} onChange={handleInputChange}/>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Eye Colour</p>
            <div className="input-outer-div-select">
            <select name="eye_colour" className="left-input-select" onChange={handleInputChange}>
              {eye_colour ? (
               <option value={eye_colour}>{eye_colour}</option>
              ) : (
               <option value="">Select</option>
              )}
              {eye_colour_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Body Type</p>
            <div className="input-outer-div-select">
            <select name="body_type" className="left-input-select" onChange={handleInputChange}>
              {body_type ? (
               <option value={body_type}>{body_type}</option>
              ) : (
               <option value="">Select</option>
              )}
              {body_type_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Smoke</p>
            <div className="input-outer-div-select">
            <select name="smoke" className="left-input-select" onChange={handleInputChange}>
              {smoke ? (
               <option value={smoke}>{smoke}</option>
              ) : (
               <option value="">Select</option>
              )}
              {smoke_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />


          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Drink</p>
            <div className="input-outer-div-select">
            <select name="drink" className="left-input-select" onChange={handleInputChange}>
              {drink ? (
               <option value={drink}>{drink}</option>
              ) : (
               <option value="">Select</option>
              )}
              {drink_json.map((item) => (
               <option value={item.name}>{item.name}</option>
              ))}
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Perfect Night Out</p>
            <div className="input-outer-div-select">
            <select name="night_out" className="left-input-select" onChange={handleInputChange}>
              {night_out ? (
               <option value={night_out}>{night_out_id}</option>
              ) : (
               <option value="">Select</option>
              )}
              {night_outOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Perfect Night in</p>
            <div className="input-outer-div-select">
            <select name="night_in" className="left-input-select" onChange={handleInputChange}>
              {night_in ? (
               <option value={night_in}>{night_in_id}</option>
              ) : (
               <option value="">Select</option>
              )}
              {night_inOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
            </select>
            </div>
          </div>
          <br />

          <div>
            <p style={{padding: '0px 25px', color: '#000', lineHeight: 'normal'}}>Personality</p>
            <div className="input-outer-div-select">
            <select name="personality" className="left-input-select" onChange={handleInputChange}>
              {personality ? (
               <option value={personality}>{personality_id}</option>
              ) : (
               <option value="">Select</option>
              )}
              {personalityOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
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