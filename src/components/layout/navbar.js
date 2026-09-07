import styles from '../../styles/dashboard.module.css'

import { ActionIcon, Drawer } from '@mantine/core';
import '../../styles/navbar.css'

import { Link, useLocation } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import SidebarDrawer from '../ui/sidebarDrawer';

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

    const [opened, { open, close }] = useDisclosure(false);

    return(

        <>
        <SidebarDrawer opened={opened} close={close} />
        {/* <Drawer 
            className={styles.drawer}
            opened={opened}
            onClose={close}
            title="Authentication"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            style={{
                height: "100%",
                borderRadius: "15px",
            }}
        >
            <h2>omar badwy</h2>
        </Drawer> */}

        <div className="navbar">

            <div className="title" >
                
                <div className={styles.drawerBtn}>
                    <ActionIcon
                        variant="default"
                        onClick={open}
                        aria-label="Open menu"
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#fff",
                        }}
                    >
                        <i
                            className="fa-solid fa-bars"
                            style={{
                                fontSize: "20px",
                                color: "#111827",
                            }}
                        />
                    </ActionIcon>
                </div>

                <h2>{title}</h2>
            </div>
            
            <div className="user" >
                <div className="user-info">
                        <span>omar</span>
                        <span>admin.com</span>
                </div>

                <div className="icons">
                    <Link to={"/settings"}>
                        <i style={{color:"black", fontSize:"20px"}} className="fa-solid fa-gear"></i>
                    </Link>

                    <i style={{color:"black", fontSize:"20px"}} className="fa-solid fa-moon"></i>
                </div>
            </div>

        </div>
        </>

    )
}