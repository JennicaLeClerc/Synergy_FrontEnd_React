import Endpoint from "./Endpoint"
import parseJWT from "./parseJWT"
import axios from "axios";
import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Container } from "react-bootstrap";


export default function UserReservation({JWT}){

	const allReservations = async () => {
		
		const response = await axios.get(Endpoint + "/reservations/username", { headers: { "Authorization": `Bearer ${JWT}` }, params: {username:parseJWT(JWT).sub, pageNumber: 0, pageSize: 10000, sortBy: 'reservationID' } }).then(
			(data) => data
		)
		console.log('hit2')
		console.log(response.data)
	}

	allReservations();
	return (
		<>
		<br/>
		<Container style={{width:"75%", height:"auto"}}>
		<FullCalendar 
			plugins={[ dayGridPlugin ]}
			initialView="dayGridMonth"
			events={[
			{ title: 'event 1', start: '2021-12-15', end: '2021-12-20' },
			{ title: 'event 2', date: '2019-04-02' }
			]}
		/>
		
		</Container>
		</>
		)
}