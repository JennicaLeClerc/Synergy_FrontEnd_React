import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Endpoint from './Endpoint';

const GetReservationByUsername = ()=> {
	
	const [formValue, updateFormValue] = React.useState({
	username: ''
	});

	const handleSubmit = async() => {
		const resFormData = new FormData();
		resFormData.append("User Name", formValue.username)

		try {
			const response = await axios.get(Endpoint + "/usernamer?username=resFormData", {params:{pageNumber: 0, pageSize: 10, sortBy:'reservationID'}})
			.then((response) =>{
				console.log(response);
				document.body.innerHTML = {response};
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
				<h3>View Current Reservation</h3><br/>
				<input type="text" name="username" value={formValue.username} onChange={handleChange} placeholder='Enter UserName' /><br/><br/>
				<input type="submit" />
			</form>
			
			<footer id="footer-placeholder"></footer>
		</>
	)
};
 
export default GetReservationByUsername;