// import { v4 as uuidv4 } from 'uuid';
import '../../styles/sidebar.css'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/slices/authSlise';

function SideBar () {

    const location = useLocation()

    const dispatch = useDispatch()

    // ? variables
    const sidebarLinks = [
        { id: 1, title: "Dashboard", path: "/dashboard", icon: <i className="fa-solid fa-house-user"></i> },
        { id: 2, title: "Products", path: "/products", icon: <i className="fa-solid fa-cubes"></i>},
        { id: 3, title: "Categories", path: "/categories", icon: <i className="fa-solid fa-table-cells-large"></i>},
        { id: 4, title: "Clients", path: "/clients", icon: <i className="fa-solid fa-users"></i>},
        { id: 5, title: "Orders", path: "/orders", icon: <i className="fa-solid fa-cart-flatbed"></i>},
        { id: 6, title: "Settings", path: "/settings", icon: <i className="fa-solid fa-gear"></i>},
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


              <div className="div logout" onClick={() => dispatch(logout())}>
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