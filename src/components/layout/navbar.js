import styles from '../../styles/dashboard.module.css'

import { ActionIcon } from '@mantine/core';
import '../../styles/navbar.css'

import { Link, useLocation } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import SidebarDrawer from '../ui/sidebarDrawer';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../providers/themeProvider';
import { useSelector } from 'react-redux';

export default function Navbar () {

    const location = useLocation()

    const pageTitles = {
        "/dashboard": "dashboard",
        "/products": "products",
        "/categories": "categories",
        "/clients": "clients",
        "/orders": "orders",
        "/settings": "settings",
        "/error": "errorPage",
    };

    const getPageTitle = (pathname) => {
        if (pathname.startsWith("/clients/")) {
            return "clients/ client details";
        }

        if (pathname.startsWith("/categories/")) {
            return "categories/ category details";
        }

        if (pathname.startsWith("/orders/")) {
            return "orders/ order details";
        }

        return pageTitles[pathname] || "";
    };

    const title = getPageTitle(location.pathname);

    const user = useSelector( (state) => state.auth.user)

    const [opened, setOpend] = useState(false);

    const openDrawer = () => {
        setOpend(true)
    }

    const closeDrawer = () => {
        setOpend(false)
    }

    const {mode,setMode} = useContext(ThemeContext)

    function toLigth (e) {
        setMode("ligth")
    }

    function toDark (e) {
        setMode("dark")
    }

    return(

        <>
        <SidebarDrawer opened={opened} close={closeDrawer} />

        <div className="navbar">

            <div className="title" >
                
                <div className={styles.drawerBtn} onClick={openDrawer}>
                    <i className="fa-solid fa-bars"/>
                </div>

                <h2>{title}</h2>
            </div>
            
            <div className="user" >
                <div className="user-info">
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                </div>

                <div className="icons">
                    <Link to={"/settings"}>
                        <i style={{color: mode === "ligth" ? "black" : "#647084", fontSize:"20px"}} className="fa-solid fa-gear"></i>
                    </Link>
                    
                    <i style={{color: mode === "ligth" ? "black" : "#647084",
                     cursor:"pointer", fontSize:"20px",display: mode === "ligth" ? "flex" : "none" }} 
                    className="fa-solid fa-moon" onClick={toDark}></i>

                    <i style={{color: mode === "ligth" ? "black" : "#647084",
                     cursor:"pointer", fontSize:"20px",display: mode === "dark" ? "flex" : "none" }} 
                    className="fa-solid fa-sun" onClick={toLigth}></i>

                </div>
            </div>

        </div>
        </>

    )
}