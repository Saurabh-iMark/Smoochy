import React from 'react';
import TopHeader from '../../components/TopHeader';

import { Link } from 'react-router-dom';
import BottomTabs from '../../components/BottomTabs';

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import profile1 from '../../assets/PNG/profile1.png';


const ChatBetween = () => {


  const my_basics = [
    "5'5",
    'British',
    'Mixed Race',
    'Looking for a relationship',
    'Woman',
    'Wants Kids',
    'Frequent Smoker',
    'Thin',
    'Brown Eyes',
    'Socail Drinker',
    'Cinema',
    'Takeaway',
    'Extrovert',
  ];


  const my_interests = [
    'Gym',
    'Writing',
    'Reading',
    'Runing',
    'Yoga',
    'Art'
  ];



  return (
    <div className="app">

    <TopHeader></TopHeader>


    <main className="content-main">
      <div className="dashboard-content" style={{display: 'block'}}>

        <div style={{width: '90%', margin: '0px auto', position: 'relative'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, position: 'relative'}}>
          <div style={{position: 'absolute', left: 0}}>
           <Link to="/bottomTab3">
             <MdOutlineKeyboardArrowLeft style={{fontSize: 30, color: '#733faa', cursor: 'pointer'}}></MdOutlineKeyboardArrowLeft>
           </Link>
          </div>

          <Link to="/profile">
          <div className="userAvatar-Div">
            <img src={profile1} alt="User Avatar" />
          </div>   
          </Link>     
          <div style={{marginLeft: 15}}>
            <h4>Lisa</h4>
          </div>
        </div> 
   

        <div className="chat">
          <div className="message right-message">
            <span>Hi Lisa, lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada fringilla sem?</span>
          </div>
          <div className="message left-message">
            <span>Hi John!</span>
          </div>
          <div className="message right-message">
            <span>Lorem ipsum dolor sit amet?</span>
          </div>
          <div className="message right-message">
            <span>This is a longer right message.</span>
          </div>
          <div className="message left-message">
            <span>Don't worry</span>
          </div>

          

        </div>

        </div>

      </div>
    </main>

    <BottomTabs></BottomTabs>
    </div>
  );
};

export default ChatBetween;