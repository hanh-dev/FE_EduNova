import React, { useEffect, useState } from 'react';
import './TeacherManagement.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getTeachers } from '../../../services/api/StudentAPI';
import { PulseLoader } from 'react-spinners';

function TeacherManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getTeachers();
        setStudents(students);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-management">
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className="add-student-btn">
            <button>
              <FaPlus /> Add Student
            </button>
          </div>
          <h2>Student Management</h2>
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>
                    <img src={student.image} alt={student.name} className="student-image" />
                  </td>
                  <td>{student.email}</td>
                  <td>{student.password}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit"><FaEdit /></button>
                      <button className="delete"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default TeacherManagement;