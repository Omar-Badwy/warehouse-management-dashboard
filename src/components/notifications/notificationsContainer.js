import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NotificationToast from "./notificationToast";

const NotificationContainer = () => {

    const notifications = useSelector(
        (state) => state.notifications.notifications
    );

    const [notification, setNotification] = useState(null);

    const lastNotificationId = useRef(null);

    useEffect(() => {

        if (notifications.length === 0) {
            return;
        }

        const latestNotification = notifications[0];

        if (latestNotification.id === lastNotificationId.current) {
            return;
        }

        lastNotificationId.current = latestNotification.id;

        setNotification(latestNotification);

    }, [notifications]);

    return (
        <NotificationToast
            notification={notification}
            onClose={() => setNotification(null)}
        />
    );
};

export default NotificationContainer;