import React, {useState, useEffect} from 'react';
import TopHeader from '../../components/TopHeader';

import { Link, useParams } from 'react-router-dom';
import BottomTabs from '../../components/BottomTabs';

import { IoCloseSharp, IoCheckmarkSharp, IoArrowDownSharp } from "react-icons/io5";
import { BsFillChatRightDotsFill } from "react-icons/bs";

import profile1 from '../../assets/PNG/profile1.png';
import profile2 from '../../assets/PNG/profile2.png';
import profile3 from '../../assets/PNG/profile3.png';
import profile4 from '../../assets/PNG/profile4.png';
import profile5 from '../../assets/PNG/profile5.png';
import profile6 from '../../assets/PNG/profile6.png';

import { getData, postData } from '../../services/authService';
import { setStore, getStore, getUserToken } from '../../services/storageService';
import LoaderService from '../../services/loader';



const Profile = () => {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const [userData, setUserData] = useState([]);
  const [basicsData, setBasicsData] = useState([]);
  const [interestsData, setInterestsData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
      getUserProfile_Data();
  }, []);

 

  const getUserProfile_Data = () => {
    setIsLoading(true);
    postData('/user-profile', { id: userId }, token).then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        setUserData(res.data);

        setBasicsData(res.data.height,res.data.nationality, res.data.education, 
          res.data.ethnicity, res.data.why_here, res.data.eye_colour, res.data.body_type, 
          res.data.do_smoke, res.data.do_drink, res.data.personality_type, res.data.like_night_out,
          res.data.like_night_in, res.data.like_have_children);
        
        setInterestsData(res.data)
        console.log(basicsData);
        console.log(interestsData);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };



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
          <div className="item1" style={{height: '82vh', borderRadius: 20, position: 'relative', backgroundImage: `url(${userData.image})`}}>
          <div className="linear-background" style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 180}}>
              <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 95}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px'}}>
                  <div>              
                    <h3 style={{margin: '5px 0px', color: '#fff', fontWeight: 600}}>{userData.name}&nbsp;
                    {userData.age !== '0' &&
                      userData.age
                    }   
                    
                    </h3>
                    <h5 style={{margin: '5px 0px', color: '#fff', fontWeight: 300}}>{userData.location} {userData.gender}</h5>
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

         {userData.about == null && (
           <>
            <br /> <br />
           </>
         )}

          {userData.about && (
          <div style={{backgroundColor: '#b7ecfe', borderRadius: 20, padding: 20, margin: '12px 0px'}}>
            <h4 style={{color: '#69a4c0', fontWeight: 600}}>“{userData.about}”</h4>
          </div>
          )}


          {(userData.image1 || userData.image2) && (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
            {userData.image1 && (
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${userData.image1})`}}></div>
            )}
             {userData.image2 && (
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${userData.image2})`}}></div>
            )}
          </div>
          )}






          <div style={{margin: '25px 0px'}}>
            <h4 style={{textAlign: 'center', margin: '35px 0px 20px'}}>My Basics</h4>
            <div className="chip-container"> 
                {my_basics.map((text, index) => (
                  <div className="normalChip" style={{backgroundColor: '#f7f7f7'}}>{text}</div>
                ))}
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}></div>
          </div>
    

          {(userData.image3 || userData.image4) && (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
            {userData.image3 && (
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${userData.image3})`}}></div>
            )}
             {userData.image4 && (
            <div className="item1" style={{height: '300px', width: '48%', borderRadius: 20, backgroundImage: `url(${userData.image4})`}}></div>
            )}
          </div>
          )}


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
                    <h1 style={{margin: '5px 0px', color: '#fff', fontWeight: 600}}>{userData.name} {userData.age}</h1>
                    <h5 style={{margin: '5px 0px', color: '#fff', fontWeight: 300}}>{userData.location} {userData.gender}</h5>
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
    {isLoading && <LoaderService />}
    </div>
  );
};

export default Profile;