import axios from 'axios';


  const API_URL = 'https://smoochy.customerdevsites.com/api'; // Replace with your API URL

  // const authService = axios.create({
  //   baseURL: API_URL,
  // });



  // const login = (email, password) => {
  //     return axios
  //       .post(API_URL + "login", {email, password}).then(response => {
  //         console.log(response);
  //         // if (response.data.accessToken) {
  //         //   localStorage.setItem("user", JSON.stringify(response.data));
  //         // }
    
  //         return response.data;
  //       });
  // }



  const login = async (email, password) => {
      let nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'mode': 'no-cors'
      };

      const res = await fetch(API_URL + "/login", {method: 'POST', headers: nativeHeaders, body: JSON.stringify({ email, password })});
      const finalRes = await res.json();
      return finalRes;
  }

    
  const register = (name, email, dob, gender, location, phone, creativity, why_here, image)  => {
      return axios.post(API_URL + "/register", {name, email, dob, gender, location, phone, creativity, why_here, image}).then(response => {
        console.log(response);
        return response.data;
      })
  }
    

  const contact = async (name, email, subject, message) => {
    let nativeHeaders = {
         'Content-Type': 'application/json', 
         'Access-Control-Allow-Origin': '*',
         'mode': 'no-cors'
    };

    const res = await fetch(API_URL + "/contact", {method: 'POST', headers: nativeHeaders, body: JSON.stringify({ name, email, subject, message })});
    const finalRes = await res.json();
    return finalRes;
}



  const postData = async (route, payload, token) => {
    let nativeHeaders = {
         'Content-Type': 'application/json', 
         'Access-Control-Allow-Origin': '*',
         'mode': 'no-cors'
    };

    const res = await fetch(API_URL + route, {method: 'POST', headers: nativeHeaders, body: JSON.stringify({payload})});
    const finalRes = await res.json();
    return finalRes;
  }

  const postFormData = async (route, payload, token) => {
    console.log(route, payload, token);
    console.log(payload);
    let nativeHeaders;
    if(token === '') {
        nativeHeaders = {
           'Content-Type': 'multipart/form-data', 
           'Access-Control-Allow-Origin': '*', 
        };
    }else {
        nativeHeaders = {
           'Content-Type': 'multipart/form-data', 
           'Access-Control-Allow-Origin': '*',
           'Authorization': `Bearer ${token}`
        };
    }


    const res = await fetch(API_URL + route, {method: 'POST', headers: nativeHeaders, body: payload});
    console.log(res);
    const finalRes = await res.json();
    console.log(finalRes);
    return finalRes;
  }


  const getData = async (route, token) => {
    let nativeHeaders;
    if(token === '') {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*', 
        };
    }else {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'Authorization': `Bearer ${token}`
        };
    }

    const res = await fetch(API_URL + route, {method: 'GET', headers: nativeHeaders});
    console.log(res);
    const finalRes = await res.json();
    return finalRes;
  }




export {login, register, contact, postData, postFormData, getData}