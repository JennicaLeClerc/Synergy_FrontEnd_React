import React, {useState} from "react";
import { 
	Button, 
	Container,
	Row,
	Col,
	FloatingLabel,
	Form
} from "react-bootstrap";
import axios from "axios";

function UserInfoChanger(){
	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col>
						<Form.Group as={Row} className="mb-3" controlId="formFirstName">
							<Form.Label column sm="3">
								First Name
							</Form.Label>
							<Col sm="9">
								<Form.Control type="firstName" placeholder="Current First Name" />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formLastName">
							<Form.Label column sm="3">
								Last Name
							</Form.Label>
							<Col sm="9">
								<Form.Control type="lastName" placeholder="Current Last Name" />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formEmail">
							<Form.Label column sm="3">
								Email
							</Form.Label>
							<Col sm="9">
								<Form.Control type="email" placeholder="email@email.com" />
							</Col>
						</Form.Group>
					</Col>
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