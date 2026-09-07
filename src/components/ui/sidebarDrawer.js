import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Drawer } from "@mantine/core";
import { logout } from "../../redux/features/slices/authSlise";
import styles from "../../styles/dashboard.module.css";

function SidebarDrawer({ opened, close }) {
  const location = useLocation();
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    dispatch(logout());
    close();
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="left"
      size={290}
      title=""
      classNames={{
        content: styles.drawerContent,
        header: styles.drawerHeader,
        close: styles.drawerClose,
        body: styles.drawerBody,
      }}
      overlayProps={{
        backgroundOpacity: 0.45,
        blur: 3,
      }}
    >
      {/* Logo */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <i className="fa-solid fa-warehouse" />
        </div>

        <div className={styles.brandText}>
          <h2>Warehouse</h2>
          <span>Management</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Navigation */}
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

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.divider} />

        <button
          className={styles.logout}
          onClick={handleLogout}
        >
          <span className={styles.icon}>
            <i className="fa-solid fa-right-from-bracket" />
          </span>

          <span className={styles.linkText}>
            Logout
          </span>
        </button>

        {/* User */}
        <div className={styles.userCard}>
          <div className={styles.avatar}>
            O
          </div>

          <div className={styles.userInfo}>
            <strong>Omar</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SidebarDrawer;