import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"


function LogInForm(){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const navigate = useNavigate();

const goToSignUp = async (e) => {
    e.preventDefault(); // Prevent form refresh
    navigate("/signup")
}

const submit = async (e) =>{
    e.preventDefault(); // Prevent form refresh

    try {
        const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/login`, {
            username,
            password,
        }, {
            withCredentials: true,  // Ensure cookies are included
        });

        if (response.status === 200) {
            setMessage("Successful Log in!");
            setTimeout(() => {
                navigate("/"); // Redirect to home page after message is shown
            }, 2000);
        }
    } catch (error) {
        // Improved error handling
        if (error.response) {
            setMessage(error.response.data.message || "Wrong username or password, try again.");
        } else {
            setMessage("An error occurred. Please try again.");
        }

        setTimeout(() => {
            setMessage("");  // Clear the message after a while
        }, 2000);
        
        console.error("Login error:", error);  // Log error for debugging
    }


}

return (
    message ? (
        <p>{message}</p>
    ) : (
        <form onSubmit={submit}>
            <h2>Log In</h2>
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
            <button className="goToSignUpButton" onClick={goToSignUp}>Sign Up</button>
          </div>
        </form>
    )
);
}

export default LogInForm;