import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import "./StudentList.css";
import { getStudentsByClassId } from "../../../services/api/StudentAPI";
import { clearUser } from "../../../services/auth/authService";
import { useAuth } from "../../../services/providers/AuthContext";

const defaultStudentImage = "https://via.placeholder.com/100";

const StudentList = () => {
  const { classId } = useParams();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const className = location.state?.className || "Unknown";
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentList = await getStudentsByClassId(classId);
        setStudents(studentList);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách học sinh:", error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, [classId]);

  const handleMovePage = (student) => {
    try {
      // Lấy thông tin giáo viên hiện tại
      const userData = localStorage.getItem("user");
      if (!userData) {
        console.error("Không tìm thấy dữ liệu người dùng trong localStorage");
        return;
      }

      const user = JSON.parse(userData);
      console.log('test teacher', user );
      // Lưu toàn bộ thông tin giáo viên
      localStorage.setItem(
        "teacherData",
        JSON.stringify({
          user_id: user.user_id,
          name: user.username || user.name,
          role: "teacher",
          token: user.token,
        })
      );

      // Xóa user hiện tại (giáo viên) và chuyển sang học sinh
      clearUser();
      const studentData = {
        user_id: student.id,
        name: student.name,
        role: "student",
      };
      setUser(studentData);
      localStorage.setItem("user", JSON.stringify(studentData));

      // Điều hướng đến trang portfolio của học sinh
      navigate("/semester-goals", {
        state: {
          isTeacherViewing: true,
          classId: classId,
          className: className,
          from: `/classes/${classId}/students`,
        },
      });
    } catch (error) {
      console.error("Lỗi khi chuyển sang chế độ xem học sinh:", error);
    }
  };

  return (
    <div className="student-list-container">
      <h3>List of students in class: {className}</h3>
      <div className="student-grid">
        {Array.isArray(students) && students.length > 0 ? (
          students.map((student) => (
            <div className="student-card" key={student.id}>
              <div className="student-box">
                <img
                  src={student.image || defaultStudentImage}
                  alt="avatar"
                  className="avatar"
                />
                <p className="student-name">{student.name}</p>
                <button
                  className="portfolio-button"
                  onClick={() => handleMovePage(student)}
                >
                  View Portfolio
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Student not found.</p>
        )}
      </div>
      <Link to="/dashboard" className="back-link">
        ⬅ Back
      </Link>
    </div>
  );
};

export default StudentList;