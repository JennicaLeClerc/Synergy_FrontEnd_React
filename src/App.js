import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link
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
	Col
} from 'react-bootstrap';

function App() {
	return (
		<>
			<GlobalNavBar />
			<PageRouter />
			<Footer />
		</>

	);
}

function Footer(){
	return (
		<>
			<br/><br/><br/>
			<br/><br/><br/>
			<footer className='fixed-bottom'>
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
					<Row  className = "text-center">
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
							Employee?
						</Col>
						<Col></Col>
					</Row>
				</Container>
				<p style={{textAlign:"center"}}><i>Copyright &copy; 2021 Synergy Hotel Management System. All Rights Reserved.</i></p>
			</footer>
		</>
	)
}

function GlobalNavBar(){
	return(
		<Navbar bg="dark" variant='dark' expand={false}>
		<Container fluid>
			<Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
			<Navbar.Toggle aria-controls="offcanvasNavbar" />
			<Navbar.Offcanvas
				id="offcanvasNavbar"
				aria-labelledby="offcanvasNavbarLabel"
				placement="end"
				className="bg-dark text-white"
			>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Nav className="justify-content-end flex-grow-1 pe-3">
					<NavDropdown title="Dropdown" id="offcanvasNavbarDropdown"	>
						<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action5">
							Something else here
						</NavDropdown.Item>
					</NavDropdown>
					</Nav>
				</Offcanvas.Body>
			</Navbar.Offcanvas>
		</Container>
		</Navbar>
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
				<Carousel.Caption>
				 
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://i.postimg.cc/k5YtFyqR/2-Bedrooms.jpg"
					height="400"
					style={{objectFit:"cover"}}
					alt="Second slide"
				/>

				<Carousel.Caption>

				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://i.postimg.cc/0yc6PC6X/3-Bedrooms.jpg"
					height="400"
					style={{objectFit:"cover"}}
					alt="Third slide"
				/>

				<Carousel.Caption>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
		</>
	)
}

function User(){
// Register - Luis
// Login - John
// Create Reservation - Ernst
// Account Management - Jennica
	return(
		<>
			<UserLogin />
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

function PageRouter(){

	return (
		<Routes>
				<Route exact path = "/" element={<MainPage />}/>
				<Route exact path = "/user" element={<User />}/>
				<Route exact path = "/employee" element={<Employee />}/>
		</Routes>
	)
}

export default App;
