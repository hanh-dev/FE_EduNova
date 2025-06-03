import { useNavigate } from 'react-router-dom';
import './TeacherNotificationList.css';
import { useAuth } from '../../../services/providers/AuthContext';

const TeacherNotificationList = ({ notifications, unreadCount }) => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleClick = (student) => {
        console.log("Check student data: ", student);
        console.log("Check teacher data: ", user);
        if (user && user.username && user.user_id) {
            localStorage.setItem('teacherData', JSON.stringify({
                username: user.username,
                role: 'teacher',
                user_id: user.user_id,
            }));
        } else {
            console.warn("Teacher data is not available or incomplete");
        }
        setUser({
            username: student.studentName,
            role: 'student',
            user_id: student.student_id,
        });

        navigate('/semester-goals', {
            state: { goalId: student.goalId },
        });
    }

    return (
        <div className="notification-panel">
            <div className="notification-header">
                <h2>
                    Notifications
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </h2>
            </div>
            <ul className="notification-list">
                {notifications.map((notif) => (
                    <li
                        key={notif.id}
                        onClick={() => handleClick(notif)}
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