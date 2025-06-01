import React, { useEffect, useState } from 'react';
import { Bell, Dot, Info, Calendar } from 'lucide-react';
import './Notification.css';
import NotificationList from '../../../components/student/NotificationList/NotificationList';
import echo from '../../../utils/echo';
import { useOutletContext } from 'react-router-dom';

const Notification = () => {
  const {notificationsList, setNotifications, setTotalUnread} = useOutletContext();
  const unreadCount = notificationsList.filter((noti) => noti.isUnread).length;
  const highPriorityCount = notificationsList.filter((noti) => noti.priority === 'high').length;
  const todayCount = notificationsList.filter((noti) => {
  const notiDate = new Date(noti.created_at);
  const today = new Date();
  return (
    notiDate.getDate() === today.getDate() &&
    notiDate.getMonth() === today.getMonth() &&
    notiDate.getFullYear() === today.getFullYear()
  );
  }).length;
  useEffect(() => {
      const channel = echo.private(`user.${63}`);
      channel
          .subscribed(() => console.log("✅ Subscribed"))
          .error((error) => console.log("❌ Error:", error))
          .listen(".announcement.created", (e) => {
          console.log("📢 Event received:", e);

        const currentUserId = 63;
        if (!e.targetUserIds.includes(currentUserId)) return;

        const newNotification = {
          ...e.announcement,
          isUnread: true,
        };

        setNotifications((prev) => [newNotification, ...prev]);
        setTotalUnread((prev) => prev + 1);
  });

    return () => {
        channel.stopListening('.announcement.created');
        echo.leave(`user.${63}`);
    };
}, []);

  const cards = [
    {
      title: 'Total',
      count: notificationsList.length,
      desc: 'All notifications',
      icon: <Bell size={18} />,
    },
    {
      title: 'Unread',
      count: unreadCount,
      desc: 'Needs attention',
      icon: <span className="dot-icon" />,
    },
    {
      title: 'High Priority',
      count: highPriorityCount,
      desc: 'Urgent items',
      icon: <Info size={18} color='orange' />,
    },
    {
      title: 'Today',
      count: todayCount,
      desc: 'Received today',
      icon: <Calendar size={18} />,
    },
  ];

  return (
    <div className="noti-container">
      <div className="noti-header">
        <h2>Notifications</h2>
      </div>

      <div className="noti-cards">
        {cards.map((card, idx) => (
          <div className="noti-card" key={idx}>
            <div className="noti-card-header">
              <span>{card.title}</span>
              {card.icon}
            </div>
            <div className="noti-card-body">
              <h3>{card.count}</h3>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <NotificationList notificationsList={notificationsList} setNotifications={setNotifications} unreadCount={unreadCount} highPriorityCount={highPriorityCount} todayCount={todayCount} setTotalUnread={setTotalUnread}/>
    </div>
  );
};

export default Notification;
