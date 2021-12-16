
const Reservations = ({props}) => {
   
    return (
        <>
            <tbody>
                <tr>
                    <td>{props.reservationID}</td>
                    <td>{props.status}</td>
                    <td>{props.startDate.substring(0,10)}</td>
                    <td>{props.endDate.substring(0, 10)}</td>
                </tr>
            </tbody>
        </>
    )
}

export default Reservations;