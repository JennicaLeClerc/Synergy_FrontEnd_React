import React, { useEffect, useState } from "react";
import { 
	Button, 
	Container,
	Row,
	Col,
	Form
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import parseJWT from "../parseJWT";
import Endpoint from "../Endpoint";

function UserInfoChanger({JWT}){
	let navigate = useNavigate();

	// Getting current info
	const [userInput, setUserInput] = useState({
		username:'',
		password:'',
		firstName:'',
		lastName:'',
		email:''
	});

	useEffect(()=>{ Submit(); },[])
	const Submit = async (e) => {		
		var uID = parseJWT(JWT).ID;
		const response = await axios.get(Endpoint + "/users/" + uID, {headers:{"Authorization":"Bearer "+JWT}}).then(resp => resp);
		console.log(response);
		setUserInput({username:response.data.username, password:response.data.password, firstName:response.data.firstName, lastName:response.data.lastName, email:response.data.email});
	}

	let axiosConfig = {headers: {"Content-Type":"application/json", "Authorization":"Bearer "+JWT}};

	const [userFirstName, setUserFirstName] = useState({
		firstName:''
	});

	const changeFirstName = (e) => {
		e.preventDefault();
		setUserFirstName({ ...userFirstName, [e.target.name]: e.target.value });
	}

	const submitFirstName = async (e) => {
		console.log('submited');
		console.log(userFirstName);
		e.preventDefault();
		//axios post call
		var uID = parseJWT(JWT).ID;
		const response = await axios.put(Endpoint + "/users/firstName/" + uID, userFirstName.firstName, axiosConfig);
		console.log(response);
		if(response.status === 200){
			setUserFirstName({firstName:''});
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
							<Form.Control name="firstName" placeholder={userInput.firstName} value={userFirstName.firstName} onChange={(e)=> changeFirstName(e)}/>
						</Col>
						<Col sm="3">
							<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}} type="submit" value="Submit">
								Update
							</Button>
						</Col>
					</Form.Group>
				</Form>
				<Form.Group as={Row} className="mb-3" controlId="formLastName">
					<Form.Label column sm="3">
						Last Name
					</Form.Label>
					<Col sm="9">
						<Form.Control type="lastName" placeholder={userInput.lastName} />
					</Col>
					<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}}>
						Update
					</Button>
				</Form.Group>
				<Form.Group as={Row} className="mb-3" controlId="formEmail">
					<Form.Label column sm="3">
						Email
					</Form.Label>
					<Col sm="9">
						<Form.Control type="email" placeholder={userInput.email} />
					</Col>
					<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}}>
						Update
					</Button>
				</Form.Group>
			</Container>
		</>
	)
}

export default UserInfoChanger;