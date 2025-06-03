import React, { useState, useEffect } from 'react';
import './TagTeacher.css';
import { getTeachers, sendTagTeacher } from '../../../services/api/StudentAPI';
import { useAuth } from '../../../services/providers/AuthContext';

const TagTeacher = ({ onClose, goalId }) => {
  const { user } = useAuth();
  const user_id = user.user_id;
  const [teacher, setTeacher] = useState('');
  const [message, setMessage] = useState('');
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
        setTeacherList(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSendNotification = async () => {
    if (!teacher || !message.trim()) {
      alert('Please select a teacher and enter a message!');
      return;
    }

    try {
      const response = await sendTagTeacher(user_id, teacher, message, goalId);
      console.log('Send notification response:', response);
      if (response.success) {
        alert('Sent successfully!');
        setMessage('');
        setTeacher('');
        onClose();
      } else {
        alert('Failed to send!');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('An error occurred while sending the notification!');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="notification-card">
          <h2 className="title">Tag a Teacher</h2>

          <div className="form-group">
            <label>Select Teacher:</label>
            <select value={teacher} onChange={(e) => setTeacher(e.target.value)}>
              <option value="">-- Select a teacher --</option>
              {Array.isArray(teacherList) && teacherList.length > 0 ? (
                teacherList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))
              ) : (
                <option disabled>No teachers available</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your question or message..."
              rows="4"
            />
          </div>

          <div className="button-group">
            <button onClick={onClose}>Close</button>
            <button onClick={handleSendNotification}>Send Notification</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagTeacher;
