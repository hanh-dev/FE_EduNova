// src/pages/teacher/StudentList/StudentList.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './StudentList.css';
import Header from '../../../components/teacher/Header/Header';


const StudentList = () => {
  const { className } = useParams();

  // Giả lập danh sách học sinh theo lớp
  const studentData = {
    PNV26A: ['Hồ Ly Kim Sa', 'Nguyễn Văn A', 'Trần Thị B', 'Trần Thị B', 'Trần Thị B', 'Trần Thị B'],
    PNV26B: ['Dũng', 'Hà', 'Giang'],
    PNV27A: ['Hùng', 'Loan', 'Linh'],
    PNV27B: ['Minh', 'Phúc', 'Thảo'],
    PNV25B: ['Tuấn', 'Vy', 'Yến'],
    PNV25A: ['Quân', 'Trinh', 'Sơn'],
  };

  const students = studentData[className];

  return (
    <>
    <Header></Header>
    <div className="student-list-container">
      <h2 className="class-title">{className}</h2>
      <div className="student-grid">
        {students && students.length > 0 ? (
          students.map((student, index) => (
            <div className="student-card" key={index}>
              <div className="student-box">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                  alt="avatar"
                  className="avatar"
                />
                <p className="student-name">{student}</p>
                <button className="portfolio-button">View Portfolio</button>
              </div>
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
      <Link to="/" className="back-link">
        ⬅ Back 
      </Link>
    </div>
    </>
  );
};

export default StudentList;
