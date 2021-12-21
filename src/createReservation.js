import React, {useState} from "react";
import ReactDOM from 'react-dom';
import { 
	Button,
	Row,
	Container,
	Col,
	FloatingLabel
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './createReservation.css';
import axios from 'axios';
import parseJWT from "./parseJWT";
import Endpoint from './Endpoint';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateReservation = ({JWT}) => {
  
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
	const [error, setError] = useState(false);
	const [success, setSucccess] = useState(false);

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

			const response = await axios.post(Endpoint + "/reservations", body, axiosConfig);
	
			console.log(response);
			if(response.status == 200){
				setSucccess(true);
				toast.success("Successfully Booked a Reservation!");
				new Promise(() => {
					setTimeout(() => {
						navigate("/user");
					}, 2200);
				});
			} else {
				setError(true)
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
						<form id="reserve" onSubmit={(e) => submit(e)}>
							<div className="elem">
								<label className="reserveLabel" htmlFor="name">Name</label>
								<input type="name" id="Name" name="Name"/>	
							</div>
							<div className="elem">
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
							<div className="elem">
								<label className="reserveLabel" htmlFor="room-selection">Select Room Preference</label>
								<select id="room-selection" name="room_preference" required>
									<option value="">Choose a Room from the List</option>
									<option value="connecting">1 Bed</option>
									<option value="adjoining">2 Beds</option>
									<option value="adjacent">3 Beds</option>
								</select>
							</div>
							<div className="elem">
								<label className="reserveLabel" htmlFor="message">Anything Else?</label>
								<textarea id="accommodations" name="accommodations" placeholder="Please make any additional requests here." onChange={(e)=> change(e)}></textarea>
							</div>
							<Button style={{ backgroundColor: "#f26926"}} type="submit" value="Submit" >Submit</Button>
						</form>
					</Col>
					<Col></Col>
				</Row>
			</Container>
			<div style={{textAlign: 'center', color:'red'}}>
				<br></br>
				{error ?
					<h3>Something went wrong, please try again!</h3>
					: ''}
				{success ? 
					<ToastContainer type="success" />
					: ''}
			</div>
		</>
	)
};

export default CreateReservation;