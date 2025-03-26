import { React, useState, useEffect } from "react";
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";

function Chatroom(){

    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
      const fetchPosts = async () => {
          try {
              const response = await axios.get("http://localhost:5000/getPosts", {
                  withCredentials: true, // Ensures cookies are sent
              });
              setPosts(response.data);
          } catch (error) {
              if (error.response && error.response.status === 401) {
                  // Redirect to login if unauthorized
                  navigate("/login");
              } else {
                  console.error("Error fetching posts:", error);
              }
          }
      };

      fetchPosts();
  }, [navigate]);


    const submitForm = async (e) => {
      e.preventDefault();
      console.log(input);
  
      try {
        await axios.post("http://localhost:5000/addPosts", { message: input }, {
          withCredentials: true,  // Ensure cookies are included
      }
    );
        setInput(""); 
        // Re-fetch posts after submitting a new message
        const response = await axios.get("http://localhost:5000/getPosts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    };


    return(
        <div>
          <main>
          {posts.length > 0 ? (
          posts.map((post, index) => <p key={index}>{post.content}</p>)
        ) : (
          <p>No messages yet</p>
        )}
          </main>
          <form onSubmit={submitForm}>
            <input onChange={(e) => setInput(e.target.value)} value={input}></input>
            <button type="submit">Send</button>
          </form>
        </div>
    );
};

export default Chatroom;