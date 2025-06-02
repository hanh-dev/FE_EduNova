import React, { useState } from 'react';
import './TeacherTable.css';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Pagination } from 'antd';
import { deleteStudent } from '../../../services/api/StudentAPI';
import { getTeachers } from '../../../services/api/StudentAPI';
import { toast } from 'react-toastify';

function TeacherTable({ students = [], setStudents, setUpdateForm, setUserToEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (confirmed) {
      try {
        const response = await deleteStudent(id);
        if (response.status) {
          const updated = await getTeachers();
          setStudents(updated);
          toast.success("Teacher deleted successfully!");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentTeachers = students.slice(indexOfFirst, indexOfLast);

  return (
    <div className="teacher-list">
      <div className="teacher-list-header">
        <h2>Teachers ({students.length})</h2>
        <p>Comprehensive list of all registered teachers and their information.</p>
      </div>

      <div className="teacher-table-head">
        <span>Teacher</span>
        <span>Contact</span>
        <span>Subject</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {currentTeachers.map((teacher) => (
        <div className="teacher-row" key={teacher.id}>
          <div className="teacher-info">
            <img
              src={teacher.image || "https://via.placeholder.com/40"}
              alt={teacher.name}
              className="teacher-avatar"
            />
            <div>
              <strong>{teacher.name}</strong>
              <div>{teacher.code || `TCH${teacher.id}`}</div>
              <div className="online-status">Online</div>
            </div>
          </div>

          <div className="teacher-contact">
            <div>{teacher.email}</div>
            <div>{teacher.phone || 'N/A'}</div>
          </div>

          <div className="teacher-subject">
            <strong>{teacher.major || 'N/A'}</strong>
            <div>{teacher.level || 'N/A'}</div>
          </div>

          <div className="teacher-status">
            <span className="badge-active">{teacher.status}</span>
          </div>

          <div className="teacher-actions">
            <button className="icon-btn"><FiEye /></button>
            <button
              className="icon-btn"
              onClick={() => {
                setUserToEdit(teacher);
                setUpdateForm(true);
              }}
            >
              <FiEdit2 />
            </button>
            <button
              className="icon-btn"
              onClick={() => handleDelete(teacher.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}

      {/* Phân trang */}
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

export default TeacherTable;
