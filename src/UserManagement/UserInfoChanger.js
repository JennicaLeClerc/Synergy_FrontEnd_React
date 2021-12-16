import React, { useEffect, useState } from "react";
import { 
	Button, 
	Container,
	Row,
	Col,
	Form
} from "react-bootstrap";
import axios from "axios";
import parseJWT from "../parseJWT";
import Endpoint from "../Endpoint";

function UserInfoChanger({JWT}){

	// Getting current info
	const [userInput, setUserInput] = useState({
		username:'',
		password:'',
		firstName:'',
		lastName:'',
		email:''
	});

	useEffect(()=>{ Submit(); },[])
	const Submit = async (e) => {		
		var uID = parseJWT(JWT).ID;
		const response = await axios.get(Endpoint + "/users/" + uID, {headers:{"Authorization":"Bearer "+JWT}}).then(resp => resp);
		console.log(response);
		setUserInput({username:response.data.username, password:response.data.password, firstName:response.data.firstName, lastName:response.data.lastName, email:response.data.email});
	}

	// Updating userInfo
	let axiosConfig = {headers: {"Content-Type":"application/json", "Authorization":"Bearer "+JWT}};

	const [userFirstName, setUserFirstName] = useState({
		firstName:''
	});
	const [userLastName, setUserLastName] = useState({
		lastName:''
	});
	const [userEmail, setUserEmail] = useState({
		email:''
	});

	const changeFirstName = (e) => {
		e.preventDefault();
		setUserFirstName({ ...userFirstName, [e.target.name]: e.target.value });
	}
	const changeLastName = (e) => {
		e.preventDefault();
		setUserLastName({ ...userLastName, [e.target.name]: e.target.value });
	}
	const changeEmail = (e) => {
		e.preventDefault();
		setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
	}

	const submitFirstName = async (e) => {
		console.log('submited');
		console.log(userFirstName);
		e.preventDefault();
		//axios put call
		var uID = parseJWT(JWT).ID;
		const response = await axios.put(Endpoint + "/users/firstName/" + uID, userFirstName.firstName, axiosConfig);
		console.log(response);
		if(response.status === 200){
			setUserFirstName({firstName:''});
			Submit();
		}
	}
	const submitLastName = async (e) => {
		console.log('submited');
		console.log(userLastName);
		e.preventDefault();
		//axios put call
		var uID = parseJWT(JWT).ID;
		const response = await axios.put(Endpoint + "/users/lastName/" + uID, userLastName.lastName, axiosConfig);
		console.log(response);
		if(response.status === 200){
			setUserLastName({lastName:''});
			Submit();
		}
	}
	const submitEmail = async (e) => {
		console.log('submited');
		console.log(userEmail);
		e.preventDefault();
		//axios put call
		var uID = parseJWT(JWT).ID;
		const response = await axios.put(Endpoint + "/users/email/" + uID, userEmail.email, axiosConfig);
		console.log(response);
		if(response.status === 200){
			setUserLastName({email:''});
			Submit();
		}
	}

	return(
		<>
			<br/><br/><br/>
			<Container>
				<Form onSubmit={(e) => submitFirstName(e)}>
					<Form.Group as={Row} className="mb-3" controlId="formFirstName" >
						<Form.Label column sm="3">
							First Name
						</Form.Label>
						<Col sm="6">
							<Form.Control name="firstName" placeholder={userInput.firstName} value={userFirstName.firstName} onChange={(e)=> changeFirstName(e)}/>
						</Col>
						<Col sm="3">
							<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}} type="submit" value="Submit">
								Update
							</Button>
						</Col>
					</Form.Group>
				</Form>
				<Form>
					<Form.Group as={Row} className="mb-3" controlId="formLastName">
						<Form.Label column sm="3">
							Last Name
						</Form.Label>
						<Col sm="9">
							<Form.Control type="lastName" placeholder={userInput.lastName} value={userLastName.lastName} onChange={(e)=> changeLastName(e)}/>
						</Col>
						<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}} type="submit" value="Submit">
							Update
						</Button>
					</Form.Group>
				</Form>
				<Form>
					<Form.Group as={Row} className="mb-3" controlId="formEmail">
						<Form.Label column sm="3">
							Email
						</Form.Label>
						<Col sm="9">
							<Form.Control type="email" placeholder={userInput.email} value={userEmail.email} onChange={(e)=> changeEmail(e)}/>
						</Col>
						<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}} type="submit" value="Submit">
							Update
						</Button>
					</Form.Group>
				</Form>
			</Container>
		</>
	)
}

export default UserInfoChanger;