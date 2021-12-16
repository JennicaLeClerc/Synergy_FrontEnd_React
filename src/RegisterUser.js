import React, {useState} from "react";
import { 
	Button

} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
	const [userIntput, setUserInput] = useState({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: ''
	});

	let navigate = useNavigate();
	const {firstName, lastName, email, username, password} = userIntput;

	const change = (e) => {
		e.preventDefault();
		setUserInput({...userIntput, [e.target.name]: e.target.value});
	}

	const submit = async (e) => {
		e.preventDefault();
		//axios post call
	  const response = await axios.post("http://localhost:5000/users", userIntput);
		console.log(response);

		if(response.status == 200){
			navigate("/");
		}
	}

	return (
		<body >
			<nav id="nav-placeholder"></nav>
					<div style={{ backgroundColor: '#e9ecef', 
							display: 'flex', justifyContent: 'center', paddingTop:'30px'}} >
							<h1>Synergy Hotel Management System</h1>
					</div> 
			<div style={{
				backgroundColor: '#e9ecef',
				display: 'flex', justifyContent: 'center', paddingBottom:'40px', 
				marginBottom: '30px'
			}}>
				<h3>Create A New Account</h3>
							 </div>						  
			<div className="container">
				<div className="row">
					<div className="col-sm-4">
					</div>
					<div className="col-sm-4 color">
						<form className="register" style={{
							backgroundColor: "#f7f7f7", color: '#f26926', display: "block", margin: "10px",  fontSize: "larger", fontWeight:"600", borderRadius:'10px'
						}} onSubmit={(e) => submit(e)}>

							<div >
							<div >
								<label for="firstName">First Name</label>
								<input type="text" className="form-control" value={firstName} name="firstName" placeholder="Enter First Name" onChange={(e)=> change(e)} required/>
								<br/>
							</div>

							<div >
								<label for="lastName">Last Name</label>
								<input type="text" className="form-control" value={lastName}  name="lastName" placeholder="Enter Last Name" onChange={(e)=> change(e)} required/>
									<br />
							</div>
							<div className="form-group">
								<label for="email">Email</label>
								<input type="text" className="form-control" value={email} name="email" placeholder="Enter Email" onChange={(e)=> change(e)} required/>
									<br />
							</div>
							<div className="form-group">
								<label for="userName">User Name</label>
									<input type="text" className="form-control" value={username} name="username" placeholder="Enter User Name" onChange={(e)=> change(e)} required/>
									<br />
							</div>
							<div className="form-group">
								<label for="password">Password</label>
								<input type="password" className="form-control" value={password} name="password" placeholder="Enter Password" onChange={(e)=> change(e)} required/>
									<br />
							</div>	 
								<div className="d-grid gap-2">
									<Button style={{ backgroundColor: "#f26926"}} type="submit" value="Submit" >Submit</Button>
								</div>				   
							</div>
						</form>
					</div>
					<div className="col-sm-4" ></div>
				</div>
			</div>
			<br/>
			<br />
			<br />
			<br />
		</body>
	);
}

export default RegisterUser;