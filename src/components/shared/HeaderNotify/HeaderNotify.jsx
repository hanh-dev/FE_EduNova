import React from 'react';
import './HeaderNotify.css';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HeaderNotify({notificationsList}) {
  const navigate = useNavigate();
  const handleChangeAllStatus = () => {

  }

  const handleMovePage = () => {
    navigate('/notification');
  }
  const getIcon = (type) => {
    switch (type) {
      case 'info':
        return <Info className="icon blue" />;
      case 'warning':
        return <AlertTriangle className="icon yellow" />;
      case 'success':
        return <CheckCircle className="icon green" />;
      default:
        return <Info className="icon blue" />;
    }
  };

  return (
    <div className="notify-dropdown">
      <div className="notify-header">
        <span>Notifications</span>
        <button className="mark-read" onClick={() => handleChangeAllStatus()}>✓ Mark all read</button>
      </div>
      <div className="notify-list">
        {notificationsList.map((n) => (
          <div key={n.id} className={`notify-item ${n.isUnread ? '' : 'read'}`} onClick={() => handleMovePage()}>
            <div className="notify-icon">{getIcon(n.type)}</div>
            <div className='notify-content'>
              <div className="notify-title">
                {n.title}
                {n.priority && (
                <span className={`priority-badge ${n.priority}`}>{n.priority}</span>
                )}
              </div>
              <div className="notify-message">{n.content}</div>
              <div className="notify-time">{new Date(n.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderNotify;
