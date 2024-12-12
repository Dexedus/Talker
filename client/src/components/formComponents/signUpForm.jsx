import React, { useState } from "react";

function SignUpForm(){
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")


function submit(){
    console.log("This is the " + username)
    console.log("This is the " + password)
}

    return(
        <form>
            <h2>Sign Up</h2>
            <h3>Enter Username</h3>
            <input type="text" name="username" onChange={((e)=>{
                setUsername(e.target.value);
            })} required></input>
            <h3>Enter Password</h3>
            <input type="text" name="password" onChange={((e)=>{
                setPassword(e.target.value);
            })} required></input>
            <button onClick={submit}>Submit</button>
        </form>
    )
}

export default SignUpForm;