
import React from "react";
import Header from '../Header/Header';

const Layout2 = ({ children }) => {
    return (
        <>
            <Header />
            <br/>
            <div>
                {children}
            </div>
        </>
    );
}

export default Layout2;








/*import React from "react";

import Footer from '../Footer/Footer';
import Streaming from "../../pages/streaming/Streaming"
import Guest from "../../pages/guestPage/Guest";


const Layout2 = () =>{
    return <>
    <Guest/>
    </>
}

export default Layout2*/