import React, {useState, useEffect} from "react";
import { getData } from "../../../services/authService";
import LoaderService from '../../../services/loader';




const Location = ({setLocation, errors}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);


  useEffect(() => {
    handleLocation_Data();
  }, []);



  const handleLocation_Data = () => {
    setIsLoading(true);
    getData('/location', '').then((res) => {
       console.log(res);
       if(res.status === 'success'){ 
        // const newArray = res.data.map(item => item['name']);
        const newArray = res.data.map(item => ({
          value: item['id'],
          label: item['name']
        }));
        setLocationOptions(newArray);
       }
       setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };




  return (
  <div style={{ height: 260 }}>    
    <h2>
      What town or city are <br /> you currently located in?
    </h2>
    <div style={{ marginBlockStart: "10%" }}>
      <div className="input-outer-div-select">
          <select id="location" name="location" className="left-input-select" onChange={(e) => {
            setLocation(e.target.value);
          }}>
              {locationOptions.map((item) => (
               <option value={item.value}>{item.label}</option>
              ))}
          </select>
      </div>
      {errors && (
        <p style={{ color: "#ff0037" }}>{errors}</p>
      )}
    </div>
    {isLoading && <LoaderService />}
  </div>
  )
};

export default Location;
