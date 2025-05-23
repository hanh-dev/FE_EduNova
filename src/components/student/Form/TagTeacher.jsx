import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TagTeacher.css'; // Đảm bảo import đúng đường dẫn

const TagTeacher = () => {
  const [teacher, setTeacher] = useState('');
  const [message, setMessage] = useState('');
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/api/teachers');
        const data = response.data;

        if (Array.isArray(data)) {
          setTeacherList(data);
        } else {
          console.error("Dữ liệu không hợp lệ:", data);
          setTeacherList([]);
        }
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
      const response = await axios.post('/api/send-tagteacher.php', {
        teacher,
        message,
      });

      if (response.data.success) {
        alert('Gửi thành công!');
        setMessage('');
        setTeacher('');
      } else {
        alert('Gửi thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
      alert('Có lỗi xảy ra khi gửi thông báo!');
    }
  };

  return (
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

      <button onClick={handleSendNotification}>Gửi Thông Báo</button>
    </div>
  );
};

export default TagTeacher;
