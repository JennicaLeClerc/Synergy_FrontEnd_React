import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createReservation.css';
import axios from 'axios';
import parseJWT from "./parseJWT";

const Reservation = ({JWT}) => {
  
	let navigate = useNavigate;
	let jsonPayLoad = parseJWT(JWT);
	let userReserveID = parseInt(jsonPayLoad.ID);

 	const [formValue, updateFormValue] = React.useState({
		startDate: '',
		endDate: '',
		userReserve: {
			userID: userReserveID
		},
		accommodations:''
 	});


	 const handleChange = (e) => {
		 e.preventDefault();
		 updateFormValue({...formValue,
			[e.target.name]: e.target.value});
	 }


	 let axiosConfig = {
		'Content-Type':'application/json',
		'Authorization':'Bearer ' + JWT
	 };

	 const handleSubmit = async (e) => {
		 try{
			const response = await axios.post("http://localhost:5000/reservations/save", formValue, axiosConfig);

			if(response.status == 200){
				navigate("/");
			}
		 }catch (e){
			 console.log(e);
		 }
	 }

  	return (
		<body >
		<nav id="nav-placeholder"></nav>
		<div style={{ backgroundColor: '#e9ecef', 
			display: 'flex', justifyContent: 'center', paddingTop:'30px'}} >
			<h1>Synergy Hotel Management System</h1>
		</div> 
		<div style={{
			backgroundColor: '#e9ecef',
			display: 'flex', justifyContent: 'center', paddingBottom:'40px', 
			marginBottom: '30px'
		}}>
					
		</div>	
		<form className="resForm">
		<h3>Book A New Reservation</h3>
	<label>Your Name</label>
			<input type="text" name="fullName" value={formValue.fullName} /><br/><br/>
		<label>Your Email</label>
			<input type="text" name ="email" value={formValue.email}/><br/><br/>
		<label>Your Phone </label>
			<input type="text" name="phone" value={formValue.phone} /><br/><br/>
		<label>Adults</label> 
			<input type="number" name="adults" value={formValue.adults} /><br/><br/>
		
		<label>Children </label>
			<input type="number" name="children" value={formValue.children} /><br/><br/>
		
		<label>Check-in Date</label>
			<input type="date" name="startDate" value={formValue.checkin} onChange={handleChange} /><br/><br/>
		
		<label>Check-out Date </label>
			<input type="date" name="endDate" value={formValue.checkout} onChange={handleChange}  /><br/><br/>
	
		<label>Select Room Preference </label><br/><br/>
		<select name="choice" value={formValue.choice}>
			<option value="">Choose a Room from the List</option>
			<option value="connecting">1 Bed</option>
			<option value="adjoining">2 Beds</option>
			<option value="adjacent">3 Beds</option>
		</select><br/><br/>
		
	<label>Anything Else?</label>
	<textarea value="accommodations" value={formValue.accommodations} onChange={handleChange}></textarea><br/><br/>
						
	<input type="submit" />
		</form>
		</body>
	)
	};

export default Reservation;