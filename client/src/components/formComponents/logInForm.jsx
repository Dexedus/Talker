import React, { useState } from "react";

function LogInForm(){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const submit = async (e) =>{
    e.preventDefault(); // Prevent form refresh

    console.log("This is the " + username)
    console.log("This is the " + password)
}

    return(
        <form onSubmit={submit}>
            <h2>Log In</h2>
            <h3>Enter your Username</h3>
            <input type="text" name="username" onChange={((e)=>{
                setUsername(e.target.value);
            })} required></input>
            <h3>Enter your Password</h3>
            <input type="text" name="password" onChange={((e)=>{
                setPassword(e.target.value);
            })} required></input>
            <button className="submitButtonForm" type="submit">Submit</button>
        </form>
    )
}

export default LogInForm;