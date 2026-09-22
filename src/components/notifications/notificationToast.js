import { useSelector } from "react-redux";
import styles from "../../styles/notifications.module.css"
import { useEffect } from "react";

export default function NotificationToast ({notification,onClose}) {

    const notsProperties = useSelector( (state) => state.notifications.notsProperties )
    
    useEffect(() => {

        if (!notification) return;

        if(notsProperties.allowSounds){

            const audio = new Audio("/sounds/notification-051.mp3");
    
            audio.volume = 1;
    
            audio.play()
                .then(() => {
                    console.log("🔊 Notification sound played");
                })
                .catch((error) => {
                    console.log("❌ Sound blocked:", error);
                });
        }

        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };

    }, [onClose,notification,notsProperties]);

    if (!notification) {
        return null;
    }

    const getIcon = (type) => ({
        success: "fa-solid fa-circle-check",
        warning: "fa-solid fa-triangle-exclamation",
        error: "fa-solid fa-circle-xmark",
        info: "fa-solid fa-circle-info",
    }[type] || "fa-solid fa-circle-info");

    return(
        <>
            <div className={`${styles.notificationToast} ${styles[`${notification.type}`]} `}
                style={{display: notsProperties.allowPopNotifications ? "flex" : "none"}}>

                <div className={`${styles.icon} `}>
                    <i className={getIcon(notification.type)} />
                </div>

                <div className={styles.notificationContent}>

                    <div className={styles.titleRowToast}>
                        <h3>{notification.title}</h3>
                    </div>

                    <p>{notification.message}</p>
                </div>

                <div className={styles.actions}>
                    
                </div>

            </div>
        </>
    )
}