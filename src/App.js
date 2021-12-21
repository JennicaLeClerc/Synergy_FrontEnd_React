import logo from './SynergyLogo.png';
import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './sidebar.css'
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	Navigate,
	useNavigate
} from "react-router-dom";
import { 
	Carousel,
	Container,
	Navbar,
	Spinner,
	Offcanvas,
	Table,
	Dropdown,
	Button,
	Tooltip,
	Row,
	Col,
	OverlayTrigger,
	Button,
	Row,
	Col
} from 'react-bootstrap';
import ManagerPortal from './ManagerPortal';
import RegisterUser from './RegisterUser';
import UserAccountManagement from './UserManagement/UserAccountManagement';
import UserInfoChanger from './UserManagement/UserInfoChanger';
import UserPasswordChanger from './UserManagement/UserPasswordChanger';
import EmployeeAccountManagement from './EmployeeManagement/EmployeeAccountManagement';
import EmployeeInfoChanger from './EmployeeManagement/EmployeeInfoChanger';
import EmployeePasswordChanger from './EmployeeManagement/EmployeePasswordChanger';
import LoginPage from './LoginPage';
import ReservationsView from './ReservationView/ReservationsView';
import parseJWT from './parseJWT';
import CreateReservation from './createReservation';
import UserReservation from './UserReservation';
import AllEmployee from './AllEmployee';
import Endpoint from "./Endpoint";
import axios from "axios";
import FullCalendar from '@fullcalendar/react';

const Amens = ["Single Bed","Pullout Bed","Double Bed","Gold Tier Bed","Compact Bathroom","Standard Bathroom","Luxuary Bathroom","Luxuary  View","Premium View","Great View","Luxuary Kitchen","Compact Kitchen","ADA Accessable"]


function App() {
	const [JWT,updateJWT] = useState( localStorage.getItem("token")||"");
	localStorage.setItem("token",JWT)
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
function GlobalNavBar({JWT}){
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
					<Link to="/logout" className="hov" style={{ paddingLeft: "4.5%", paddingTop: "2%"}}>Logout </Link>
				</>
			)
		}
		if(props.role === "EMPLOYEE" || props.role === "MANAGER"){
			return(
				<>
					<Button className="hov" onClick ={()=>{props.update((props.sel===1)? 0:1)}} >Reservations</Button>
					<ShowIfMatch in={props.sel} given={1} cont={<Link to="/employee/reservations" className="hov" style={{ paddingLeft: "15%"}}>Pending</Link>}/> 
					<ShowIfMatch in={props.sel} given={1} cont={<Link to="/employee/reservations" className="hov" style={{ paddingLeft: "15%"}}>Upcoming</Link>}/>
					<ShowIfMatch in={props.sel} given={1} cont={<Link to="/employee/reservations" className="hov" style={{ paddingLeft: "15%"}}>Current</Link>}/>
					<ShowIfMatch in={props.sel} given = {1} cont={<Link to="/employee/reservations" className="hov" style={{ paddingLeft: "15%"}}>All</Link>}/>
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
					<Link to="/logout" className="hov" style={{ paddingLeft: "4.5%", paddingTop: "2%"}}>Logout </Link>
				</>
			)

		}
	}
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }
function ShowIfMatch(prop){
	if (prop.in === prop.given)
	return(prop.cont)
	return(<></>)
}

function GoHome(){
	return(<Navigate to="/"/>)
}
function Logout({JWT, updateJWT}){
	updateJWT("")	
	Redir();
	return <Container ><Row><br/><br/><br/><br/></Row><Row><Col></Col><Col><h1>Come Visit Us Soon!</h1></Col><Col></Col></Row></Container>
}
async function Redir() {
	let navigate = useNavigate();
	await sleep(2000);
	navigate("/")
	
}



function Rooms({JWT, updateJWT}){


	let [rooms, updateRooms] = useState([])
	let [pg, updatePg] = useState(0)
	let [un, updateUn] = useState({})
	
	let navigate = useNavigate()
	useEffect(onLoad,[])

	function dropdownUpdate(key,item){
		let nun = {...un}
		un[key] =item.target.value
	}
	async function updateowner(id){
		console.log("test")
		const response2 = await axios.put(Endpoint+"/rooms/"+id+"/addUser" , null,{ headers: { "Authorization": `Bearer ${JWT}` }, params: { userID:un[id]} }).then((data) => data.data);
		const response1 = await axios.put(Endpoint+"/rooms/"+id+"/changeOccupation" , null,{ headers: { "Authorization": `Bearer ${JWT}` }, params: {value:true } }).then((data) => data.data);
		onLoad()
	}



	
	
	function GetRooms({rooms,JWT, updateJWT}){
		function GetAmens(room,props){
			console.log(room)
			
		}
		
		return( rooms.map((room)=>{
			let price = 0
			for(let a of room.amenitiesList) {
				price+=a.priceWeight
			}
			return (
			<tr key={room.roomNumber}>
				<td>{room.roomNumber}</td>
				<td>
				<OverlayTrigger
				placement="right-start"
				delay={{ show: 250, hide: 400 }}
				overlay={(props) => {
					let i =0;
					return <Tooltip id="button-tooltip" {...props}>{room.amenitiesList.map((amen)=>{return(<p className="text-center" key={i+=1}>{Amens[amen.id]}</p>)})}</Tooltip>
					}}>
					<p>Hover me to see Amenities</p>
				</OverlayTrigger>
				</td>
				<td>{((room.occupied)? room.currentUser.firstName+" "+room.currentUser.lastName:"No")}</td>
				<td>{price}</td>
				<td><Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
						Options
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<input type="text" onChange={(e) => {dropdownUpdate(room.roomNumber,e)}}/>
							<Dropdown.Item onClick={()=>{updateowner(room.roomNumber)}}>Assign Occupant</Dropdown.Item>
						</Dropdown.Menu>


					</Dropdown> </td>
			</tr>)})
	
		)
		
	}
	async function onLoad(){
		try{
		const response = await axios.get(Endpoint+"/rooms" , { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: pg, pageSize: 10, sortBy: 'roomNumber' } }).then(
			(data) => data.data
		);
		updateRooms(response.content);

		}
		catch(e){
			navigate("/employee/login")
		}
		
		
	}
	
	
	return (
		(rooms.length)? (<Container ><Row><Col>
		<Table striped bordered hover>
			<thead ><tr><th>Room Number</th><th>View Amenities</th><th>Is Occupied</th><th>Price</th><th>Options</th></tr></thead>
			<tbody><GetRooms  rooms={rooms} JWT={JWT} updateJWT={updateJWT}></GetRooms></tbody>
		</Table></Col></Row></Container>):(<Container ><Row><br/><br/><br/><br/></Row><Row><Col className='text-center'><h1>Loading...</h1></Col></Row><Row><Col className='text-center'><Spinner animation="border" variant="primary" /></Col></Row></Container>))
}
function AddRooms({JWT, updateJWT}){
	return <table></table>
}
function PageRouter({JWT, updateJWT}){
	if (!JWT){ //DONE
		return (
			<Routes>
				<Route exact path = "/" element={<MainPage JWT={JWT}/>}/>
				<Route exact path = "/users/register" element={<RegisterUser JWT={JWT}/>}/>
				<Route exact path = "/employee/login" element={<LoginPage JWT={JWT} updateJWT={updateJWT} userType="EMPLOYEE"/>}/>
				<Route exact path = "/authenticate" element={<LoginPage JWT={JWT} updateJWT={updateJWT} userType="USER"/>}/>
				<Route exact path = "/logout" element={<Logout JWT={JWT} updateJWT={updateJWT}/>}/>
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
				<Route exact path = "/users/edit" element={<UserInfoChanger JWT={JWT}/>}/>						{/*Done 	*/}
				<Route exact path = "/users/change_password" element={<UserPasswordChanger JWT={JWT}/>}/>		{/*Done 	*/}
				<Route exact path = "/authenticate" element={<LoginPage JWT={JWT} updateJWT={updateJWT} />}/>	{/*Done 	*/}
				<Route exact path = "/logout" element={<Logout JWT={JWT} updateJWT={updateJWT}/>}/>
				<Route exact path = "*" element={<GoHome />}/>													{/*Done 	*/}
			</Routes>
		)
	}
	else if (parseJWT(JWT).Role[0].authority == "EMPLOYEE"){
		return (
			<Routes>
				<Route exact path = "/" element={<MainPage 											JWT={JWT}/>}/>						{/*Done */}
				<Route exact path = "/employee/reservations" element={<ReservationsView  			JWT={JWT} updateJWT={updateJWT}/>}/>			
				<Route exact path = "/authenticate" element={<LoginPage 							JWT={JWT} updateJWT={updateJWT}/>}/>{/*Done */}
				<Route exact path = "/employee" element={<EmployeeAccountManagement 				JWT={JWT} updateJWT={updateJWT}/>}/>{/*Done */}
				<Route exact path = "/employee/edit" element={<EmployeeInfoChanger 					JWT={JWT} updateJWT={updateJWT}/>}/>{/*Done */}
				<Route exact path = "/employee/change_password" element={<EmployeePasswordChanger 	JWT={JWT} updateJWT={updateJWT}/>}/>{/*Done */}
				<Route exact path = "/employee/rooms" element={<Rooms 								JWT={JWT} updateJWT={updateJWT}/>}/>
				<Route exact path = "/employee/rooms/add" element={<AddRooms 						JWT={JWT} updateJWT={updateJWT}/>}/>
				<Route exact path = "/employee/login" element={<LoginPage JWT={JWT} updateJWT={updateJWT} userType="EMPLOYEE"/>}/>
				<Route exact path = "/logout" element={<Logout 										JWT={JWT} updateJWT={updateJWT}/>}/>
				<Route exact path = "*" element={<GoHome />}/>																			{/*Done */}
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
				<Route exact path = "/employee" element={<EmployeeAccountManagement JWT={JWT}/>}/>				{/*Done */}
				<Route exact path = "/employee/edit" element={<EmployeeInfoChanger JWT={JWT}/>}/>				{/*Done */}
				<Route exact path = "/employee/change_password" element={<EmployeePasswordChanger JWT={JWT}/>}/>{/*Done */}
				<Route exact path = "/employee/all" element={<AllEmployee JWT ={JWT} />} />						{/*DONE*/}
				<Route exact path = "/employee/login" element={<LoginPage JWT={JWT} updateJWT={updateJWT} userType="EMPLOYEE"/>}/>
				<Route exact path = "/employee/rooms" element={<Rooms 		JWT={JWT} updateJWT={updateJWT}/>}/>
				<Route exact path = "/employee/rooms/add" element={<AddRooms JWT={JWT} updateJWT={updateJWT}/>}/>
				<Route exact path = "/logout" element={<Logout JWT={JWT} updateJWT={updateJWT}/>}/>
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

export default App;