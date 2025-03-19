import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"

function SignUpForm(){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const navigate = useNavigate();


const submit = async(e) => {
    e.preventDefault(); // Prevent form refresh

    // console.log("This is the " + username)
    // console.log("This is the " + password)

    try {
        const response = await axios.post("http://localhost:5000/signup", {
            username,
            password,
        });
        if (response.status === 200) {
            setMessage("Successful Registration!");
            setTimeout(() => {
            navigate("/login"); // Redirect to login page after message is shown
            }, 1000);
        } else if (response.status === 400){
            setMessage("Username already exists, try again")
            setTimeout(() => {
            navigate("/signup"); // Redirect to signup page if status is 400
            }, 1000);
        }
    } catch (error) {
        setMessage("Username already taken, please choose another.");
        console.error(error);
    }



}

    return(
        <form onSubmit={submit}>
            <h2>Sign Up</h2>
            <h3>Enter Username</h3>
            <input type="text" name="username" onChange={((e)=>{
                setUsername(e.target.value);
            })} required></input>
            <h3>Enter Password</h3>
            <input type="password" name="password" onChange={((e)=>{
                setPassword(e.target.value);
            })} required></input>
            <button className="submitButtonForm" type="submit">Submit</button>
            {message && <p>{message}</p>}
        </form>
    )
}

export default SignUpForm;