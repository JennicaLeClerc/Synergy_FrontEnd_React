import React from 'react';
import { useState } from 'react';
import "./Weather.css";
import axios from 'axios';

function Weatherapi() {

	const [weather, setWeather] = useState('');
	const [city, setCity] = useState('');
	const apiKey = '8629eca54e1aac09e8339e18499f009f';

	const apiCall = async (e) => {
		e.preventDefault()
		const loc = e.target.elements.loc.value
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
		const req = axios.get(url);
		const res = await req;
		setWeather({
			descp: res.data.weather[0].description,
			temp: res.data.main.temp,
			city: res.data.name,
			humidity: res.data.main.humidity,
			press: res.data.main.pressure,
		})

		setCity(res.data.name)
	}

	//Converting K to C
	let k = weather.temp;
	let C = k - 273.15

	const Weath = () => {
		return <div>
			<div className="winfo">
				Weather forecast for {city}
				<hr></hr>
			</div>
			<div className="Weath">
				<div className="welement">
					Weather : {weather.descp}
				</div>
				<div className="welement">
					Temperature : {C.toFixed(2)} &#8451;
				</div>
				<div className="welement">
					Humidity :{weather.humidity} %
				</div>
				<div className="welement">
					Pressure :  {weather.press} 
				</div>
			</div>
		</div>
	}

	return (
		<>
			<div className="weathhead">Synergy Hotel Management</div>
			<div className="centerHeading" >
				<h4 className="header4" >Check out Weather Forecast</h4>
				<h3 className="weatherPic"></h3>
			</div>
			<div className="weatherWrapper">
				<div className="">
					<form onSubmit={apiCall} className="WeatherForm">
						<input type="text" 
						placeholder="city" 
						name="loc" />
						<button className="weatherbtn">Look By City</button>
					</form>
					{weather && <Weath />}
				</div>
			</div>
		</>
	)
}

export default Weatherapi;