import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import SideBar from "./components/layout/sidebar";
import './dashboardLayout.css';

export default function DashboardLayout () {

    return(
        <>
        <div className="app">
        
            <SideBar className='sidebar'/>
            
            <Navbar className='navbar'/>

            <div className="main">
                <Outlet/>
            </div>
    
        </div>
        </>
    )
}