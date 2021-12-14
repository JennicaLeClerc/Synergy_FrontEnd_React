import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { Carousel, Container } from 'react-bootstrap';
import { 
  Navbar,
  NavDropdown,
  Offcanvas,
  Nav,
  Form,
  Button,
  FormControl
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
      <footer>
        <p style={{textAlign:"center"}}><i>Copyright &copy; 2021 Synergy Hotel Management System. All Rights Reserved.</i></p>
        <div className="container">
          <table className="table table-condensed">
            <tbody>
              <tr className="tbHeader">
                <td><h4>Address</h4></td>
                <td><h4>Hours and Contact</h4></td>
                <td><h4>On-site Services</h4></td>
              </tr>
              <tr className="tbHeader">
                <td>133 Belvedere BLVGD</td>
                <td>7:00 a.m. - 11:00 p.m.</td>
                <td>Concierge Services</td>
              </tr>
              <tr className="tbHeader">
                <td>Orlando FL</td>
                <td>407-945-7889</td>
                <td>Valet Parking</td>
              </tr>
              <tr className="tbHeader">
                <td>34764</td>
                <td>customerservice@synergy.com</td>
                <td>ATM</td>
              </tr>
              <tr className="tbHeader">
                <td></td>
                <td><a href="#">Employee?</a></td>
              </tr>
            </tbody>
          </table>
        </div>
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
            <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown"  >
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
//Register, Login, Create Reservation, Account Management

  return(
    <>
    </>
  )
}


function Employee(){
//Login, View Pending Reservations, View Upcoming Reservations, View Current Reservations, <- View All Reservations, Cleaning(*), Maintenance, Account Management
//Management only: Register Employees, Update Price, Manage Employees

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
