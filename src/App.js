import logo from './SynergyLogo.png';
import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './sidebar.css'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Navigate
} from "react-router-dom";
import { 
	Carousel,
	Container,
	Navbar,
	NavDropdown,
	Offcanvas,
	Nav,
	Form,
	Button,
	FormControl,
	Row,
	Col,
	Accordion
} from 'react-bootstrap';
import ManagerPortal from './ManagerPortal';
import RegisterUser from './RegisterUser';
import UserAccountManagement from './UserManagement/UserAccountManagement';
import UserInfoChanger from './UserManagement/UserInfoChanger';
import EmployeeAccountManagement from './EmployeeManagement/EmployeeAccountManagement';
import PasswordChanger from './PasswordChanger';
import LoginPage from './LoginPage';
import ReservationsView from './ReservationView/ReservationsView';
import parseJWT from './parseJWT';
import CreateReservation from './createReservation';
import UserReservation from './UserReservation';
import AllEmployee from './AllEmployee';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function App() {
	const [JWT,updateJWT] = useState("");
	return (
		<>
		{console.log((JWT)? parseJWT(JWT): "not logged in")}
			<GlobalNavBar JWT={JWT}/>
			<PageRouter JWT={JWT} updateJWT={updateJWT}/>
			<Footer />
		</>
	);
}

// <ManagerPortal /> <RegisterUser /> works
function GlobalNavBar({ JWT}){
	let [currentDrop, updateCurrentDrop] = useState("none");
	return(
		<Navbar bg="dark" variant='dark' expand={false}>
		<Container fluid>
			<Row>
				<Col>
					<Navbar.Toggle aria-controls="offcanvasNavbar">
					<img src={logo} width="50px"/>

					<Navbar.Brand href="#" style={{paddingLeft:"10px"}}>Synergy Hotel</Navbar.Brand>
					</Navbar.Toggle>
					<Navbar.Offcanvas
						id="offcanvasNavbar"
						aria-labelledby="offcanvasNavbarLabel"
						placement="start"
						className="bg-dark text-white"
						style = {{width:"300px"}}
					>
					<Offcanvas.Header closeButton>
					<Offcanvas.Title id="offcanvasNavbarLabel"><h1>Hello!</h1></Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<NavbarS1 role={(JWT)? parseJWT(JWT).Role[0].authority : ""} update={updateCurrentDrop} sel={currentDrop}/>
				</Offcanvas.Body>
			</Navbar.Offcanvas>
			</Col>
			</Row>
		</Container>
		</Navbar>
	)
}

function NavbarS1(props){
	if (!props.role){
		return(
			<>
				<Link className="hov" to="/authenticate" style={{ paddingLeft: "15%"}}>Login</Link>
				<Link className="hov" to="/users/register" style={{ paddingLeft: "15%"}}>Register</Link>
			</>
		) 
	} else{
		if(props.role === "USER"){
			return(
				<>
					<Button className="hov" onClick ={()=>{props.update((props.sel==1)? 0:1)}} >Reservation</Button>
					<ShowIfMatch in={props.sel} given = {1} cont={<Link to="/users/reservation/add" className="hov" style={{ paddingLeft: "15%"}}>New Reservation</Link>}/>							
					<ShowIfMatch in={props.sel} given = {1} cont={<Link to="/users/reservation" className="hov" style={{ paddingLeft: "15%"}}>My Reservations</Link>}/>							
					<Button className="hov" onClick ={()=>{props.update((props.sel==2)? 0:2)}} >Account</Button>																
					<ShowIfMatch in={props.sel} given = {2} cont={<Link to="/users" className="hov" style={{ paddingLeft: "15%"}}>My Account</Link>}/>							
					<ShowIfMatch in={props.sel} given = {2} cont={<Link to="/users/edit" className="hov" style={{ paddingLeft: "15%"}}>Change Info</Link>}/>					
					<ShowIfMatch in={props.sel} given = {2} cont={<Link to="/users/change_password" className="hov" style={{ paddingLeft: "15%"}}>Change Password</Link>}/>		
				</>
			)
		}
		if(props.role === "EMPLOYEE" || props.role === "MANAGER"){
			return(
				<>
					<Button className="hov" onClick ={()=>{props.update((props.sel===1)? 0:1)}} >Reservations</Button>
					<ShowIfMatch in={props.sel} given = {1} cont={<Link to="/" className="hov" style={{ paddingLeft: "15%"}}>Pending</Link>}/> 
					<ShowIfMatch in={props.sel} given = {1} cont={<Link to="/" className="hov" style={{ paddingLeft: "15%"}}>Upcoming</Link>}/>
					<ShowIfMatch in={props.sel} given = {1} cont={<Link to="/" className="hov" style={{ paddingLeft: "15%"}}>Current</Link>}/>
					<ShowIfMatch in={props.sel} given = {1} cont={<Link to="/" className="hov" style={{ paddingLeft: "15%"}}>All</Link>}/>
					<Button className="hov" onClick ={()=>{props.update((props.sel==2)? 0:2)}} >Account</Button>																
					<ShowIfMatch in={props.sel} given = {2} cont={<Link to="/employee" className="hov" style={{ paddingLeft: "15%"}}>My Account</Link>}/>							
					<ShowIfMatch in={props.sel} given = {2} cont={<Link to="/employee/edit" className="hov" style={{ paddingLeft: "15%"}}>Change Info</Link>}/>					
					<ShowIfMatch in={props.sel} given = {2} cont={<Link to="/employee/change_password" className="hov" style={{ paddingLeft: "15%"}}>Change Password</Link>}/>	
					<ShowIfMatch in={props.role} given = {"MANAGER"} cont={
						<>
							<Button className="hov" onClick ={()=>{props.update((props.sel===4)? 0:4)}} >Management</Button>
							<ShowIfMatch in={props.sel} given={4} cont={<Link to="/employee/ManagerPortal" className="hov" style={{ paddingLeft: "15%"}}>New Employee</Link>}/>
							<ShowIfMatch in={props.sel} given={4} cont={<Link to="/employee/all" className="hov" style={{ paddingLeft: "15%"}}>All Employees</Link>}/>
						</>
					}/>
				</>
			)

		}
	}
}

function ShowIfMatch(prop){
	if (prop.in === prop.given)
	return(prop.cont)
	return(<></>)
}

function GoHome(){
	return(<Navigate to="/"/>)
}

function PageRouter({JWT, updateJWT}){
	if (!JWT){ //DONE
		return (
			<Routes>
				<Route exact path = "/" element={<MainPage JWT={JWT}/>}/>
				<Route exact path = "/users/register" element={<RegisterUser JWT={JWT}/>}/>
				<Route exact path = "/employee/login" element={<LoginPage JWT={JWT} updateJWT={updateJWT} userType="EMPLOYEE"/>}/>
				<Route exact path = "/authenticate" element={<LoginPage JWT={JWT} updateJWT={updateJWT} userType="USER"/>}/>
				<Route exact path = "*" element={<GoHome />}/>
			</Routes>
		)
	}else if (parseJWT(JWT).Role[0].authority == "USER"){ 
		return (
			<Routes>
				<Route exact path = "/" element={<MainPage JWT={JWT}/>}/>										{/*Done 	*/}
				<Route exact path = "/users/register" element={<RegisterUser JWT={JWT}/>}/>						{/*Done 	*/}
				<Route exact path = "/users" element={<UserAccountManagement JWT={JWT}/>}/>						{/*Done 	*/}
				<Route exact path = "/users/reservation/add" element={<CreateReservation JWT={JWT}/>}/>			{/*			*/}
				<Route exact path = "/users/reservation" element={<UserReservation JWT={JWT}/>}/>
				<Route exact path = "/users/edit" element={<UserInfoChanger JWT={JWT}/>}/>						
				<Route exact path = "/users/change_password" element={<PasswordChanger JWT={JWT}/>}/>			
				<Route exact path = "/authenticate" element={<LoginPage JWT={JWT} updateJWT={updateJWT} />}/>	{/*Done 	*/}
				<Route exact path = "*" element={<GoHome />}/>													{/*Done 	*/}
			</Routes>
		)
	}
	else if (parseJWT(JWT).Role[0].authority == "EMPLOYEE"){
		return (
			<Routes>
				<Route exact path = "/" element={<MainPage JWT={JWT}/>}/>										{/*Done */}
				<Route exact path = "/employee/reservations" element={<ReservationsView  JWT={JWT}/>}/>			
				<Route exact path = "/authenticate" element={<LoginPage JWT={JWT} updateJWT={updateJWT} />}/>	{/*Done */}
				<Route exact path = "/employee" element={<EmployeeAccountManagement JWT={JWT}/>}/>
				<Route exact path = "/employee/change_password" element={<PasswordChanger JWT={JWT}/>}/>								
				<Route exact path = "*" element={<GoHome />}/>													{/*Done */}
			</Routes>
		)
	}
	else {
		return (
			<Routes>
				<Route exact path = "/" element={<MainPage JWT={JWT}/>}/>										{/*Done */}
				<Route exact path = "/employee/ManagerPortal" element={<ManagerPortal JWT={JWT} />}/>			
				<Route exact path = "/employee/reservations" element={<ReservationsView  JWT={JWT}/>}/>		
				<Route exact path = "/authenticate" element={<LoginPage JWT={JWT} updateJWT={updateJWT} />}/>	{/*Done */}
				<Route exact path = "/employee" element={<EmployeeAccountManagement JWT={JWT}/>}/>
				<Route exact path = "/employee/change_password" element={<PasswordChanger JWT={JWT}/>}/>													
				<Route exact path = "*" element={<GoHome />}/>													{/*Done */}
			</Routes>
		)
	}
}

function User(){
// Register - Luis
// Login - John
// Create Reservation - Ernst
// Account Management - Jennica
	return(
		<>
		</>
	)
}

function Employee(){
// Login - John
// Reservations
	//View Pending Reservations, View Upcoming Reservations, View Current Reservations
// Cleaning(*)
// Maintenance
// Account Management - Jennica

//Management only: 
	// Register Employees - Luis
	// Update Price
	// Manage Employees

	return(
		<>
		</>
	)
}

function Footer(){
	return (
		<>
			<br/><br/><br/>
			<br/><br/><br/>
			<footer className='sticky-bottom'>
				<hr/>
				<Container>
					<Row className = "text-center">
						<Col>
							Address
						</Col>
						<Col>
							Hours and Contact
						</Col>
						<Col>
							On-site Services
						</Col>
					</Row>
					<Row className = "text-center">
						<Col>
							133 Belvedere BLVGD
						</Col>
						<Col>
							7:00 a.m. - 11:00 p.m.
						</Col>
						<Col>
							Concierge Services
						</Col>
					</Row>
					<Row className = "text-center">
						<Col>
							Orlando FL
						</Col>
						<Col>
							407-945-7889
						</Col>
						<Col>
							Valet Parking
						</Col>
					</Row>
					<Row	className = "text-center">
						<Col>
							34764
						</Col>
						<Col>
							customerservice@synergy.com
						</Col>
						<Col>
							ATM
						</Col>
					</Row>
					<Row>
						<Col></Col>
						<Col md="auto" className = "text-center">
							<br/>
							<Link to="/employee/login">Employee?</Link>
						</Col>
						<Col></Col>
					</Row>
				</Container>
				<p style={{textAlign:"center"}}><i>Copyright &copy; 2021 Synergy Hotel Management System. All Rights Reserved.</i></p>
			</footer>
		</>
	)
}




function MainPage(){
	return(
		<>
			<div className='text-center'>
				<h1 className="header1">Synergy Hotel</h1>
				<h3>Karoke - Spa - Wine Tasting</h3>
			</div>
			<Carousel>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://i.postimg.cc/DfJ16RWv/one-Bedroom.jpg"
						height="400"
						style={{objectFit:"cover"}}
						alt="First slide"
					/>
					<Carousel.Caption></Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://i.postimg.cc/k5YtFyqR/2-Bedrooms.jpg"
						height="400"
						style={{objectFit:"cover"}}
						alt="Second slide"
					/>
					<Carousel.Caption></Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://i.postimg.cc/0yc6PC6X/3-Bedrooms.jpg"
						height="400"
						style={{objectFit:"cover"}}
						alt="Third slide"
					/>
					<Carousel.Caption></Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</>
	)
}

function UserLogin(){
	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col md="auto" className = "text-center">
						<form id="login-form">
							<input type="text" name="username" id="username-field" className="login-form-field" placeholder="Username" />
							<br/><br/>
							<input type="password" name="password" id="password-field" className="login-form-field" placeholder="Password" />
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

export default App;
