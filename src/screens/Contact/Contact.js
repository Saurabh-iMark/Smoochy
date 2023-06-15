import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import { BiChevronRight } from "react-icons/bi";
import { contact, getData, postFormData } from '../../services/authService';
import { setStore, getStore, getUserToken, removeStore, clearStore } from '../../services/storageService';
import LoaderService from '../../services/loader';

import { Accordion, AccordionItem } from '@szhsin/react-accordion';


const Contact = () => {

  const [faqsContent, setFAQsContent] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(faqsContent);

  const [isLoading, setIsLoading] = useState(false);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');





  useEffect(() => {
    const userToken = getUserToken().then( (res) => {
      console.log(res.token);
      handleFAQs_Data();
    })
  }, []);



  const handleFAQs_Data = () => {
    setIsLoading(true);
    getData('/faq', '').then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        setFAQsContent(res.data);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };


  const toggleQuestion = (id) => {
    setExpandedQuestion(id === expandedQuestion ? null : id);
  };




  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    console.log('Form submitted:', { name, email, subject, message });
    const payload = { name, email, subject, message };
    console.log(payload)


      setIsLoading(true);
      contact(name, email, subject, message).then((res) => {
        console.log(res)
        if(res.status === 'success'){ 
          // setTimeout( () => {
          //   const setToken = setStore('userToken', res.success).then( (res) => {
          //     console.log(res)
          //     if(res === true){
          //       window.location.href = '/';
          //       setIsLoading(false);
          //     }
          //   });   
          // }, 1500);
          setIsLoading(false);
        }else if(res.error){
          setIsLoading(false);
          //  newErrors.server = res.error;
          //  setErrors(newErrors);
        }
      }).catch(error => {
          setIsLoading(false);
          //  newErrors.server = error;
          //  setErrors(newErrors);
      });
    }






  return (
    <div className="app">

      <TopHeader></TopHeader>


      <main className="content-main">
      <div className="dashboard-content">
        <div style={{width: '90%', margin: '0px auto'}}>

        <Tabs style={{width: '100%'}}>
        <TabList>
          <Tab>Contact</Tab>
          <Tab>FAQ's</Tab>
        </TabList>
        <br />


        <TabPanel>
          <form onSubmit={handleFormSubmit}>
            <div style={{padding: 10}}>
  
              <div>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 10}}>Name</p>
                <div className="input-outer-div">
                  <input type="text" className="left-input" style={{color: '#333'}}
                   name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
              </div>
              <br />

              <div>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 10}}>Subject</p>
                <div className="input-outer-div">
                  <input type="text" className="left-input" style={{color: '#333'}}
                  name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required/>
                </div>
              </div>
              <br />

              <div>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 10}}>Email</p>
                <div className="input-outer-div">
                  <input type="email" className="left-input" style={{color: '#333'}}
                  name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
              </div>
              <br />

              <div>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 10}}>Message</p>
                <div className="input-outer-div">
                  <textarea id="message" rows="4" cols="50" className="left-input-textarea" style={{color: '#333'}}
                  name="message" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                </div>
              </div>
              <br />


        
            </div>

            <div style={{margin: '10px 10px 20px'}}>
                <button type="submit" className="button-A" style={{margin: 0}}>Submit</button>
            </div>
          </form>
        </TabPanel>


        <TabPanel>
        <div>

        {faqsContent.length > 0 ? (
          <>         
          {faqsContent.map((q, index) => (
            <div key={q.id}>
            <button onClick={() => toggleQuestion(index)}>
              {q.name}
            </button>
            {expandedQuestion === index && <p>{q.detail}</p>}
            </div>
           ))}

    <Accordion>
      <AccordionItem header="What is Lorem Ipsum?">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </AccordionItem>

      <AccordionItem header="Where does it come from?">
        Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla
        vel erat quis sodales. Nam ex enim, eleifend venenatis lectus
        vitae, accumsan auctor mi.
      </AccordionItem>

      <AccordionItem header="Why do we use it?">
        Suspendisse massa risus, pretium id interdum in, dictum sit
        amet ante. Fusce vulputate purus sed tempus feugiat.
      </AccordionItem>
    </Accordion>

           </>
        ) : (
          <div className="no-data-msg">No FAQ's data found!</div>
        )}
        </div>

        </TabPanel>
        </Tabs>
    
        </div>
      </div>
      </main>



      <BottomTabs></BottomTabs>
    
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Contact;