import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
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
import Endpoint from "../Endpoint";

const EmployeeAccountManagement = ({JWT}) => {
	const [employeeInput, setEmployeeInput] = useState({
		username:'',
		password:'',
		firstName:'',
		lastName:'',
		employeeType: ''
	});

	useEffect(()=>{ Submit(); },[])
	const Submit = async (e) => {		
		var eID = parseJWT(JWT).ID;
		const response = await axios.get(Endpoint + "/employee/" + eID, {headers:{"Authorization":"Bearer "+JWT}}).then(resp => resp);
		console.log(response);
		setEmployeeInput({username:response.data.username, password:response.data.password, firstName:response.data.firstName, lastName:response.data.lastName, employeeType:response.data.employeeType});
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
							<	Form.Control  plaintext readOnly type="username" placeholder={employeeInput.username} />
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
								<Form.Control  plaintext readOnly type="First Name" placeholder={employeeInput.firstName} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainLastName">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Last Name
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="Last Name" placeholder={employeeInput.lastName} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainEmail">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Employee Type
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="Employee Type" placeholder={employeeInput.employeeType} />
							</Col>
						</Form.Group>
					</Col>
					<Col>
						<Row>
							<Button className="mb-3" size="sm"  style={{backgroundColor: "#f26926", width:"25%"}}>
								<Link to="/employee/edit" style={{color:"white", textDecoration:"none"}}>
									Edit Info
								</Link>
							</Button>
						</Row>
						<Row>
							<Button className="mb-3" variant="outline-primary" size="sm" style={{backgroundColor: "#f26926", width:"40%"}}>
								<Link to="/employee/change_password" style={{color:"white", textDecoration:"none"}}>
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


export default EmployeeAccountManagement;