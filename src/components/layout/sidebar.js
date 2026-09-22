// import { v4 as uuidv4 } from 'uuid';
import '../../styles/sidebar.css'
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ModalsContext } from '../../providers/modalsProvider';

function SideBar () {

    const location = useLocation()

    const {openModal} = useContext(ModalsContext)

    // ? variables
    const sidebarLinks = [
        { id: 1, title: "Dashboard", path: "/dashboard", icon: <i className="fa-solid fa-house-user"></i> },
        { id: 2, title: "Products", path: "/products", icon: <i className="fa-solid fa-cubes"></i>},
        { id: 3, title: "Categories", path: "/categories", icon: <i className="fa-solid fa-table-cells-large"></i>},
        { id: 4, title: "Clients", path: "/clients", icon: <i className="fa-solid fa-users"></i>},
        { id: 5, title: "Orders", path: "/orders", icon: <i className="fa-solid fa-cart-flatbed"></i>},
        { id: 6, title: "Notifications", path: "/notifications", icon: <i className="fa-solid fa-bell"></i>},
        { id: 7, title: "Settings", path: "/settings", icon: <i className="fa-solid fa-gear"></i>},
    ];

    const sidebarLinksMap = sidebarLinks.map( (item) => {
              return (

              <Link key={item.id} to={item.path} >
                    <div id={item.id} className={ `div ${location.pathname === item.path ? "active" : ""}` }>
                      <div className='div-icon'>
                          {item.icon}
                      </div>
                    </div>
              </Link>
            )
    } )

    // ? functions
    

  return (
    <>

      <div className='sidebar'>
            <div className='div-inputs' >

              {sidebarLinksMap}


              <div className="div logout" onClick={() => openModal("logout")}>
                  <div className='div-icon'>
                      <i className="fa-solid fa-right-from-bracket"></i>
                  </div>
              </div>
                

            </div>
      </div>

    
    </>
  );
};
export default SideBar;