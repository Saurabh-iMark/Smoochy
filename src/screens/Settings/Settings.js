import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { BiChevronRight } from "react-icons/bi";
import { setStore, getStore, getUserToken, removeStore, clearStore } from '../../services/storageService';
import LoaderService from '../../services/loader';


const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);

  function handleLogoutClick(){
    setIsLoading(true);
    setTimeout( () => {
      const removeToken = removeStore('userToken').then( (res) => {
        console.log(res)
        if(res === true){
          window.location.href = '/';
          setIsLoading(false);
        }
      });   
    }, 2500)
  };



  return (
    <div className="app">

      <TopHeader></TopHeader>

      <main className="content-main">
      <div className="dashboard-content" style={{flexDirection: 'column'}}>
    
      <div style={{width: '90%', margin: '0px auto', height: '83vh', position: 'relative'}}>
      <br /> <br />

      <Link to="/notifications">
      <button className="button-Z">Notification Settings
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>

      <Link to="/contact">
      <button className="button-Z">Contact & FAQ
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>


      <Link to="/privacy">
      <button className="button-Z">Security & Privacy
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>


      <Link to="/blockedUsers">
      <button className="button-Z">Blocked Users
        <BiChevronRight style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>


      <Link to="/photoVerification">
      <button className="button-Z">Upgrade your account
        <BiChevronRight  style={{fontSize: 22}}></BiChevronRight>
      </button>
      </Link>
 


       <div style={{position: 'absolute', bottom: '4vh'}}>
        <button className="button-C"  onClick={handleLogoutClick}>Log out</button>
        <button className="button-D">Delete account</button>
      </div>
      </div>
      

      </div>
      </main>


      <BottomTabs></BottomTabs>
    
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Settings;