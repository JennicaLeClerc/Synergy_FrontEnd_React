import React, {useState} from "react";
import { 
	Button, 
	Container,
	Row,
	Col
} from "react-bootstrap";
import axios from "axios";

function PasswordChanger(){
	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col md="auto" className = "text-center">
						<form id="login-form">
							<input type="text" name="Username" id="username-field" className="login-form-field" placeholder="Username" />
							<br/><br/>
							<input type="password" name="Old Password" id="password-field" className="login-form-field" placeholder="Old Password" />
							<br/><br/>
							<input type="password" name="New Password" id="password-field" className="login-form-field" placeholder="New Password" />
							<br/><br/>
							<Button>
								Login
							</Button>
							<br/><br/>
							<p id="forgot-password" align="center"><a href="#">Forgot Password?</a></p>
						</form>
					</Col>
					<Col></Col>
				</Row>
			</Container>
			<div class="row">
				<div class="col-sm-4"></div>
				<div class="hide1" id = "error">
					<p align="center">*Username or Password are Incorrect*</p>
				</div>
				<div class="col-sm-4"></div>
			</div>
		</>
	)
}

export default PasswordChanger;