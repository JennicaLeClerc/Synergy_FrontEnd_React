import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link
} from "react-router-dom";
import { 
	Button, 
	Container,
	Row,
	Col,
	Form
} from "react-bootstrap";
import axios from "axios";
import parseJWT from "../parseJWT";

const UserAccountManagement = ({JWT}) => {
	const [userInput, setUserInput] = useState({
		username:'',
		password:'',
		firstName:'',
		lastName:'',
		email:''
	});

	const change = (e) => {
		e.preventDefault();
		setUserInput({...userInput, [e.target.name]: e.target.value, ['Content-type']: 'application/json'})
	}

	useEffect(()=>{ Submit(); },[])
	const Submit = async (e) => {		
		var uID = parseJWT(JWT).ID;
		const response = await axios.get("http://localhost:5000/users/" + uID, {headers:{"Authorization":"Bearer "+JWT}}).then(resp => resp);
		console.log(response);
		setUserInput({username:response.data.username, password:response.data.password, firstName:response.data.firstName, lastName:response.data.lastName, email:response.data.email});
	}

	return(
		<>
			<br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col>
						<Form.Group as={Row} className="mb-3" controlId="formPlainUsername">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Username
							</Form.Label>
							<Col sm="9">
							<	Form.Control  plaintext readOnly type="username" placeholder={userInput.username} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainPassword">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Password
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="password" placeholder="****************" />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainFirstName">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								First Name
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="First Name" placeholder={userInput.firstName} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainLastName">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Last Name
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="Last Name" placeholder={userInput.lastName} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainEmail">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Email
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="Email" placeholder={userInput.email} />
							</Col>
						</Form.Group>
					</Col>
					<Col>
						<Row>
							<Button className="mb-3" size="sm"  style={{backgroundColor: "#f26926", width:"25%"}}>
								<Link to="/users/edit" style={{color:"white", textDecoration:"none"}}>
									Edit Info
								</Link>
							</Button>
						</Row>
						<Row>
							<Button className="mb-3" variant="outline-primary" size="sm" style={{backgroundColor: "#f26926", width:"40%"}}>
								<Link to="/users/change_password" style={{color:"white", textDecoration:"none"}}>
									Change Password
								</Link>
							</Button>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	)
}



export default UserAccountManagement;