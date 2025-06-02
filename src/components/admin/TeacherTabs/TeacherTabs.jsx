import React from 'react';
import '../Classes/ClassNavigation.css'
import { FaChalkboard, FaChalkboardTeacher, FaRegClock, FaBan } from 'react-icons/fa';

function TeacherTabs({ total, active, empty }) {
  return (
    <div className="students-tab-container">
      <div className="card">
        <div className="card-header">
          <h3>Total Students</h3>
          <FaChalkboard className="card-icon-class" />
        </div>
        <p className="number">{total}</p>
        <p className="description">Total number of students</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Active Students</h3>
          <FaChalkboardTeacher className="card-icon-class" />
        </div>
        <p className="number">{active}</p>
        <p className="description">Currently active</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Inactive Students</h3>
          <FaBan className="card-icon-class" />
        </div>
        <p className="number">{total - active}</p>
        <p className="description">Currently paused or ended</p>
      </div>
    </div>
  );
}

export default TeacherTabs;