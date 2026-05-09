import {useEffect, useState} from "react"
  
  const Weather = () => {
    const [fiveDayForecast, setfiveDayForecast] = useState([]);
    const [tempIcon, setTempIcon] = useState("F");
    const [location, setLocation] = useState(null);
    const [locationList, setLocationList] = useState([]);
    const API_Key = "660b5c84f0d49c46880fc91eb0923a20";
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [day, setDay] = useState(0);

    useEffect(() =>{
      navigator.geolocation.getCurrentPosition(
        (position) =>{

          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
      },
      (err) => {
        console.log(err);
      });
    },[]);


    useEffect(() =>{
      if(lat == null || lon == null){
        return;
      }
      console.log(lat);
      console.log(lon);
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}&units=imperial`
      )
      .then((res) => res.json())
      .then((data) => {
        let count = 0;
        let store = [];
        setfiveDayForecast(data.list);
        setLocationList([]);
      })
      .catch((err) => console.log(err));
    },[lat, lon]);
    

    useEffect (() =>{
      if(location == null){
        return;
      }
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
          <div>
            <h3>Name: Kailun You</h3>
            <p>
              The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
            </p>
            <p>
              Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
            </p>
          </div>
          <input placeholder="Search City" onChange={(e)=> loadLocations(e.target.value)}></input>
            {locationList.map((index)=>
              <button onClick={()=> setLocation(index)}> {index} </button> 
            )}
          <br></br>
          <button onClick={()=> switchF()}>{tempIcon}</button>
          <h1>{location}</h1>
          <div>
            <button onClick={()=>setDay(0)}>Day 1</button>
            <button onClick={()=>setDay(8)}>Day 2</button>
            <button onClick={()=>setDay(16)}>Day 3</button>
            <button onClick={()=>setDay(24)}>Day 4</button>
            <button onClick={()=>setDay(32)}>Day 5</button>
            <br></br>
            {fiveDayForecast?.map((index) =>{
              if(tempIcon == "F"){
                if(fiveDayForecast[day].dt_txt.slice(0,10) == index.dt_txt.slice(0,10)){
                  return(
                    <p>Time: {index.dt_txt.slice(11,index.dt_txt.length-3)}  Temp: {Math.floor(index.main.temp)}*{tempIcon} Weather: {fiveDayForecast[day].weather[0].main}</p>
                  )
                }
              }
              else{
                if(fiveDayForecast[day].dt_txt.slice(0,10) == index.dt_txt.slice(0,10)){
                  return(
                    <p>Date: {index.dt_txt.slice(11,index.dt_txt.length-3)}   Average Temp: {Math.floor((index.main.temp - 32)/1.8)}*{tempIcon} Weather: {fiveDayForecast[day].weather[0].main}</p>
                  )
                }
              }
            })}
            {fiveDayForecast.length > 0 && (
              <div>
                <h1>Wind Speed:  {Math.floor(fiveDayForecast[day].wind.speed)} MPH</h1>
                <h1>Humidity:  {fiveDayForecast[day].main.humidity} %</h1>
              </div>
            )}
            <p>NOTE: Some City does not have Weather info</p>
          </div>
        </div>
    );
  }

  export default Weather;