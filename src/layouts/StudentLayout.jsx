// src/layouts/StudentLayout.jsx
import Sidebar from '../components/shared/SideBar';
import Header from '../components/shared/Header';
import { Outlet } from 'react-router-dom';
import StudentMessage from '../components/shared/StudentMessage/StudentMessage';
import { useEffect, useState } from 'react';
import { getNotificationsByUser } from '../services/api/StudentAPI';
import echo from '../utils/echo';
const StudentLayout = () => {
  const [notificationsList, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotificationsByUser();
      const formatted = response.map((noti) => ({
        ...noti,
        isUnread: noti.pivot?.is_read === 0,
      }));

      setNotifications(formatted);
      const unreadCount = formatted.filter((noti) => noti.isUnread).length;
      setTotalUnread(unreadCount);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
        <Header totalUnread={totalUnread} notificationsList={notificationsList} />
        <div className="main-content">
          <Outlet context={{ notificationsList, setNotifications, setTotalUnread }} />
        </div>
      </main>
      <StudentMessage />
    </div>
  );
};

export default StudentLayout;