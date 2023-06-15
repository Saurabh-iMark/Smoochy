import React from 'react';
import TopHeader from '../../components/TopHeader';

import { Link } from 'react-router-dom';
import BottomTabs from '../../components/BottomTabs';

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { BsFillChatRightDotsFill } from "react-icons/bs";

import profile7 from '../../assets/PNG/profile7.png';


const FriendProfile = () => {


  // const styles = {
  //   background: linear-gradient(180deg, #FFFFFF00, #000000);
  // };




  return (
    <div className="app">

    <TopHeader></TopHeader>

    <main className="content-main">
        <div style={{padding: '2%'}}>
          <div className="item1" style={{height: '82vh', borderRadius: 20, position: 'relative', backgroundImage: `url(${profile7})`}}>
          <div className="linear-background" style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 180}}>
              <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 95}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px'}}>
                  <div>              
                    <h1 style={{margin: '5px 0px', color: '#fff', fontWeight: 600}}>Jessica, 22</h1>
                    <h5 style={{margin: '5px 0px', color: '#fff', fontWeight: 300}}>Bournemouth, Female</h5>
                  </div>
                  {/* <div>
                    <button className="chat-button" style={{height: 55, width: 55}}>
                     <BsFillChatRightDotsFill style={{color: '#ffffff', fontSize: 20}}></BsFillChatRightDotsFill>
                    </button>
                  </div> */}
                  <div>
                    <div style={{display: 'inline-flex'}}>
                      <button className="chat-button">
                        <IoCloseSharp style={{color: '#ffffff', fontSize: 25}}></IoCloseSharp>
                      </button>
                    </div>&nbsp;&nbsp;
                    <div style={{display: 'inline-flex'}}>
                      <button className="chat-button" style={{backgroundColor: '#4bd0fd'}}>
                        <IoCheckmarkSharp style={{color: '#ffffff', fontSize: 25}}></IoCheckmarkSharp>
                      </button>
                    </div>        
                  </div>
                </div>
              </div>
          </div>
          </div>

          <div style={{margin: '25px 0px'}}>
            <h4 style={{textAlign: 'center'}}>My Basics</h4>
          </div>
        </div>
    
        <Link>
          <button className="button-Z" style={{width: '70%', margin: 'auto', justifyContent:'center'}}>Looking for a relationship</button>
        </Link>
        <br />
    </main>

    <BottomTabs></BottomTabs>
    </div>
  );
};

export default FriendProfile;