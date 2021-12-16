import Endpoint from "./Endpoint"
import parseJWT from "./parseJWT"
import axios from "axios";
import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Container } from "react-bootstrap";


export default function UserReservation({JWT}){
	const colors = {APPROVED:"green",CANCELLED:"black",REJECTED:"red",PENDING:"yellow" }
	const [res,updateRes] = useState([])
	useEffect(()=>{ allReservations(); },[])
	const allReservations = async () => {
		console.log("Bearer "+JWT)
		const response = await axios.post(Endpoint + "/reservations/username",null ,{ headers: { "Authorization": "Bearer "+JWT }, params: {username:parseJWT(JWT).sub, pageNumber: 0, pageSize: 10000, sortBy: 'reservationID' } }).then(
			(data) => data
		)
		console.log('hit2')
		updateRes([...response.data.content])
	}

	
	return (
		<>
		<br/>
		<Container style={{width:"75%", height:"auto"}}>
		<FullCalendar 
		
			plugins={[ dayGridPlugin ]}
			initialView="dayGridMonth"
			eventClick={(e)=>console.log(e)}
			events={res.map((reserve)=>{return {title:reserve.status, start:reserve.startDate, end:reserve.endDate, color:colors[reserve.status]}})}
		/>
		
		</Container>
		</>
		)
		
}