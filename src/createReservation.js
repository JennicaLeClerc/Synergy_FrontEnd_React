import React, {useState} from "react";import ReactDOM from 'react-dom';
import { 
	Form,
	Button,
	Row,
	Container,
	Col
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './createReservation.css';
import axios from 'axios';
import parseJWT from "./parseJWT";
import Endpoint from './Endpoint';

const Reservation = ({JWT}) => {
  
	let jsonPayLoad = parseJWT(JWT);
	let userReserveID = parseInt(jsonPayLoad.ID);

	const [userInput, setUserInput] = useState({
		startDate:'',
		endDate:'',
		userReserve: {
			userID:userReserveID
		},
		accommodations:''
	});

	let navigate = useNavigate();
	const {startDate, endDate, userReserve, accommodations} = userInput;

	const change = (e) => {
		e.preventDefault();
		setUserInput({...userInput, [e.target.name]: e.target.value})
	}

	console.log(userInput);


	let axiosConfig = {
		headers: {
			'Content-Type':'application/json',
			'Authorization':'Bearer ' + JWT
		}
	};

	console.log(userInput);
	const submit = async (e) => {
		e.preventDefault();
		try{

			let body = {...userInput};
			body.startDate = new Date(userInput.startDate);
			body.endDate = new Date(userInput.endDate);

			const response = await axios.post(Endpoint + "/reservations/save", body, axiosConfig);
	
			console.log(response);
			if(response.status == 200){
				alert("Successfully Booked a Reservation!");
				navigate("/");
			}
		} catch (e){
			console.log(e)
		}
	}

	return(
		<>
		<br/><br/><br/>
		<Container>
			<Row>
				<Col></Col>
				<Col md="auto" className = "text-center">
				<body className="reserveBody">
					<form id="reserve" onSubmit={(e) => submit(e)}>

					<div class="elem">
						<label className="reserveLabel" htmlFor="name">Name</label>
						
						<input type="name" id="Name" name="Name"/>	
					</div>
					<div class="elem">
						<label className="reserveLabel" htmlFor="phone">Phone Number</label>
						
						<input type="phone" id="phone" name="phone" />
					</div>
					<div className="dateElem">
						<label className="reserveLabel" htmlFor="startDate">Check-in Date</label>
						
						<input type="date" id="startDate" className="checkdates" name="startDate" onChange={(e)=> change(e)} required/>	
					</div>
					<div className="dateElem">
						<label className="reserveLabel" htmlFor="endDate">Check-out Date</label>
						
						<input type="date" id="endDate" className="checkDates" name="endDate" onChange={(e)=> change(e)} required/>
					</div>	
					<div class="elem">
						<label className="reserveLabel" htmlFor="room-selection">Select Room Preference</label>
						
						<select id="room-selection" name="room_preference" required>
							<option value="">Choose a Room from the List</option>
							<option value="connecting">1 Bed</option>
							<option value="adjoining">2 Beds</option>
							<option value="adjacent">3 Beds</option>
						</select>
					</div>
						
					<div class="elem">
						<label className="reserveLabel" htmlFor="message">Anything Else?</label>
						
						<textarea id="accommodations" name="accommodations" placeholder="Please make any additional requests here." onChange={(e)=> change(e)}></textarea>
						
					</div>
						<Button style={{ backgroundColor: "#f26926"}} type="submit" value="Submit" >Submit</Button>
					</form>
				</body>
				</Col>
				<Col></Col>
			</Row>
		</Container>

		</>				
	
	)
};

export default Reservation;