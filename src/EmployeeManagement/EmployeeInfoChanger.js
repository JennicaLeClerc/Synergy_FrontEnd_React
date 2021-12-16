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

function EmployeeInfoChanger({JWT}){

	// Getting current info
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

	// Updating employeeInfo
	let axiosConfig = {headers: {"Content-Type":"application/json", "Authorization":"Bearer "+JWT}};

	const [employeeFirstName, setEmployeeFirstName] = useState({
		firstName:''
	});
	const [employeeLastName, setEmployeeLastName] = useState({
		lastName:''
	});

	const changeFirstName = (e) => {
		e.preventDefault();
		setEmployeeFirstName({ ...employeeFirstName, [e.target.name]: e.target.value });
	}
	const changeLastName = (e) => {
		e.preventDefault();
		setEmployeeLastName({ ...employeeLastName, [e.target.name]: e.target.value });
	}

	const submitFirstName = async (e) => {
		console.log('submited');
		console.log(employeeFirstName);
		e.preventDefault();
		//axios put call
		var uID = parseJWT(JWT).ID;
		const response = await axios.put(Endpoint + "/employee/firstName/" + uID, employeeFirstName.firstName, axiosConfig);
		console.log(response);
		if(response.status === 200){
			setEmployeeFirstName({firstName:''});
			Submit();
		}
	}
	const submitLastName = async (e) => {
		console.log('submited');
		console.log(employeeLastName);
		e.preventDefault();
		//axios put call
		var uID = parseJWT(JWT).ID;
		const response = await axios.put(Endpoint + "/employee/lastName/" + uID, employeeLastName.lastName, axiosConfig);
		console.log(response);
		if(response.status === 200){
			setEmployeeLastName({lastName:''});
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
							<Form.Control name="firstName" placeholder={employeeInput.firstName} value={employeeFirstName.firstName} onChange={(e)=> changeFirstName(e)}/>
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
							<Form.Control type="lastName" placeholder={employeeInput.lastName} value={employeeLastName.lastName} onChange={(e)=> changeLastName(e)}/>
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

export default EmployeeInfoChanger;