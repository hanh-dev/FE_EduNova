import React from "react";
import { useState } from "react";
import {
  Info,
  AlertTriangle,
  Check,
  CalendarDays,
  User,
  Dot,
  Bell
} from "lucide-react";
import "./NotificationList.css";
import { markAsRead } from "../../../services/api/StudentAPI";
const NotificationList = ({notificationsList, setNotifications, unreadCount, highPriorityCount, todayCount, setTotalUnread}) => {
  const [key, setKey] = useState('all');
  const handleChangeReadStatus = async(id) => {
    console.log("Change status: ", id);
    setNotifications((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isUnread: false } : item
      )
    );
    setTotalUnread(prev => prev - 1);
    await markAsRead(id);
  };

  const filteredNotifications = notificationsList.filter((noti) => {
    if (key === 'unRead') return noti.isUnread;
    if (key === 'priority') return noti.priority === 'high';
    if (key === 'today') {
      const today = new Date();
      const notiDate = new Date(noti.created_at);
      return (
        notiDate.getDate() === today.getDate() &&
        notiDate.getMonth() === today.getMonth() &&
        notiDate.getFullYear() === today.getFullYear()
      );
    }
    return true;
  });

  const handleChnage = (value) => {
    setKey(value);
  }
  return (
    <div className="notif-section">
      {/* Tabs */}
      <div className="tabs-noti">
        <button
          className={key === 'all' ? 'active' : ''}
          onClick={() => handleChnage('all')}
        >
          All ({notificationsList.length})
        </button>
        <button
          className={key === 'unRead' ? 'active' : ''}
          onClick={() => handleChnage('unRead')}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={key === 'priority' ? 'active' : ''}
          onClick={() => handleChnage('priority')}
        >
          High Priority ({highPriorityCount})
        </button>
        <button
          className={key === 'today' ? 'active' : ''}
          onClick={() => handleChnage('today')}
        >
          Today ({todayCount})
        </button>
      </div>

      {/* Heading */}
      <div className="heading">
        <h2>Your Notifications</h2>
        <p>Stay updated with important messages from your teachers or admin</p>
      </div>

      {/* Notification Cards */}
      <div className="notif-list">
        {filteredNotifications.map((noti) => (
          <div
            className={`notif-card ${
              noti.isUnread
                ? noti.type === "info"
                  ? "bg-blue"
                  : "bg-yellow"
                : "bg-white"
            }`}
            key={noti.id}
          >
            {/* Left icon */}
            <div className="notif-icon">
              {noti.type === "info" ? (
                <Info size={20} />
              ) : (
                <AlertTriangle size={20} />
              )}
            </div>

            {/* Content */}
            <div className="notif-content">
              <div className="notif-title">{noti.title}</div>
              <div className="notif-message">{noti.content}</div>
              <div className="notif-meta">
                <span><User size={14} /> From {noti.target_name}</span>
                <span><CalendarDays size={14} /> {new Date(noti.created_at).toLocaleDateString()}</span>
                <span><Bell size={14} /> {noti.type}</span>
              </div>
            </div>

            {/* Right tags */}
            <div className="notif-tags">
              {noti.priority && (
                <span className={`priority ${noti.priority}`}>{noti.priority}</span>
              )}
              {noti.isUnread && <span className="dot" />}
              {noti.isUnread && <span onClick={() => handleChangeReadStatus(noti.id)}><Check size={16} className="check-icon"/></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
