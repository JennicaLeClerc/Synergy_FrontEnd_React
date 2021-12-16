import React, {useState} from "react";
import { 
	Button, 
	Container,
	Row,
	Col,
	Form,
	FloatingLabel,
	Alert
} from "react-bootstrap";
import axios from "axios";
import Endpoint from "./Endpoint";

function PasswordChanger(){
	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col md="auto" className = "text-center">
						<FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
							<Form.Control type="username" placeholder="Username" />
						</FloatingLabel>
						<FloatingLabel controlId="floatingPassword" label="Old Password" className="mb-3">
							<Form.Control type="password" placeholder="Old Password" />
						</FloatingLabel>
						<FloatingLabel controlId="floatingPassword" label="New Password" className="mb-3">
							<Form.Control type="password" placeholder="New Password" />
						</FloatingLabel>
						<Button>
							Submit
						</Button>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</>
	)
}

function WrongPassword(){
	const [show, setShow] = useState(true);

  	if (show) {
		return (
			<Alert variant="danger" onClose={() => setShow(false)} dismissible>
				<Alert.Heading>Username or Password incorrect</Alert.Heading>
			</Alert>
		)
	}
	return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default PasswordChanger;