import { useNavigate } from 'react-router-dom';
import './TeacherNotificationList.css';

const TeacherNotificationList = ({ notifications, unreadCount }) => {
    const navigate = useNavigate();

    return (
        <div className="notification-panel">
            <div className="notification-header">
                <h2>
                    Thông báo
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </h2>
            </div>
            <ul className="notification-list">
                {notifications.map((notif) => (
                    <li
                        key={notif.id}
                        onClick={() => navigate(notif.link)}
                        className={`notification-item ${notif.unread ? 'notification-unread' : ''}`}
                    >
                        <div className="notification-meta">
                            <span className="notification-student">
                                {notif.studentName}
                            </span>
                            <span className="notification-time">{notif.timestamp}</span>
                        </div>
                        <p className="notification-content">{notif.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherNotificationList;