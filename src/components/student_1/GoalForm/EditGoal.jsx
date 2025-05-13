import React, { useState, useEffect } from "react";
import "./EditGoal.css";

export default function EditGoal({ goal, onClose, onSave }) {
  const [editedGoal, setEditedGoal] = useState({
    course: "",
    courseExpectations: "",
    teacherExpectations: "",
    selfExpectations: "",
    dueDate: ""
  });

  // Load dữ liệu từ goal vào state khi mở form
  useEffect(() => {
    if (goal) {
      setEditedGoal(goal);
    }
  }, [goal]);

  // Cập nhật state khi người dùng thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý khi nhấn nút Save
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedGoal); // Gửi goal đã sửa lên SemesterGoal
    onClose(); // Đóng form
  };

  return (
    <div className="goal-overlay">
      <div className="goal-form">
        <span className="close-btn" onClick={onClose}>×</span>
        <h3>Edit a Goal</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="title">Course</label>
            <span className="close-down">
              <i className="fa-solid fa-caret-down"></i>
            </span>
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
            className="btn w-100"
            style={{ backgroundColor: "orange", borderColor: "orange" }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
