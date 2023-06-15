import React, {useEffect, useState} from 'react';

import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Link } from 'react-router-dom';

import IntroModal from '../../components/IntroModal/IntroModal';

import { IoEyeSharp } from 'react-icons/io5';
import { BsFillChatRightDotsFill } from "react-icons/bs";

import logo from '../../assets/SVG/logo.svg';
import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';

import { getData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const BottomTab2 = () => {


  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const userToken = getUserToken().then( (res) => {
      console.log(res.token);
      handleUserList_Data(res.token);
    })
  }, []);



  const handleUserList_Data = (token) => {
    setIsLoading(true);
    getData('/user-list', token).then((res) => {
       console.log(res)
       if(res.success){ 
        setIsLoading(false);
        setUsersList(res.data)
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  // const usersList = [
  //   {
  //     id: '1',
  //     name: 'Natasha W.',
  //     avatar: profile1,
  //   },
  //   {
  //     id: '2',
  //     name: 'Jamie W.',
  //     avatar: profile2,
  //   },
  //   {
  //     id: '3',
  //     name: 'Natasha W.',
  //     avatar: profile3,
  //   },
  //   {
  //     id: '4',
  //     name: 'Ally A.',
  //     avatar: profile4,
  //   },
  //   {
  //     id: '5',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '6',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '7',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '8',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '9',
  //     name:'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '10',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '11',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '12',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '13',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '13',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '14',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  //   {
  //     id: '15',
  //     name: 'Mallory W.',
  //     avatar: profile5,
  //   },
  // ];





  return (

    <div className="app">
    <TopHeader></TopHeader>

    <main className="content-main">
      <div className="dashboard-content">
      <div style={{width: '90%', margin: '0px auto'}}>


       {usersList.length > 0 ? (
        <>
        {usersList.map((user) => (
        <div key={user.id} className="userList-Div">
          <Link to="/friendProfile">
          <div className="userAvatar-Div">
            <img src={user.image} alt="User Avatar" />
          </div>
          </Link>
          <div style={{width: 160}}>
            <h4>{user.name}</h4>
          </div>
          <div> 
            <IoEyeSharp style={{color: '#733faa', fontSize: 22}}></IoEyeSharp>
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
        ): (
        <div className="no-data-msg">No User data found!</div>
        )}


      </div>
      </div>
    </main>

    {/* <IntroModal></IntroModal> */}
    <BottomTabs></BottomTabs> 
    {isLoading && <LoaderService />}

    </div>
  );
};

export default BottomTab2;