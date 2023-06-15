import React from 'react';
import TopHeader from '../../components/TopHeader';

import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import BottomTabs from '../../components/BottomTabs';

const Notifications = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


  return (
    <div className="app">

    <TopHeader></TopHeader>

    <main className="content-main">
    <div className="dashboard-content" style={{flexDirection: 'column'}}>
      <div style={{width: '90%', margin: '0px auto', height: '83vh', position: 'relative'}}>
       
        <div className="title-div" style={{textAlign: 'center', marginTop: 30, marginBottom: 20}}>Notification Settings</div>
       
        <div style={{backgroundColor: '#fff', padding: 20, borderRadius: 20}}>

          <div className="title-div" style={{color: '#000', marginTop: 0, marginBottom: 10}}>New Contact Messages</div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Push notifications</div>
           <Switch checked={checked} onChange={handleChange}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>
          <Divider />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Emails</div>
           <Switch checked={checked} onChange={handleChange}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>

        </div>

        <br />

        <div style={{backgroundColor: '#fff', padding: 20, borderRadius: 20}}>

          <div className="title-div" style={{color: '#000', marginTop: 0, marginBottom: 10}}>Existing Contact Messages</div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Push notifications</div>
           <Switch checked={checked} onChange={handleChange}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>
          <Divider />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14}}>
           <div className="title-div" style={{color: '#000', fontSize: 14, fontWeight: 600, marginTop: 0}}>Emails</div>
           <Switch checked={checked} onChange={handleChange}
             inputProps={{ 'aria-label': 'controlled' }}/>            
          </div>

        </div>


      </div>

    </div>
    </main>

    <BottomTabs></BottomTabs>
    </div>
  );
};

export default Notifications;