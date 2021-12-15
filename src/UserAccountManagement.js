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
					<Col></Col>
					<Col style = {{fontWeight:"bold", lineHeight:"30pt"}}>
						Username:
					</Col>
					<Col>
						username holder
					</Col>
					<Col>
						<Button variant="outline-primary" size="sm" href='#'>
							Edit Info
						</Button>
					</Col>
					<Col></Col>
				</Row>
				<Row>
					<Col></Col>
					<Col></Col>
					<Col style = {{fontWeight:"bold", lineHeight:"30pt"}}>
						First Name:
					</Col>
					<Col>
						first name holder
					</Col>
					<Col></Col>
					<Col></Col>
				</Row>
				<Row>
					<Col></Col>
					<Col></Col>
					<Col style = {{fontWeight:"bold", lineHeight:"30pt"}}>
						Last Name:
					</Col>
					<Col>
						last name holder
					</Col>
					<Col></Col>
					<Col></Col>
				</Row>
				<Row>
					<Col></Col>
					<Col></Col>
					<Col style = {{fontWeight:"bold", lineHeight:"30pt"}}>
						Email:
					</Col>
					<Col>
						email holder
					</Col>
					<Col></Col>
					<Col></Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col></Col>
					<Col className = "text-center">
						<Button variant="outline-primary" size="sm" href='#'>
							Change Password
						</Button>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</>
	)
}

function UserAccountManagementRouter(){
	return (
		<Routes>
				<Route exact path = "/" element={<UserAccountManagement/>}/>
				<Route exact path = "/edit_info" element={<UserInfoChanger />}/>
				<Route exact path = "/change_password" element={<PasswordChanger/>}/>
		</Routes>
	)
}

export default UserAccountManagement;