import React,  { createContext, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Login from './screens/Login/Login';
import Forgot from './screens/Forgot/Forgot';
import Signup from './screens/Signup/Signup';
import Congratulations from './screens/Congratulations/Congratulations';

import BottomTab1 from './screens/BottomTab1/BottomTab1';
import BottomTab2 from './screens/BottomTab2/BottomTab2';
import BottomTab3 from './screens/BottomTab3/BottomTab3';

import About from './screens/About/About';
import Contact from './screens/Contact/Contact';
import Terms from './screens/Terms/Terms';
import Privacy from './screens/Privacy/Privacy';
import Settings from './screens/Settings/Settings';
import Notifications from './screens/Notifications/Notifications';
import Profile from './screens/Profile/Profile';
import BuildProfile from './screens/BuildProfile/BuildProfile';
import FriendProfile from './screens/FriendProfile/FriendProfile';
import PhotoVerification from './screens/PhotoVerification/PhotoVerification';
import BlockedUsers from './screens/BlockedUsers/BlockedUsers';
import ChatBetween from './screens/ChatBetween/ChatBetween';

import UpgradeAC from './screens/UpgradeAC/UpgradeAC';
import Test from './screens/Test/Test';

import { setStore, getStore, getUserToken, removeStore, clearStore } from './services/storageService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = ({ }) => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // console.log(isAuthenticated)

  useEffect(() => {
      if(token){
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }  
  }, []);





  const AuthStack = () => {
    return (
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    )
  }



  const AppStack = () => {
    return (
      <Routes>
        <Route exact path="/" element={<BottomTab2/>} />
        <Route path="/bottomTab1" element={<BottomTab1/>} />
        <Route path="/bottomTab2" element={<BottomTab2/>} />
        <Route path="/bottomTab3" element={<BottomTab3/>} />

        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/profile/:userId" element={<Profile/>} />
        <Route path="/congratulations" element={<Congratulations/>} />
        <Route path="/buildProfile" element={<BuildProfile/>} />
        <Route path="/friendProfile" element={<FriendProfile/>} />
        <Route path="/photoVerification" element={<PhotoVerification/>} />
        <Route path="/blockedUsers" element={<BlockedUsers/>} />
        <Route path="/chatBetween" element={<ChatBetween/>} />
        <Route path="/upgradeac" element={<UpgradeAC/>} />

      </Routes>
    )
  }



  return (
    <>
    <Router>
      {isAuthenticated ? <AppStack/> : <AuthStack/>}
    </Router>
    <ToastContainer />
    </>
  );
  
};

export default App;