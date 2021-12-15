import React, {useState} from "react";
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
import UserInfoChanger from "./UserInfoChanger";
import PasswordChanger from "./PasswordChanger";

const UserAccountManagement = () => {
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
								<Form.Control  plaintext readOnly type="Username" placeholder="Current Username" />
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
								<Form.Control  plaintext readOnly type="First Name" placeholder="Current First Name" />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainLastName">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Last Name
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="Last Name" placeholder="Current Last Name" />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlainEmail">
							<Form.Label column sm="3" style = {{fontWeight:"bold"}}>
								Email
							</Form.Label>
							<Col sm="9">
								<Form.Control  plaintext readOnly type="Email" placeholder="email@email.com" />
							</Col>
						</Form.Group>
					</Col>
					<Col>
						<Row>
							<Button className="mb-3" variant="outline-primary" size="sm" href='#' style={{width:"25%"}}>
								Edit Info
							</Button>
						</Row>
						<Row>
							<Button className="mb-3" variant="outline-primary" size="sm" href='#' style={{width:"40%"}}>
								Change Password
							</Button>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	)
}



export default UserAccountManagement;