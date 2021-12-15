import React, {useState} from "react";
import { 
	Button, 
	Container,
	Row,
	Col
} from "react-bootstrap";
import axios from "axios";

function UserInfoChanger(){
	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col></Col>
					<Col>
						current last name
						<br/><br/>
						current first name
						<br/><br/>
						current email
						<br/><br/>
					</Col>
					<Col>
						<form id="login-form">
							<input type="text" name="firstName" id="name-field" className="login-form-field" placeholder="First Name" />
							<br/><br/>
							<input type="text" name="lastName" id="name-field" className="login-form-field" placeholder="Last Name" />
							<br/><br/>
							<input type="text" name="email" id="name-field" className="login-form-field" placeholder="Email" />
							<br/><br/>
						</form>
					</Col>
					<Col></Col>
					<Col></Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col></Col>
					<Col className = "text-center">
						<Button className = "center" size="sm" href='#'>
							Login
						</Button>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</>
	)
}

export default UserInfoChanger;