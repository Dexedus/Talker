import React from "react";
import LogInForm from "../formComponents/logInForm";
import Header from "../header";
import Footer from "../footer";

function LogIn(){
    return(
    <div className="logIn">
        <Header />
        <LogInForm />
        <Footer />
    </div>
    )
}

export default LogIn;