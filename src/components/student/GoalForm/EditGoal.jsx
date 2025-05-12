import React, { useState, useEffect } from "react";
import "./EditGoal.css";
import { editGoal } from "../../../services/api/StudentAPI";

export default function EditGoal({ goal, onClose, onSave }) {
  const [editedGoal, setEditedGoal] = useState({
    user_id: "",
    course: "",
    goal: "",
    courseExpectations: "",
    teacherExpectations: "",
    selfExpectations: "",
    dueDate: "",
  });

  useEffect(() => {
    if (goal) {
      setEditedGoal(goal);
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedGoal = await editGoal(editedGoal);
      onSave(updatedGoal);
      onClose();
    } catch (error) {
      console.error("Error updating goal:", error);
      alert("Failed to update goal.");
    }
  };

  return (
    <div className="goal-overlay">
      <div className="goal-form">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <h1>Edit a Goal</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="title">Course</label>
            <select
              className="form-control"
              name="course"
              value={editedGoal.course}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="IT-English">IT-English</option>
              <option value="Communicative">Communicative</option>
            </select>
          </div>

          {/* 🟠 CỘT GOAL được thêm tại đây */}
          <div className="mb-3">
            <label className="title">Goal</label>
            <input
              type="text"
              className="form-control"
              name="goal"
              value={editedGoal.goals}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="title">Course Expectations</label>
            <input
              type="text"
              className="form-control"
              name="courseExpectations"
              value={editedGoal.courseExpectations}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="title">Teacher Expectations</label>
            <input
              type="text"
              className="form-control"
              name="teacherExpectations"
              value={editedGoal.teacherExpectations}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="title">Self Expectations</label>
            <input
              type="text"
              className="form-control"
              name="selfExpectations"
              value={editedGoal.selfExpectations}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="title">Due date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={editedGoal.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 button-save"
            style={{ backgroundColor: "orange", borderColor: "orange" }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
