import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	Row,
	Col
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Endpoint from "./Endpoint";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//let isLoggedin = []useState();

const LoginPage = ({JWT, updateJWT, userType}) => {
	useEffect(cleanJWT,[])
	function cleanJWT(){
		updateJWT("")
	}
	const [userInput, setUserInput] = useState({
		username:'',
		password:'',
		role:userType
	});

	const [error, setError] = useState(false);
	const [success, setSucccess] = useState(false);

	let navigate = useNavigate();
	const{Username, Password} = userInput;
	
	const change = (e) => {
		setError(false)
		e.preventDefault();
		setUserInput({...userInput, [e.target.name]: e.target.value, ['Content-type']: 'application/json'})
	}

	const submit = async (e) => {
		e.preventDefault();
		
		try{
			const response = await axios.post(Endpoint + "/authenticate", userInput).then(resp => resp);
	
			console.log(response);
			if(response.status == 200){

				setSucccess(true);
				toast.success("Logged in!");
				updateJWT(response.data.jwt)
				new Promise(() => {
					setTimeout(() => {
						navigate("/");
					}, 2200);
				});
			} else {
				setError(true)
			}
		} catch (e){
			console.log(e);
			setError(true)
		}
	}

	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col md="auto" className = "text-center">
						<form id="login-form" onSubmit={(e) => submit(e)}>
							<input type="text" name="username" id="username-field" className="login-form-field" placeholder="Username" onChange={(e)=> change(e)} required/>
							<br/><br/>
							<input type="password" name="password" id="password-field" className="login-form-field" placeholder="Password" onChange={(e)=> change(e)} required/>
							<br/><br/>
							<Button style={{ backgroundColor: "#f26926"}} type="submit" value="Submit" >Submit</Button>
							<br/><br/>
							<p id="forgot-password" align="center"><a href="#">Forgot Password?</a></p>
						</form>
					</Col>
					<Col></Col>
				</Row>
			</Container>
			<div style={{textAlign: 'center', color:'red'}}>
				<br></br>
				{error ?
					<h3>The credentails are incorrect, try again!</h3>
					: ''}
				{success ? 
					<ToastContainer type="success" />
					: ''}
			</div>
		</>
	)
}

export default LoginPage;