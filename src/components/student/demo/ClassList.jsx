import React, { useEffect, useState } from 'react';
import './ClassList.css';
import './StudentList.css';
import { getClasses, getStudentList } from '../../../services/api/StudentAPI';

const defaultClassImage = 'https://via.placeholder.com/150';
const defaultStudentImage = 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);

  // Lấy danh sách lớp khi component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // Xử lý khi người dùng bấm xem danh sách học sinh trong lớp
  const handleViewStudents = async (className) => {
    try {
      const studentList = await getStudentList(className);
      setSelectedClass(className);
      setStudents(studentList);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  return (
    <div className="class-container1">
      <h2>All Classes</h2>
      <div className="class-grid1">
        {classes.map((classItem) => (
          <div key={classItem.name} className="class-card1">
            <div className="class-text1">
              <h3>{classItem.name}</h3>
              <p>Total students: {classItem.students_count || 0}</p>
            </div>
            <div className="class-content1">
              <img
                src={classItem.image || defaultClassImage}
                alt={`Image of ${classItem.name}`}
                className="class-list-img1"
              />
            </div>
            <button
              className="view-button1"
              onClick={() => handleViewStudents(classItem.name)}
            >
              View Students
            </button>
          </div>
        ))}
      </div>

      {selectedClass && (
        <div className="student-list-container">
          <h3>Students in class: {selectedClass}</h3>
          <div className="student-grid">
            {students.length > 0 ? (
              students.map((student, index) => (
                <div className="student-card" key={index}>
                  <div className="student-box">
                    <img
                      src={student.image || defaultStudentImage}
                      alt="avatar"
                      className="avatar"
                    />
                    <p className="student-name">{student.name}</p>
                    <button className="portfolio-button">View Portfolio</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No students found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
