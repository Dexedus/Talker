import React from "react";

function Copyright(){

    const currentYear = new Date().getFullYear()


    return(
        <p>Copyright © {currentYear}</p>
    )
}

export default Copyright;