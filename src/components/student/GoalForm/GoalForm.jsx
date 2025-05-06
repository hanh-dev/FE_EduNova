import React from "react";
import "./GoalForm.css"

export default function GoalForm({ onClose }) {
  return (
    <div className="goal-overlay">
      <div className="goal-form">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <h3>Set a Goal</h3>

        <div className="mb-3">
          <label className="title">Course</label>
          <span className="close-down" onClick={onClose}>
            <i className="fa-solid fa-chevron-down"></i>
          </span>

          <select className="form-control">
            <option value="English">English</option>
            <option value="IT-English">IT-English</option>
            <option value="Communicative">Communicative</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="title">Goal</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="title">Course Expectations</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="title">Teacher Expectations</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="title">Self Expectations</label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="title">Due date</label>
          <input type="date" className="form-control due-date" />
        </div>

        <button
          className="btn w-100"
          style={{ backgroundColor: "orange", borderColor: "orange" }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
