import React, { useState, useEffect } from 'react';
import './TagTeacher.css';
import { getTeachers, sendTagTeacher } from '../../../services/api/StudentAPI';
import { useAuth } from '../../../services/providers/AuthContext';

const TagTeacher = ({ onClose, goalId }) => {
  const {user} = useAuth();
  const user_id = user.user_id;
  const [teacher, setTeacher] = useState('');
  const [message, setMessage] = useState('');
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
        setTeacherList(response);
      } catch (error) {
        console.error('Lỗi khi lấy giáo viên:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSendNotification = async () => {
    if (!teacher || !message.trim()) {
      alert('Vui lòng chọn giáo viên và nhập thông điệp!');
      return;
    }

    try {
      const response = await sendTagTeacher(user_id, teacher, message, goalId);
      console.log('Send notification response:', response);
      if (response.success) {
        alert('Gửi thành công!');
        setMessage('');
        setTeacher('');
        onClose();
      } else {
        alert('Gửi thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
      alert('Có lỗi xảy ra khi gửi thông báo!');
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
          <h2 className="title">Tag Teacher</h2>

          <div className="form-group">
            <label>Chọn Giáo Viên:</label>
            <select value={teacher} onChange={(e) => setTeacher(e.target.value)}>
              <option value="">-- Chọn giáo viên --</option>
              {Array.isArray(teacherList) && teacherList.length > 0 ? (
                teacherList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))
              ) : (
                <option disabled>Không có giáo viên nào</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Thông Điệp:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập câu hỏi hoặc thông báo..."
              rows="4"
            />
          </div>

          <div className="button-group">
            <button onClick={handleSendNotification}>Gửi Thông Báo</button>
            <button onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagTeacher;