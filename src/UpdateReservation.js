import React from 'react';
import axios from 'axios';
import Endpoint from './Endpoint';

const UpdateReservation = ()=> {
	const [formValue, updateFormValue] = React.useState({
		reservationID: '',
		checkin: '',
		checkout: ''
	});

	const handleSubmit = async() => {
		const resFormData = new FormData();
		resFormData.append("Reservation ID", formValue.reservationID)
		resFormData.append("Check-in Date", formValue.checkin)
		resFormData.append("Check-out Date", formValue.checkout)
		try {
			const response = await axios({
				method: "post",
				url:Endpoint + "/id",
				data:resFormData,
				headers:{"Content-Type":"application/json"},
			});
		} catch(error) {
			console.log(error)
		}
	}

	const handleChange = (event) => {
		updateFormValue({
			...formValue,
			[event.target.name]: event.target.value
		});
	}

	return (
		<>
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
				<h3>Change Reservation Date</h3>
				<label className="labelCss"  >Your Reservation ID</label>
				<input type="text" name="reservationID" value={formValue.reservationID} onChange={handleChange} />
				<br/><br/>
				<label className="labelCss"  >Check-in Date</label>
				<input type="date" name="checkin" value={formValue.checkin} onChange={handleChange} />
				<br/><br/>
				<label className="labelCss"  >Check-out Date </label>
				<input type="date" name="checkout" value={formValue.checkout} onChange={handleChange}/>
				<br/><br/>
				<input type="submit" className="submission" />
			</form>
			<footer id="footer-placeholder"></footer>
		</>
	)
};

export default UpdateReservation;