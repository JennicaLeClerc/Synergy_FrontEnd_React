import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Reservations from "./Reservations";
import { Table } from "react-bootstrap";

const ReservationsView = () => {
    const [show, setShow] = useState({
    all: true,
    pending: false, 
    upcoming: false,
    current: false
    });

    const {pending, upcoming, current, all} = show;
    const url = "http://localhost:5000/reservations";
    const [props, setProps] = useState([]);
    //GET NEW JWT FOR TEST. DELTE WHEN JWT WORKS
    const JWT = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJzdWIiOiJqdWFhYW5uIiwiSUQiOjEsImV4cCI6MTYzOTYwNDQyMCwiaWF0IjoxNjM5NjA0MTIwfQ.1dnsg2xVqNO5g22CpaC8i-5ExSh0UbbGN8AnnokvuuM"
    const showPending = async (e) => {
        e.preventDefault();
        const response = await axios.get(url + "/status/pending", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 10, sortBy:'reservationID'}}).then(
            (data)=> data.data
        )
        setShow({ ...show, all:false, upcoming: false, current: false, pending: true })     
        console.log('hit')
        console.log(response.content)
        setProps(response.content);
    }

    const showUpcoming = async (e) => {
        e.preventDefault();
        const response = await axios.get(url + "/start", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 10, sortBy: 'reservationID' } }).then(
            (data) => data.data
        );
        setShow({ ...show, all: false, upcoming: true, current: false, pending: false })
        console.log('hit2')
        console.log(response.content)
        setProps(response.content);
    }

    const showCurrent = async (e) => {
        e.preventDefault();
        const response = await axios.get(url + "/startend", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 10, sortBy: 'reservationID' } }).then(
            (data) => data.data
        )
        setShow({ ...show, all: false, upcoming: false, current: true, pending: false })
        console.log(response.content)
        setProps(response.content);
    }

    const allReservations = async () => {
        
        const response = await axios.get(url + "/all", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 10, sortBy: 'reservationID' } }).then(
            (data) => data.data
        )
        setShow({ ...show, all: true, upcoming: false, current: false, pending: false })
        console.log('hit2')
        console.log(response.content)
        setProps(response.content);
    }

    useEffect(()=> {
        allReservations();
    }, []);

    return (
             <>
            <div></div>
            <div style={{ backgroundColor: '#e9ecef', padding: '50px', marginBottom: '30px' }} className="text-center">
                <h1>Reservations View</h1>
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{marginLeft: 100}}>
                Reservations
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item name="pending" onClick={(e) => showPending(e)}> Pending Reservations</Dropdown.Item>
                    <Dropdown.Item name="upcoming" onClick={(e) => showUpcoming(e)}>Upcoming Reservations</Dropdown.Item>
                    <Dropdown.Item name="current" onClick={(e) => showCurrent(e)}>Current Reservations</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
                <>
                <div style={{marginLeft: 100, marginTop: 20}}>
                {all ? 
                        <>
                            <h1>All Reservations</h1>
                            <Table striped bordered hover size="sm" style={{ width: '90%' }}>
                                <thead >
                                    <tr>
                                        <th >Reservation ID</th>
                                        <th> Staus </th>
                                        <th >Start Date</th>
                                        <th >End Date</th>
                                    </tr>
                                </thead>
                                {props.map((value) => {
                                    return (
                                        <Reservations props={value} />
                                    )
                                })}
                            </Table>
                        </>
                : ''}
                {pending ? 
                <>
                <h1>Pending Reservations</h1>
                       <Table striped bordered hover size="sm" style={{ width: '90%' }}>
                           <thead >
                               <tr>
                                   <th >Reservation ID</th>
                                   <th> Staus </th>
                                   <th >Start Date</th>
                                   <th >End Date</th>
                               </tr>
                           </thead>
                                {props.map((value) => {
                                    return (
                            <Reservations props={value} />
                                    )})}
                       </Table>
                        </>
                : ''}
                    {current ?
                        <>
                            <h1>Current Reservations</h1>
                            <Table striped bordered hover size="sm" style={{ width: '90%' }}>
                                <thead >
                                    <tr>
                                        <th >Reservation ID</th>
                                        <th> Staus </th>
                                        <th >Start Date</th>
                                        <th >End Date</th>
                                    </tr>
                                </thead>
                                {props.map((value) => {
                                    return (
                                        <Reservations props={value} />
                                    );
                                })}
                            </Table>
                        </>
                        : ''}
                {upcoming ?
                <>
                    <h1>Upcoming Reservations</h1>
                            <Table striped bordered hover size="sm" style={{ width: '90%' }}>
                                <thead >
                                    <tr>
                                        <th >Reservation ID</th>
                                        <th> Staus </th>
                                        <th >Start Date</th>
                                        <th >End Date</th>
                                    </tr>
                                </thead>
                                {props.map((value) => {
                                    return (
                                        <Reservations props={value} />
                                    );
                                })}
                            </Table>
                        </>
                    : ''}
                </div>
                </>
            </>
    );
}

export default ReservationsView;

