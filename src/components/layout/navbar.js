import '../../styles/navbar.css'

import { Link, useLocation } from "react-router-dom";

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

        return pageTitles[pathname] || "";
    };

    const title = getPageTitle(location.pathname);

    return(

        <div className="navbar">

            <div className="title" >
                <h2 style={{textTransform:"capitalize"}}>{title}</h2>
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

    )
}