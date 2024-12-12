import React from "react";
import Header from "../header";
import Footer from "../footer";
import SignUpForm from "../formComponents/signUpForm";

function SignUp(){
    return(
        <div className="signUp">
          <Header />
          <SignUpForm />
          <Footer />
        </div>
    )
}

export default SignUp; 