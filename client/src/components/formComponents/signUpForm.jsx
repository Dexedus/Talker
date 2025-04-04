import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"


function SignUpForm(){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const navigate = useNavigate();

const goToLogIn = async (e) => {
    e.preventDefault(); // Prevent form refresh
    navigate("/")
}

const submit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    try {
        const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/signup`, {
            username,
            password,
        });
        if (response.status === 200) {
            setMessage("Successful Registration!");
            setTimeout(() => {
            navigate("/"); // Redirect to login page after message is shown
            }, 2000);
        }
    } catch (error) {
            setMessage("Username already taken, please choose another.");
            setTimeout(() => {
            setMessage("")
            }, 2000);
        console.error(error);
    }


}

return (
    message ? (
        <p>{message}</p>
    ) : (
        <form onSubmit={submit}>
            <h2>Sign Up</h2>
            <h3>Enter Username</h3>
            <input 
                type="text" 
                name="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
            />
            <h3>Enter Password</h3>
            <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
            <div className="formButtonContainer">
              <button className="submitButtonForm" type="submit">Submit</button>
              <button className="goToLogInButton" onClick={goToLogIn}>Log In</button>
            </div>
        </form>
    )
);
}

export default SignUpForm;