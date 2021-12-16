const Reservations = ({props}) => {
   
    return (
        <>
        {console.log(props)}
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