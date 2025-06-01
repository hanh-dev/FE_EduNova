// src/layouts/StudentLayout.jsx
import Sidebar from '../components/shared/SideBar';
import Header from '../components/shared/Header';
import { Outlet } from 'react-router-dom';
import StudentMessage from '../components/shared/StudentMessage/StudentMessage';
import { useEffect, useState } from 'react';
import { getNotificationsByUser } from '../services/api/StudentAPI';
const StudentLayout = () => {
  const [notificationsList, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotificationsByUser();
      setTotalUnread(unreadCount);
      const formatted = response.map((noti) => ({
        ...noti,
        isUnread: noti.pivot?.is_read === 0,
      }));

      setNotifications(formatted);
    };

    fetchNotifications();
  }, []);
  const unreadCount = notificationsList.filter((noti) => noti.isUnread).length;
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
      <Header totalUnread={unreadCount} notificationsList={notificationsList}/>
        <div className="main-content">
          <Outlet context={{notificationsList, setNotifications, setTotalUnread}}/>
        </div>
      </main>
      <StudentMessage />
    </div>
  );
};

export default StudentLayout;