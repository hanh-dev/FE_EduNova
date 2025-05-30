
import { useEffect, useState } from 'react';
import TeacherNotificationList from '../../../components/teacher/Alert/TeacherNotificationList';
import { getTeacherNotifications } from '../../../services/api/TeacherAPI';
const TeacherNotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getTeacherNotifications();
                setNotifications(data);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
            }
        };

        fetchNotifications();
    }, []);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="p-6">
            <TeacherNotificationList notifications={notifications} unreadCount={unreadCount} />
        </div>
    );
};

export default TeacherNotificationPage;
