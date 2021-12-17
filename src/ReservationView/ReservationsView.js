import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Reservations from "./Reservations";
import { Table } from "react-bootstrap";
import Endpoint from "../Endpoint";

const ReservationsView = ({JWT}) => {
    const [show, setShow] = useState({
    all: true,
    pending: false, 
    upcoming: false,
    current: false
    });

    const {pending, upcoming, current, all} = show;
    const url = Endpoint+"/reservations";
    const [props, setProps] = useState([]);
    //GET NEW JWT FOR TEST. DELTE WHEN JWT WORKS

    const showPending = async (e) => {
        e.preventDefault();
        const response = await axios.get(url + "/status/pending", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 20, sortBy:'reservationID'}}).then(
            (data)=> data.data
        )
        setShow({ ...show, all:false, upcoming: false, current: false, pending: true })     
        console.log('hit')
        console.log(response.content)
        setProps(response.content);
    }

    const showUpcoming = async (e) => {
        e.preventDefault();
        const response = await axios.get(url + "/start", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 20, sortBy: 'reservationID' } }).then(
            (data) => data.data
        );
        setShow({ ...show, all: false, upcoming: true, current: false, pending: false })
        console.log('hit2')
        console.log(response.content)
        setProps(response.content);
    }

    const showCurrent = async (e) => {
        e.preventDefault();
        const response = await axios.get(url + "/startend", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 20, sortBy: 'reservationID' } }).then(
            (data) => data.data
        )
        setShow({ ...show, all: false, upcoming: false, current: true, pending: false })
        console.log(response.content)
        setProps(response.content);
    }

    const allReservations = async () => {
        
        const response = await axios.get(url + "/all", { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 20, sortBy: 'reservationID' } }).then(
            (data) => data.data
        )
        setShow({ ...show, all: true, upcoming: false, current: false, pending: false })
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
                    <Dropdown.Item name="pending" onClick={(e) => {

                        showPending(e)
                        }}> Pending Reservations</Dropdown.Item>
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
                                        <th> Status </th>
                                        <th >Start Date</th>
                                        <th >End Date</th>
                                    </tr>
                                </thead>
                                {props.map((value) => {
                                    return (
                                        <Reservations props={{value,  jwt: JWT }} />
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
                                   <th> Status </th>
                                   <th >Start Date</th>
                                   <th >End Date</th>
                                   <th >Modify</th>

                               </tr>
                           </thead>
                                {props.map((value) => {
                                    return (
                            <Reservations props={{value, jwt: JWT, pending: true}} />
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
                                        <th> Status </th>
                                        <th >Start Date</th>
                                        <th >End Date</th>
                                    </tr>
                                </thead>
                                {props.map((value) => {
                                    return (
                                        <Reservations props={{ value, jwt: JWT }} />
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
                                        <th> Status </th>
                                        <th >Start Date</th>
                                        <th >End Date</th>
                                        
                                    </tr>
                                </thead>
                                {props.map((value) => {
                                    return (
                                        <Reservations props={{ value, jwt: JWT }}/>
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

