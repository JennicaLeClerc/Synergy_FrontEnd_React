import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createReservation.css';
import axios from 'axios';

const Reservation = ()=> {
  
  const [formValue, updateFormValue] = React.useState({
fullName: '',
email: '',
phone: '',
adults: '',
children: '',
checkin: '',
checkout: '',
choice: '',
accommodations:''
  });

  const handleSubmit = async() => {
   const resFormData = new FormData();
resFormData.append("Name", formValue.fullName)
resFormData.append("Email", formValue.email)
resFormData.append("Phone", formValue.phone)
resFormData.append("Adults", formValue.adults)
resFormData.append("Children", formValue.chilren)
resFormData.append("Check-in Date", formValue.checkin)
resFormData.append("Check-out Date", formValue.checkout)
resFormData.append("Email", formValue.email)
resFormData.append("Choice", formValue.choice)
resFormData.append("Accommodations", formValue.accommodations)
try {
    const response = await axios({
method: "post",
url:"http://localhost:5000/createReservaation",
data:resFormData,
headers:{"Content-Type":"application/json"},
    });
  } catch(error) {
    console.log(error)
  }
}

  const handleChange = (event) => {
    updateFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <body >
      <nav id="nav-placeholder"></nav>
      <div style={{ backgroundColor: '#e9ecef', 
							display: 'flex', justifyContent: 'center', paddingTop:'30px'}} >
							<h1>Synergy Hotel Management System</h1>
					</div> 
			<div style={{
				backgroundColor: '#e9ecef',
				display: 'flex', justifyContent: 'center', paddingBottom:'40px', 
				marginBottom: '30px'
			}}>
				
							 </div>	
    <form className="resForm">
    <h3>Book A New Reservation</h3>
 <label>Your Name</label>
        <input type="text" name="fullName" value={formValue.fullName} onChange={handleChange} /><br/><br/>
      <label>Your Email</label>
        <input type="text" name ="email" value={formValue.email} onChange={handleChange}/><br/><br/>
    <label>Your Phone </label>
        <input type="text" name="phone" value={formValue.phone} onChange={handleChange} /><br/><br/>
       <label>Adults</label> 
        <input type="number" name="adults" value={formValue.adults} onChange={handleChange} /><br/><br/>
     
      <label>Children </label>
        <input type="number" name="children" value={formValue.children} onChange={handleChange}  /><br/><br/>
     
      <label>Check-in Date</label>
        <input type="date" name="checkin" value={formValue.checkin} onChange={handleChange} /><br/><br/>
      
     <label>Check-out Date </label>
        <input type="date" name="checkout" value={formValue.checkout} onChange={handleChange}  /><br/><br/>
  
      <label>Select Room Preference </label><br/><br/>
      <select name="choice" value={formValue.choice} onChange={handleChange}>
        <option value="">Choose a Room from the List</option>
        <option value="connecting">1 Bed</option>
        <option value="adjoining">2 Beds</option>
        <option value="adjacent">3 Beds</option>
      </select><br/><br/>
      
 <label>Anything Else?</label>
<textarea value="accommodations" value={formValue.accommodations} onChange={handleChange}></textarea><br/><br/>
                       
 <input type="submit" />
    </form>
    </body>
  )
};

export default Reservation;