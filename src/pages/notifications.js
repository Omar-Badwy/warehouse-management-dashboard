import styles from "../styles/notifications.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { clearAllNotifications, dltNotification, markAllAsRead, markAsRead } from "../redux/features/slices/notificationsSlice";

export default function Notifications () {

    const notifications = useSelector( (state) => state.notifications.notifications)

    const unreadCount = notifications.filter( (notification) => !notification.read ).length;

    const dispatch = useDispatch()

    const [filter,setfilter] = useState("all")

    let filteredNotifications ;

    switch(filter) {
        case "all" : 
             filteredNotifications = notifications 
             break

        case "unread" : 
            filteredNotifications = notifications.filter( (notification) => !notification.read ) 
            break

        default : break
    }

    const formatDate = (date) => {
        const value = new Date(date);

        if (Number.isNaN(value.getTime())) return "";
        return value.toLocaleString("en-US", {
            month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
        });
    };

    const getIcon = (type) => ({
        success: "fa-solid fa-circle-check",
        warning: "fa-solid fa-triangle-exclamation",
        error: "fa-solid fa-circle-xmark",
        info: "fa-solid fa-circle-info",
    }[type] || "fa-solid fa-circle-info");
    
    const notificationsMap = filteredNotifications.map( (notification) => {
        return(
            <div className={`${styles.notification} ${!notification.read ? styles.unread : ""}`}>

                <div className={`${styles.icon} ${styles[notification.type]}`}>
                    <i className={getIcon(notification.type)} />
                </div>

                <div className={styles.notificationContent}>

                    <div className={styles.titleRow}>
                        <h3>{notification.title}</h3>
                        {!notification.read && <span className={styles.dot} />}
                    </div>

                    <p>{notification.message}</p>
                    <time><i className="fa-regular fa-clock" /> {formatDate(notification.createdAt)}</time>
                </div>

                <div className={styles.actions}>
                    {!notification.read && (
                        <button title="Mark as read"
                        onClick={ () => dispatch(markAsRead(notification.id)) }>
                        <i className="fa-solid fa-check" />
                        </button>
                    )}
                    <button title="Delete"
                        onClick={ () => dispatch(dltNotification(notification.id)) }>
                        <i className="fa-solid fa-trash-can" />
                    </button>
                </div>

            </div>
        )
    } )

    return (
        <>
            <div className={styles.container}>

                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>ACTIVITY CENTER</p>
                        <h1>Notifications</h1>
                        <p className={styles.subtitle}>
                            Stay up to date with everything happening in your warehouse.
                        </p>
                    </div>

                    <div className={styles.headerButtons}>
                        <button className={styles.clearBtn} 
                            onClick={ () => dispatch(clearAllNotifications()) }>clear all</button>
                    </div>
                </header>

                <section className={styles.toolbar}>
                    <div className={styles.tabs}>
                        <button className={filter === "all" ? styles.activeTab : ""}
                            onClick={() => setfilter("all") }>All <span>{notifications.length}</span></button>
                        <button className={filter === "unread" ? styles.activeTab : ""}
                            onClick={() => setfilter("unread") }>Unread <span>{unreadCount}</span></button>
                    </div>

                    <div className={styles.headerStats}>
                        <button className={styles.markAll}
                            onClick={() => dispatch(markAllAsRead())}
                            disabled={!unreadCount}>
                            <i className="fa-solid fa-check-double" /> Mark all as read
                        </button>
                    </div>
                </section>

                <main className={styles.content}>
                    {filteredNotifications.length === 0 ? (
                        <div className={styles.empty}>
                            <div className={styles.emptyIcon}><i className="fa-regular fa-bell-slash" /></div>
                            <h2>You're all caught up</h2>
                            <p>No unread notifications right now.</p>
                        </div> ) 
                        
                    : ( notificationsMap ) }
                </main>

            </div>
        </>
    )
}