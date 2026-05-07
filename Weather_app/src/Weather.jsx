import {useEffect, useState} from "react"
  
  const Weather = () => {
    const [fiveDayForecast, setfiveDayForecast] = useState([]);
    const [tempIcon, setTempIcon] = useState("F");
    const [location, setLocation] = useState("New York");
    const [locationList, setLocationList] = useState([]);
    const API_Key = "660b5c84f0d49c46880fc91eb0923a20";
    useEffect (() =>{
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_Key}&units=imperial`
      )
      .then((res) => res.json())
      .then((data) => {
        let count = 0;
        let store = [];
        setfiveDayForecast(data.list);
        setLocationList([]);
       })
      .catch((err) => console.log(err));
    },[location]);

    const loadLocations = (location) =>{
      setLocationList([]);
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_Key}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocationList(data.map((index) => index.name + ", " + index.country));
        })
    }

    const switchF =()=>{
      if(tempIcon == "F"){
        setTempIcon("C");
      }
      else{
        setTempIcon("F");
      }
    }
    
    

    return(
        <div>
          <input placeholder="Search City" onChange={(e)=> loadLocations(e.target.value)}></input>
            {locationList.map((index)=>
              <button onClick={()=> setLocation(index)}> {index} </button> 
            )}
          <br></br>
          <button onClick={()=> switchF()}>{tempIcon}</button>
          <h1>{location}</h1>
            <div>
              {fiveDayForecast?.map((index) =>{
                if(tempIcon == "F"){
                  return(
                    <p>Date:{index.dt_txt.slice(5,index.dt_txt.length-3)}   Average Temp:{Math.floor(index.main.temp)}*{tempIcon} </p>
                  )
                }
                else{
                  return(
                    <p>Date:{index.dt_txt.slice(5,index.dt_txt.length-3)}   Average Temp:{Math.floor((index.main.temp - 32)/1.8)}*{tempIcon} </p>
                  )
                }
                })}
              <p>NOTE: Some City does not have Weather info</p>
            </div>
        </div>
    );
  }

  export default Weather;