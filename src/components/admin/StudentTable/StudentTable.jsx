import React, { useState } from 'react';
import '../../teacher/TeacherTable/TeacherTable.css'
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Pagination } from 'antd';
import { deleteStudent, getStudents } from '../../../services/api/StudentAPI';
import { toast } from 'react-toastify';

function StudentTable({ students = [], setStudents, setUpdateForm, setUserToEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      try {
        const response = await deleteStudent(id);
        if (response.status) {
          const updated = await getStudents();
          setStudents(updated);
          toast.success("Student deleted successfully!");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);

  return (
    <div className="teacher-list">
      <div className="teacher-list-header">
        <h2>Students ({students.length})</h2>
        <p>Complete list of registered students and their details.</p>
      </div>

      <div className="teacher-table-head">
        <span>Student</span>
        <span>Contact</span>
        <span>Credentials</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {currentStudents.map((student) => (
        <div className="teacher-row" key={student.id}>
          <div className="teacher-info">
            <img
              src={student.image || "https://via.placeholder.com/40"}
              alt={student.name}
              className="teacher-avatar"
            />
            <div>
              <strong>{student.name}</strong>
              <div>{student.id}</div>
              <div className="online-status">Active</div>
            </div>
          </div>

          <div className="teacher-contact">
            <div>{student.email}</div>
            <div>{student.phone || 'N/A'}</div>
          </div>

          <div className="teacher-subject">
            <strong>{student.password || 'N/A'}</strong>
            <div>Password</div>
          </div>

          <div className="teacher-status">
            <span className="badge-active">{student.status || 'Active'}</span>
          </div>

          <div className="teacher-actions">
            <button className="icon-btn"><FiEye /></button>
            <button
              className="icon-btn"
              onClick={() => {
                setUserToEdit(student);
                setUpdateForm(true);
              }}
            >
              <FiEdit2 />
            </button>
            <button
              className="icon-btn"
              onClick={() => handleDelete(student.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={students.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default StudentTable;
