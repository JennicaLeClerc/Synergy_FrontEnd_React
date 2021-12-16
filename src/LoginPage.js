import React, { useState } from "react";
import {
    Button,
    Container,
    Form,
    FormCheck,
	Row,
	Col
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Endpoint from "./Endpoint";

//let isLoggedin = []useState();

const LoginPage = ({JWT, updateJWT, userType}) => {
	const [userInput, setUserInput] = useState({
		username:'',
		password:'',
		role:userType
	});

	let navigate = useNavigate();
	const{Username, Password} = userInput;

	const change = (e) => {
		e.preventDefault();
		setUserInput({...userInput, [e.target.name]: e.target.value, ['Content-type']: 'application/json'})
	}

	const submit = async (e) => {
		e.preventDefault();
		
		try{
			const response = await axios.post(Endpoint + "/authenticate", userInput).then(resp => resp);
	
			console.log(response);
			if(response.status == 200){
				updateJWT(response.data.jwt)
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
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="hide1" id = "error">
				<p align="center">*Username or Password are Incorrect*</p>
			</div>
			<div className="col-sm-4"></div>
		</div>
	</>
	)
}


export default LoginPage;