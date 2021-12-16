import React, { useEffect, useState } from "react";
import { 
	Button, 
	Container,
	Row,
	Col,
	FloatingLabel,
	Form
} from "react-bootstrap";
import axios from "axios";
import parseJWT from "./parseJWT";

function UserInfoChanger({JWT}){
	const [userInput, setUserInput] = useState({
		username:'',
		password:'',
		firstName:'',
		lastName:'',
		email:''
	});

	const change = (e) => {
		e.preventDefault();
		setUserInput({...userInput, [e.target.name]: e.target.value, ['Content-type']: 'application/json'})
	}

	useEffect(()=>{ Submit(); },[])
	const Submit = async (e) => {		
		var uID = parseJWT(JWT).ID;
		const response = await axios.get("http://localhost:5000/users/" + uID, {headers:{"Authorization":"Bearer "+JWT}}).then(resp => resp);
		console.log(response);
		setUserInput({username:response.data.username, password:response.data.password, firstName:response.data.firstName, lastName:response.data.lastName, email:response.data.email});
	}

	const [userChanger, setUserChanger] = useState({
		firstName: '',
		lastName: '',
		email: ''
	});

	const { firstName, lastName, email } = userChanger;

	const changePut = (e) => {
		e.preventDefault();
		setUserChanger({ ...userChanger, [e.target.name]: e.target.value });
	}

	const selectionPut = (e)=>{
		setUserChanger({ ...userChanger});
	}

	const submitPut = async (e) => {
		console.log('submited')
		e.preventDefault();
		//axios post call
		const response = await axios.post("http://localhost:5000/employee", userChanger.firstName);
		console.log(response);
	}


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
								<Form.Control type="firstName" placeholder={userInput.firstName} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formLastName">
							<Form.Label column sm="3">
								Last Name
							</Form.Label>
							<Col sm="9">
								<Form.Control type="lastName" placeholder={userInput.lastName} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formEmail">
							<Form.Label column sm="3">
								Email
							</Form.Label>
							<Col sm="9">
								<Form.Control type="email" placeholder={userInput.email} />
							</Col>
						</Form.Group>
					</Col>
					<Col>
						<Row>
							<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}}>
								Update
							</Button>
						</Row>
						<Row>
							<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}}>
								Update
							</Button>
						</Row>
						<Row>
							<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}}>
								Update
							</Button>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default UserInfoChanger;