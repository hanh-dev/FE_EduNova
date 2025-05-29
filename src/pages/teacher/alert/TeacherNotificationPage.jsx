import { useEffect, useState } from 'react';
import TeacherNotificationList from '../../../components/teacher/Alert/TeacherNotificationList';
import { getTeacherNotifications } from '../../../services/api/TeacherAPI';

const TeacherNotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ Thêm dòng này

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const data = await getTeacherNotifications();
                setNotifications(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
                setLoading(false); 
            }
        };

        fetchNotifications();
    }, []);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="p-6">
            {loading ? (
                <p>Đang tải thông báo...</p>
            ) : (
                <>
                    {notifications.length === 0 && (
                        <p>Không có thông báo nào.</p>
                    )}
                    {notifications.length > 0 && (
                        <TeacherNotificationList
                            notifications={notifications}
                            unreadCount={unreadCount}
                        />
                    )}
                </>
            )}
        </div>
    );

};

export default TeacherNotificationPage;