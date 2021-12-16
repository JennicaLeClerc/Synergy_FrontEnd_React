import React, {useState, useEffect} from "react";
import Endpoint from "./Endpoint";
import axios from "axios";
import { Table } from "react-bootstrap";

const AllEmployee = ({JWT}) => {
    
    const url = Endpoint + "/employee";
    const [props, setProps] = useState([]);
    //GET NEW JWT FOR TEST. DELTE WHEN JWT WORKS

    const allEmployees = async () => {

        const response = await axios.get(url , { headers: { "Authorization": `Bearer ${JWT}` }, params: { pageNumber: 0, pageSize: 10, sortBy: 'employeeType' } }).then(
            (data) => data.data
        );
        setProps(response.content);
        console.log(props)
    }

    useEffect(() => {
        allEmployees();
    }, []);

    return (
        <>
            <div></div>
            <div style={{ backgroundColor: '#e9ecef', padding: '50px', marginBottom: '30px' }} className="text-center">
                <h1>Employees View</h1>
            </div>
            <>
                <div style={{ marginLeft: 100, marginTop: 20 }}>
                        <>
                            <h1>All Employees</h1>
                            <Table striped bordered hover size="sm" style={{ width: '90%' }}>
                                <thead >
                                    <tr>
                                        <th >Employee ID</th>
                                        <th >First Name</th>
                                        <th> Last Name </th>
                                        <th >Role</th>
                                    </tr>
                                </thead>
                                {props.map((value) => {
                                    console.log(value)
                                    return (
                                        <>
                                            {/* <tbody>
                                                <tr>
                                                    <td>{value.reservationID}</td>
                                                    <td>{value.status}</td>
                                                    <td>{value.startDate.substring(0, 10)}</td>
                                                    <td>{value.endDate.substring(0, 10)}</td>
                                                </tr>
                                            </tbody> */}
                                        </>
                                    )
                                })}
                            </Table>
                        </>
                </div>
            </>
        </>
    );
}

export default AllEmployee;
