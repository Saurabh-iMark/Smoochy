import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

import logoTagline from '../../assets/SVG/logo and tagline.svg';

import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';

import { login } from '../../services/authService';


 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const [isLoading, setIsLoading] = useState(false);
  


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate email
    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors.email = 'Email is invalid';
    }

    // Validate password
    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formIsValid = false;
      newErrors.password = 'Password should be at least 6 characters long';
    }

    setErrors(newErrors);
    return formIsValid;
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    
    if (validateForm()) {
      setIsLoading(true);
      login(email, password).then((res) => {
        console.log(res)
        if(res.success){ 
          setTimeout( () => {
            const setToken = setStore('userToken', res.success).then( (res) => {
              console.log(res)
              if(res === true){
                window.location.href = '/';
                setIsLoading(false);
              }
            });   
          }, 1500);
        }else if(res.error){
          setIsLoading(false);
           newErrors.server = res.error;
           setErrors(newErrors);
        }
      }).catch(error => {
          setIsLoading(false);
           newErrors.server = error;
           setErrors(newErrors);
      });
    }
  };




  return (
    <div className="main-container">
      <div className="main-content">
      <div className="image-container">
        <img src={logoTagline} alt="SVG Image" className="centered-image" />
      </div>

      <div className="text-wrapper">
        <p>Lorem Ipsum is simply dummy text of the printing and {'\n'} type setting industry. Lorem Ipsum has been the industry's {'\n'} standard dummy text ever since the 1500s, unknown printer {'\n'} took a galley of scrambled it specimen book.</p>
      </div>



        
        <form className="custom-form" onSubmit={handleFormSubmit}>
          
          {errors.server && <p style={{color: '#ff0037'}}>{errors.server}</p>}
          <div className="input-outer-div" style={{marginBottom: 12}}>
            <input type="text" placeholder="Username" className="left-input" style={{textAlign: 'center', color: '#000'}}
            name="email" value={email} onChange={handleInputChange}/>
          </div>
          {errors.email && <p style={{color: '#ff0037'}}>{errors.email}</p>}

          <div className="input-outer-div" style={{marginBottom: 12}}>
            <input type="password" placeholder="Password" className="left-input" style={{textAlign: 'center', color: '#000'}}
            name="password" value={password} onChange={handleInputChange}/>
          </div>
          {errors.password && <p style={{color: '#ff0037'}}>{errors.password}</p>}

          {/* <Link to="/bottomTab2">
            <button type="button" className="button-A">Sign In</button>
          </Link> */}

          <button type="submit" className="button-A" style={{margin: 0}}>Sign In</button>
        </form>

        <div className="spcae1" style={{marginTop: 20}}>
          <Link to="/forgot">
            <button className="a-button">Forgotten Password?</button>
          </Link>
        </div>

        <div className="spcae1">
        <Link to="/signup">
          <button type="button" className="button-B">Create an Account</button>
        </Link>
        </div>
        <p>By tapping Create Account or Sign In, you agree to our <span style={{fontWeight: 800}}>Terms.</span> Learn how we process our data in our <span style={{fontWeight: 800}}>Privacy Policy</span> and <span style={{fontWeight: 800}}>Cookies Policy</span>.</p>
      </div>
    
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Login;