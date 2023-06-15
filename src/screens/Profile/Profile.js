import React from 'react';
import TopHeader from '../../components/TopHeader';

import { Link } from 'react-router-dom';
import BottomTabs from '../../components/BottomTabs';

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { BsFillChatRightDotsFill } from "react-icons/bs";

import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';
import profile6 from '../../assets/PNG/profile6.png';


const Profile = () => {


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
        <div style={{padding: '2%'}}>
          <div className="item1" style={{height: '82vh', borderRadius: 20, position: 'relative', backgroundImage: `url(${profile1})`}}>
          <div className="linear-background" style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 180}}>
              <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 95}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px'}}>
                  <div>              
                    <h1 style={{margin: '5px 0px', color: '#fff', fontWeight: 600}}>Lisa, 24</h1>
                    <h5 style={{margin: '5px 0px', color: '#fff', fontWeight: 300}}>Bournemouth, Female</h5>
                  </div>
                  <div>
                    <Link to="/chatBetween">
                    <button className="chat-button" style={{height: 55, width: 55}}>
                     <BsFillChatRightDotsFill style={{color: '#ffffff', fontSize: 20}}></BsFillChatRightDotsFill>
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
          </div>
          </div>

          <div style={{backgroundColor: '#b7ecfe', borderRadius: 20, padding: 20, margin: '12px 0px'}}>
            <h4 style={{color: '#69a4c0', fontWeight: 600}}>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada fringilla sem, non viverra velit accumsan non. Etiam faucibus, leo in tempus faucibus, sem lacus ullamcorper turpis, sed semper ante velit quis nunc. ”</h4>
          </div>

          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${profile2})`}}>
            </div>
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${profile3})`}}>
            </div>
          </div>

          <div style={{margin: '25px 0px'}}>
            <h4 style={{textAlign: 'center', margin: '35px 0px 20px'}}>My Basics</h4>
            <div className="chip-container"> 
                {my_basics.map((text, index) => (
                  <div className="normalChip" style={{backgroundColor: '#f7f7f7'}}>{text}</div>
                ))}
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}></div>
          </div>


          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${profile4})`}}>
            </div>
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${profile5})`}}>
            </div>
          </div>


          <div style={{margin: '25px 0px'}}>
            <h4 style={{textAlign: 'center', margin: '35px 0px 20px'}}>My Interests</h4>
            <div className="chip-container"> 
                {my_interests.map((text, index) => (
                  <div className="normalChip" style={{backgroundColor: '#733faa', color: '#fff'}}>{text}</div>
                ))}
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}></div>
          </div>


          <div className="item1" style={{height: '82vh', borderRadius: 20, position: 'relative', backgroundImage: `url(${profile6})`}}>
          <div className="linear-background" style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 180}}>
              <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 95}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px'}}>
                  <div>              
                    <h1 style={{margin: '5px 0px', color: '#fff', fontWeight: 600}}>Lisa, 24</h1>
                    <h5 style={{margin: '5px 0px', color: '#fff', fontWeight: 300}}>Bournemouth, Female</h5>
                  </div>
                  <div>
                    <Link to="/chatBetween">
                    <button className="chat-button" style={{height: 55, width: 55}}>
                     <BsFillChatRightDotsFill style={{color: '#ffffff', fontSize: 20}}></BsFillChatRightDotsFill>
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
          </div>
          </div>



        </div>

    </main>

    <BottomTabs></BottomTabs>

    </div>
  );
};

export default Profile;