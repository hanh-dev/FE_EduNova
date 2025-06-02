import React from 'react';
import './ClassNavigation.css';
import { FaChalkboard, FaChalkboardTeacher, FaRegClock, FaBan } from 'react-icons/fa';

function StudentsTab({ classeTotal, activeClasses, classEmpty }) {
  return (
    <div className="students-tab-container">
      <div className="card">
        <div className="card-header">
          <h3>Total Classes</h3>
          <FaChalkboard className="card-icon-class" />
        </div>
        <p className="number">{classeTotal}</p>
        <p className="description">Total number of classes</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Active Classes</h3>
          <FaChalkboardTeacher className="card-icon-class" />
        </div>
        <p className="number">{activeClasses}</p>
        <p className="description">Currently active</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Inactive Classes</h3>
          <FaBan className="card-icon-class" />
        </div>
        <p className="number">{classeTotal - activeClasses}</p>
        <p className="description">Currently paused or ended</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Unassigned Classes</h3>
          <FaRegClock className="card-icon-class" />
        </div>
        <p className="number">{classEmpty}</p>
        <p className="description">Waiting for students</p>
      </div>
    </div>
  );
}

export default StudentsTab;
