import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Drawer } from "@mantine/core";
import styles from "../../styles/dashboard.module.css";
import { useContext } from "react";
import { ModalsContext } from "../../providers/modalsProvider";

function SidebarDrawer({ opened, close }) {
  const location = useLocation();

  const {openModal} = useContext(ModalsContext)

  const user = useSelector( (state) => state.auth.user)

  const sidebarLinks = [
    {
      id: 1,
      title: "Dashboard",
      path: "/dashboard",
      icon: <i className="fa-solid fa-house-user" />,
    },
    {
      id: 2,
      title: "Products",
      path: "/products",
      icon: <i className="fa-solid fa-cubes" />,
    },
    {
      id: 3,
      title: "Categories",
      path: "/categories",
      icon: <i className="fa-solid fa-table-cells-large" />,
    },
    {
      id: 4,
      title: "Clients",
      path: "/clients",
      icon: <i className="fa-solid fa-users" />,
    },
    {
      id: 5,
      title: "Orders",
      path: "/orders",
      icon: <i className="fa-solid fa-cart-flatbed" />,
    },
    {
      id: 6,
      title: "Settings",
      path: "/settings",
      icon: <i className="fa-solid fa-gear" />,
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };


  return (

      <div className={opened ? styles.overlay : ""} onMouseDown={close}>

        <div className={`${styles.drawerContent} ${opened ? styles.drawerOpen : ""}`}>

          <div className={styles.drawerHeader}>
              <button className={styles.drawerClose} onClick={close}>
                  <i className="fa-solid fa-xmark"></i>
              </button>
          </div>

          <div className={styles.drawerBody}>

              <div className={styles.brand}>
                  <div className={styles.brandIcon}>
                      <i className="fa-solid fa-warehouse"></i>
                  </div>

                  <div className={styles.brandText}>
                      <h2>Warehouse</h2>
                      <span>Management System</span>
                  </div>
              </div>

              <div className={styles.divider}></div>

              <nav className={styles.nav}>
                <p className={styles.sectionTitle}>MAIN MENU</p>

                {sidebarLinks.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={close}
                    className={`${styles.navLink} ${
                      isActive(item.path) ? styles.active : ""
                    }`}
                  >
                    <span className={styles.icon}>{item.icon}</span>

                    <span className={styles.linkText}>
                      {item.title}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className={styles.bottom}>

                  <div className={styles.divider}></div>

                  <button
                      className={styles.logout}
                      onClick={() => openModal("logout")}
                  >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Logout</span>
                  </button>

                  <div className={styles.userCard}>
                      <div className={styles.avatar}>
                          O
                      </div>

                      <div className={styles.userInfo}>
                          <strong>{user.name}</strong>
                          <span>Administrator</span>
                      </div>
                  </div>

              </div>

          </div>
        </div>

      </div>
  );
}

export default SidebarDrawer;