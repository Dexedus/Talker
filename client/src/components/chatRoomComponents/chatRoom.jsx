import { React, useState } from "react";

function Chatroom(){

    const [input, setInput] = useState("")


    const submitForm = async (e) => {
        e.preventDefault()
        console.log(input)
        setInput("")
    }

    return(
        <>
          <main>
            <p>This is the homepage</p>
          </main>
          <form onSubmit={submitForm}>
            <input onChange={(e) => setInput(e.target.value)} value={input}></input>
            <button type="submit">Send</button>
          </form>
        </>
    );
};

export default Chatroom;