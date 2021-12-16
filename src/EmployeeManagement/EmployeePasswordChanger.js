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
import { useNavigate } from "react-router-dom";
import Endpoint from "../Endpoint";
import parseJWT from "../parseJWT";

function EmployeePasswordChanger({JWT}){

	const [employeeInput, setEmployeeInput] = useState({
		username:'',
		new:'',
		old:''
	});

	// Updating employeeInfo
	let axiosConfig = {headers: {"Content-Type":"application/json", "Authorization":"Bearer "+JWT}};

	const changePassword = (e) => {
		e.preventDefault();
		setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
	}

	let navigate = useNavigate();

	const submitPassword= async (e) => {
		console.log('submited');
		console.log(employeeInput);
		e.preventDefault();
		//axios put call
		var uID = parseJWT(JWT).ID;
		const response = await axios.put(Endpoint + "/employee/" + uID, employeeInput, axiosConfig);
		console.log(response);
		if(response.status === 200){
			navigate("/employee");
		}
	}

	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col md="auto" className = "text-center">
						<Form onSubmit={(e) => submitPassword(e)}>
							<FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
								<Form.Control name="username" placeholder="Username" value={employeeInput.username} onChange={(e)=> changePassword(e)} required/>
							</FloatingLabel>
							<FloatingLabel controlId="floatingPassword" label="Old Password" className="mb-3">
								<Form.Control name="old" placeholder="Old Password" value={employeeInput.old} onChange={(e)=> changePassword(e)} required/>
							</FloatingLabel>
							<FloatingLabel controlId="floatingPassword" label="New Password" className="mb-3">
								<Form.Control name="new" placeholder="New Password" value={employeeInput.new} onChange={(e)=> changePassword(e)} required/>
							</FloatingLabel>
							<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}} type="submit" value="Submit">
								Submit
							</Button>
						</Form>
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

export default EmployeePasswordChanger;