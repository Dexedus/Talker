import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"

function LogInForm(){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const navigate = useNavigate();

const submit = async (e) =>{
    e.preventDefault(); // Prevent form refresh

    try {
        const response = await axios.post("http://localhost:5000/login", {
            username,
            password,
        });
        if (response.status === 200) {
            setMessage("Successful Log in!");
            setTimeout(() => {
            navigate("/home"); // Redirect to login page after message is shown
            }, 2000);
        }
    } catch (error) {
            setMessage("Wrong username or password, try again.");
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
            <button className="submitButtonForm" type="submit">Submit</button>
        </form>
    )
);
}

export default LogInForm;