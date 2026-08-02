import '../../styles/navbar.css'

import { Link } from "react-router-dom";


export default function Navbar () {


    return(

        <div className="navbar">

            <div className="title" >
                <h2>Dashboard</h2>
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