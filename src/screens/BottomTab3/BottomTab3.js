import React, { useState, useRef, useEffect } from 'react';

import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Link } from 'react-router-dom';

import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { BsFillChatRightDotsFill } from "react-icons/bs";

import { MdKeyboardArrowDown } from "react-icons/md";

import FilterModal from '../../components/FilterModal/FilterModal';

import { getData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const BottomTab3 = () => {

  const [openMsgList, setOpenMsgList] = useState([]);
  const [waitingMsgList, setWaitingMsgList] = useState([]);
  const [error, setError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const userToken = getUserToken().then( (res) => {
      console.log(res.token);
      handleUserList_Open_Data(res.token);
      handleUserList_Waiting_Data(res.token);
    })
  }, []);

  
  const handleUserList_Open_Data = (token) => {
    setIsLoading(true);
    getData('/message-open', token).then((res) => {
       console.log(res)
       if(res.success){ 
        setIsLoading(false);
        setOpenMsgList(res.data);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };


  const handleUserList_Waiting_Data = (token) => {
    setIsLoading(true);
    getData('/message-waiting', token).then((res) => {
       console.log(res)
       if(res.success){ 
        setIsLoading(false);
        setWaitingMsgList(res.data);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };




  const handle_Accept = (userid) => {
      console.log(userid);

      postData().then((res) => {
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
          setError(res.error);
        }
      }).catch(error => {
          setIsLoading(false);
          if (error.response.status === 401) {
            setError('Invalid username or password');
          } else {
            setError('An error occurred');
          }
      });

      // https://smoochy.customerdevsites.com/api/accept-user/26
  };
  



  const handle_Close = (userid) => {
      console.log(userid);
  };
  










  const [isModal_Filter, setIsModal_Filter] = useState(false);
  const openModalFilter = () => {
    setIsModal_Filter(true);
  };

  const closeModalFilter = () => {
    setIsModal_Filter(false);
  };









  return ( 
    <div className="app">
    <TopHeader></TopHeader>

    <main className="content-main">
      <div className="dashboard-content">
        <div style={{width: '90%', margin: '0px auto'}}>

        <Tabs style={{width: '100%'}}>
        <TabList>
          <Tab>Open</Tab>
          <Tab>Waiting</Tab>
        </TabList>
    



        <br />
        <div style={{display: 'flex', align: 'center', justifyContent: 'center', margin: '20px 0px 20px'}}>
            <button onClick={openModalFilter} className="a-button">Filter Contacts</button>
            <MdKeyboardArrowDown style={{fontSize: 30, color: '#733faa'}}/>
        </div>
  




        <TabPanel>
        {openMsgList.length > 0 ? (
          <>         
          {openMsgList.map((user) => (
            <div key={user.id} className="userList-Div">
              <Link to="/friendProfile">
              <div className="userAvatar-Div">
                <img src={user.image} alt="User Avatar" />
              </div>
              </Link>
              <div style={{width: 215}}>
                <h4>{user.name}</h4>
                <p>{user.msg}</p>
              </div>
              <div>
                <Link to="/chatBetween">
                <button className="chat-button">
                  <BsFillChatRightDotsFill style={{color: '#ffffff', fontSize: 15}}></BsFillChatRightDotsFill>
                </button>
                </Link>
              </div>
            </div>
           ))}
           </>
        ) : (
          <div className="no-data-msg">No User data found!</div>
        )}
        </TabPanel>


        <TabPanel>
        {waitingMsgList.length > 0 ? (
          <>         
          {waitingMsgList.map((user) => (
           <div key={user.id} className="userList-Div">
             <div className="userAvatar-Div">
               <img src={user.image} alt="User Avatar" />
             </div>
             <div style={{width: 160}}>
               <h4>{user.name}</h4>
             </div>
             <div>
               <button className="chat-button" onClick= {() => handle_Close(user.id)}>
                 <IoCloseSharp style={{color: '#ffffff', fontSize: 25}}></IoCloseSharp>
               </button>
             </div>
             <div>  
               <button className="chat-button" onClick= {() => handle_Accept(user.id)} style={{backgroundColor: '#4bd0fd'}}>
                 <IoCheckmarkSharp style={{color: '#ffffff', fontSize: 25}}></IoCheckmarkSharp>
               </button>
             </div>
           </div>
           ))}
           </>
        ) : (
          <div className="no-data-msg">No User data found!</div>
        )}
        </TabPanel>

        </Tabs>
    
       
        </div>
      </div>
    </main>


    <FilterModal isModal_Filter={isModal_Filter} onClose={closeModalFilter}></FilterModal>
    <BottomTabs></BottomTabs> 
    {isLoading && <LoaderService />}

    </div>
  );
};

export default BottomTab3;