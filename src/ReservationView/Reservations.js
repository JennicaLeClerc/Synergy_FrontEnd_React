import axios from "axios";
import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import Endpoint from "../Endpoint";
const Reservations =  ({props}) => {
   const [status, setStatus] = useState("PENDING");
   const [show, setShow] = useState(true);

    const { value, jwt } = props;

    const statusChange = async (e) => {
        e.preventDefault();
        setStatus(e.target.name)
   }
   const submit = async (e) => {
       e.preventDefault();
       console.log(status)
    const response = await axios.post(Endpoint + `/reservations/update/${value.reservationID}`, null, { headers: { "Authorization": `Bearer ${jwt}` }, params: { status, status } });
     console.log(response);
       setShow(false);
   }

    return (
        <>
        {show ?
            <tbody>
                <tr>
                    <td>{value.reservationID}</td>
                    <td>{value.status}</td>
                    <td>{value.startDate.substring(0,10)}</td>
                    <td>{value.endDate.substring(0, 10)}</td>
                    { value.status == "PENDING" && props.pending ? 
                    <>
                    <td style={{width:"10%"}}>
                        <Dropdown variant="warning" >
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            {status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => {
                                statusChange(e) }} name="APPROVED">Approved</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => statusChange(e)} name="REJECTED" >Reject</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </td>
                                <td style={{ width: "5%" }}> <Form onSubmit={submit}>
                                    <Button type="submit">Save</Button>
                    </Form>
                    </td>
                    </>
                    : ''}
                </tr>
            </tbody>
            : ''}
        </>
    )
}

export default Reservations;