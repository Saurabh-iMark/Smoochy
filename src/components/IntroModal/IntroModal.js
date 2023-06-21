
import React, {useState, useEffect} from 'react';

import { IoCloseSharp } from 'react-icons/io5';

import { setStore, getStore, getUserToken } from '../../services/storageService';
import './IntroModal.css';



const IntroModal = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const introModalStatus = getStore('introModal').then( (res) => {
      // console.log(res);
      if(res === null){
        setTimeout( () => {
          setIsOpen(true);
        }, 5000);
      }else{
        setIsOpen(false);
      };
    })

    // console.log(introModalStatus);
  }, []);


  const closeModal = () => {
    const setStatus = setStore('introModal', true).then( (res) => {
      // console.log(res);
      if(res === true){
        setIsOpen(false);
      };
    });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-content">
      <button className="close-button" onClick={closeModal}>
        <IoCloseSharp style={{color: '#333', fontSize: 30}}></IoCloseSharp>
      </button>
      <h2>Lorem ipsum dolor <br /> sit amet, consectetur <br /> adipiscing elit</h2>
     

      <p className="subtitle-p" style={{marginTop: 30}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore sed do eiusmod tempor incididunt ut labore et dolo magna aliqua.</p>
    
      <br />
      <div>
          <button type="button" className="button-C" onClick={closeModal}>Start Chatting</button>
      </div>
      <br />

    </div>
    </div>
  );
};

export default IntroModal;

