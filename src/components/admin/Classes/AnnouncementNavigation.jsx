import React from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import './AnnouncementNavigation.css';

function AnnouncementsTab() {
  const announcements = [
    {
      id: 1,
      title: 'Semester Registration Open',
      priority: 'high',
      author: 'Academic Office',
      date: '26/05/2025',
      target: 'all',
      content: 'Please register for the new semester by the deadline. Visit the academic portal for details.'
    },
    {
      id: 2,
      title: 'Library Hours Extended',
      priority: 'medium',
      author: 'Library Services',
      date: '27/05/2025',
      target: 'all',
      content: 'The library will now be open until 10 PM on weekdays starting next Monday.'
    },
    {
      id: 3,
      title: 'Workshop on Advanced React',
      priority: 'low',
      author: 'IT Department',
      date: '28/05/2025',
      target: 'Computer Science students',
      content: 'Join our free workshop on advanced React concepts. Limited seats available.'
    },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-tag high';
      case 'medium':
        return 'priority-tag medium';
      case 'low':
        return 'priority-tag low';
      default:
        return 'priority-tag';
    }
  };

  return (
    <div className="announcements-tab-container">
      {/* Header Section */}
      <div className="announcements-header">
        <div className="header-text">
          <h1>Announcements</h1>
          <p>Manage and publish announcements to students</p>
        </div>
        <button className="new-announcement-button">
          <FaPlus className="button-icon" /> New Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="announcements-list">
        {announcements.map((announcement) => (
          <div className="announcement-card" key={announcement.id}>
            <div className="card-top-class">
              <h3 className="announcement-title">{announcement.title}
                <span className={getPriorityClass(announcement.priority)}>
                {announcement.priority}
              </span></h3>
              <button className="more-options-button">
                <FaEllipsisV />
              </button>
            </div>
            <div className="card-details">
              <p>By {announcement.author} &bull; {announcement.date} &bull; Target: {announcement.target}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementsTab;