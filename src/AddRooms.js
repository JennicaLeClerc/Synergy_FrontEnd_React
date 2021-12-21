import axios from "axios";
import { useState } from "react";
import { Container, ListGroup,Row,Col,Card,CardGroup, Button} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Endpoint from "./Endpoint";
const Amens = ["Single Bed","Pullout Bed","Double Bed","Gold Tier Bed","Compact Bathroom","Standard Bathroom","Luxuary Bathroom","Luxuary  View","Premium View","Great View","Luxuary Kitchen","Compact Kitchen","ADA Accessable"]

export default function AddRooms({JWT, updateJWT}){
	let [ams, addAms] = useState([])
	function addOne(i){
		
		let nams = [...ams]
		nams.push({"id":i.target.parentNode.parentNode.id})
		addAms(nams)
	}

	function GetAmens(){
		let i = 0;
		
		return Amens.map((a)=>{
			return(
				<Col id={i} key={i+=1}>
				<Card style={{ width: '100%' ,cursor: "pointer"}} onClick={(e) => {return addOne(e);}}>
					<Card.Header>{a}</Card.Header>
				</Card>
				</Col>
				)
		})
	}
	async function addRoom(){
		let axiosConfig = {
			headers: {
				'Content-Type':'application/json',
				'Authorization':'Bearer ' + JWT
			}
		};
		let body = {amenitiesList:ams};
		console.log(body)
		const response = await axios.post(Endpoint + "/rooms", body, axiosConfig);
		addAms([])
		toast.success('Room has been created');
	}
	function RenderAmens(){
		let i =0
		let ada = false;
		return ams.map((a)=>{
			if (Amens[a.id] == "ADA Accessable" ){
				if (ada) return <></>
				else ada=true
			}
			return(
				<Col key={i+=1}>
				<Card style={{ width: '100%' }} >
					<Card.Header>{Amens[a.id]}</Card.Header>
				</Card>
				</Col>
				)
		})
	}
	return(
		<Container>
			<br/>
			<br/>
			<br/>
			<br/>
			<Row xs={1} md={6} className="g-4" style={{border:"2px solid #F26926"}}>
			<RenderAmens/>
			<br/>
			<br/>
			<br/>
			<br/>
			</Row>
			<br/>
			<Row>
				<Col>
				</Col>
				<Col>
				<Button style={{float:"left", width:"45%"}} onClick={()=>{addRoom()}}>Create Room</Button>
				<Button style={{float:"right", width:"45%"}} onClick={()=>{addAms([])}}>Clear Room</Button>
				</Col>
				<Col>
				</Col>
				</Row>
			<br/>
			<br/>
			<Row xs={1} md={3} className="g-4" style={{border:"2px solid red"}}>
				<GetAmens/>
			</Row>
			<ToastContainer />
		</Container>
	)

}