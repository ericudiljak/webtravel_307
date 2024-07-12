// Layout1.jsx

import React from "react";
import Header from '../Header/Header';

const Layout1 = ({ children }) => {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
        </>
    );
}

export default Layout1;
