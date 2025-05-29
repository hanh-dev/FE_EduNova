import React from 'react';
import './AnalyticNavigation.css'
function AnalyticNavigation() {
  const recentActivities = [
    {
      id: 1,
      type: 'online',
      description: 'John Doe came online',
      time: '2 minutes ago',
      indicatorColor: '#28a745'
    },
    {
      id: 2,
      type: 'registered',
      description: 'New student registered',
      time: '1 hour ago',
      indicatorColor: '#007bff'
    },
    {
      id: 3,
      type: 'updated_profile',
      description: 'Jane Smith updated profile',
      time: '3 hours ago',
      indicatorColor: '#fd7e14'
    },
    {
      id: 4,
      type: 'online',
      description: 'Alice Johnson came online',
      time: '5 hours ago',
      indicatorColor: '#28a745'
    },
    {
      id: 5,
      type: 'submitted_assignment',
      description: 'Bob Brown submitted assignment "React Basics"',
      time: 'yesterday',
      indicatorColor: '#6c757d'
    }
  ];

  return (
    <div className="analytics-tab-container">
      {/* Tiêu đề trang Dashboard Analytics */}
      <div className="analytics-dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p>Student performance and system analytics</p>
      </div>

      <div className="analytics-content-layout">
        {/* Recent Activity Card */}
        <div className="analytics-card recent-activity-card">
          <h3 className="card-title">Recent Activity</h3>
          <ul className="activity-list">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <span
                  className="activity-indicator"
                  style={{ backgroundColor: activity.indicatorColor }}
                ></span>
                <div className="activity-details">
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnalyticNavigation;