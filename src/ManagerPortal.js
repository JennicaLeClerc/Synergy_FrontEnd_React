import React, {useState} from "react";
import { 
	Button, 
	Container, 
	Form, 
	FormCheck 
} from "react-bootstrap";
import axios from "axios";

const ManagerPortal = () => {
    const [userIntput, setUserInput] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '', 
        employeeType: ''
    });

    const { firstName, lastName, username, password, employeeType } = userIntput;

    const change = (e) => {
        e.preventDefault();
        setUserInput({ ...userIntput, [e.target.name]: e.target.value });
    }

    const selection = (e)=>{
        setUserInput({ ...userIntput, employeeType: e.target.value });
    }
    const submit = async (e) => {
        console.log('submited')
        e.preventDefault();
        //axios post call
        const response = await axios.post("http://localhost:5000/employee", userIntput);
        console.log(response);
    }

    return (
        <>
            <div></div>
            <div style={{ backgroundColor: '#e9ecef', padding: '50px', marginBottom:'30px'}} className="text-center">
                <h1>Manager's Portal</h1>
            </div>
            <div style={{ color: '#f26926'}} className="container">
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <h2>Add A New Employee</h2>
                        <form onSubmit={(e) =>  submit(e) } style={{ backgroundColor:"#f7f7f7"}}>
                            <div className="form-group" >
                                <label for="firstName">First Name</label>
                                <input type="text" className="form-control" value={firstName} name="firstName" placeholder="Enter First Name" onChange={change} required/>
                                    <span id="msg1">*</span>
                            </div>
                            <div className="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" className="form-control" value={lastName} name="lastName" placeholder="Enter Last Name" onChange={change} required/>
                                    <span id="msg2">*</span>
                            </div>
                            <div className="form-group">
                                <label for="username">User Name</label>
                                <input type="text" className="form-control" value={username} name="username" placeholder="Enter User Name" onChange={change} required/>
                                    <span id="msg3">*</span>
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input type="password" className="form-control" value={password} name="password" placeholder="Enter Password" onChange={change} required/>
                                    <span id="msg4">*</span>
                            </div>
                            <Form aria-required>
                                <label for="password">Employee Type</label>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            label="Recepcionist"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                           value="RECEPTIONIST"
                                            onChange={(e)=> selection(e)}
                                        />
                                        <Form.Check
                                           value="MANAGER"
                                            label="Manager"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            onChange={(e) => selection(e)}
                                        />
                                        <Form.Check
                                           value="MAINTENANCE"
                                            label="Maintenance"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            onChange={(e)=> selection(e)}
                                        />
                                    </div>
                                ))}
                            </Form>
                            <br/>
                            <div className="d-grid gap-2">
                                <Button style={{ backgroundColor: "#f26926" }} size="lg" type="submit" value="Submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>    )
}

export default ManagerPortal;