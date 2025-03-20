import React from "react";
import Header from "../header";
import Footer from "../footer";
import Chatroom from "../chatRoomComponents/chatRoom";
import '../styles/ChatRoom.css';

function Home(){
    return(
    <div className="home">
        <Header />
        <Chatroom />
        <Footer />
    </div>
    )
}

export default Home;