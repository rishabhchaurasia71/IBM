import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const [phoneerror, setphoneerror] = useState('');
    const navigate = useNavigate();
    const register = async (e) => {
        /*if(phone.length < 10){
        setphoneerror("phone number to short");
        return;
        }*/
        setphoneerror("");
        e.preventDefault();
        // API Call
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        if(!response.ok){
            console.log(response);
        throw new Error("something went wrong")
        }
        const json = await response.json();
        setphoneerror("");
        console.log("data" + json);
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            // phone and email
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    } catch(err) {
        console.log("ErrorName" + err);
    }
    };
    return (
        <div className="container" style={{marginTop:'5%'}}>
        <div className="signup-grid">
        <div className="signup-form">
         <form method="POST" onSubmit={register}>
           <div className="form-group">
                <label htmlFor="email">Email</label>
                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                 {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                 <label htmlFor="name">Name</label>
                 <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                 <label htmlFor="email">Phone</label>
                 <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone" aria-describedby="helpId" />
                 {phoneerror? <div className="err" style={{ color: 'red' }}>{"Phone number to Short"}</div> : ''}
                 <label htmlFor="password">Password</label>
                 <input value={password} onChange={(e) => setPassword(e.target.value)}  name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />                             
                 <div className="btn-group">
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                </div>          
                        </div>
         </form>
         </div>
         </div>
         </div>
    );
}
export default Sign_Up;
