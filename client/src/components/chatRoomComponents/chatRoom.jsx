import { React, useState } from "react";
import axios from "axios"

function Chatroom(){

    const [input, setInput] = useState("");


    const submitForm = async (e) => {
        e.preventDefault()
        console.log(input)
        setInput("")

        try {
            const result = await axios("")
            
        } catch (error) {
            
        }



    };

    return(
        <div>
          <main>
            <p>This is the homepage</p>
          </main>
          <form onSubmit={submitForm}>
            <input onChange={(e) => setInput(e.target.value)} value={input}></input>
            <button type="submit">Send</button>
          </form>
        </div>
    );
};

export default Chatroom;