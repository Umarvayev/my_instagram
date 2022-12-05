import React from 'react';
import NavBar from './Mynavbar';
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <NavBar/>
            <div className="content">
                <Outlet/>
            </div>
        </>
    );
};

export default Layout;
