import React, { useEffect } from 'react';
import { useState } from 'react';
import "./Weather.css";
import axios from 'axios';

function Weatherapi() {

	const [weather, setWeather] = useState('');
	const apiKey = '8629eca54e1aac09e8339e18499f009f';
	useEffect(()=>{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(apiCall)
		}
	},[])
	
	
	const apiCall = async (e) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&units=imperial&appid=${apiKey}`;
		const req = axios.get(url);
		const res = await req;
		setWeather(res.data)
	}
	
	return weather?  <><p style={{"color":"white"}}>{weather.name+" : "+weather.main.temp + "°F"}<img src={"http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"} width={"64px"} /></p></> :<></>
}

export default Weatherapi;