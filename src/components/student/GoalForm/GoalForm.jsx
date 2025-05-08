import React, { useState, useEffect } from "react";
import "./GoalForm.css";

export default function GoalForm({ onClose, onSave }) {
  const [course, setCourse] = useState("English");
  const [goals, setGoals] = useState("");  
  const [courseExpectations, setCourseExpectations] = useState("");
  const [teacherExpectations, setTeacherExpectations] = useState("");
  const [selfExpectations, setSelfExpectations] = useState("");  
  const [dueDate, setDueDate] = useState("");

  // Đọc dữ liệu từ localStorage khi component được load lại
  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) {
      try {
        const parsedGoal = JSON.parse(savedGoal);
        setCourse(parsedGoal.course);
        setGoals(parsedGoal.goals);
        setCourseExpectations(parsedGoal.courseExpectations);
        setTeacherExpectations(parsedGoal.teacherExpectations);
        setSelfExpectations(parsedGoal.selfExpectations);
        setDueDate(parsedGoal.dueDate);
      } catch (error) {
        console.error("Error parsing saved goal:", error);
      }
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    const goalData = { course, goals, courseExpectations, teacherExpectations, selfExpectations, dueDate };
    localStorage.setItem("goal", JSON.stringify(goalData)); 
  }, [course, goals, courseExpectations, teacherExpectations, selfExpectations, dueDate]);  
  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = { course, goals, courseExpectations, teacherExpectations, selfExpectations, dueDate };
    onSave(newGoal);  
    onClose();  
  };

  return (
    <div className="goal-overlay">
      <div className="goal-form">
        <span className="close-btn" onClick={onClose}>×</span>
        <h3>Set a Goal</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="title">Course</label>
            <span className="close-down"><i class="fa-solid fa-caret-down"></i></span>
            <select
              className="form-control"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="English">English</option>
              <option value="IT-English">IT-English</option>
              <option value="Communicative">Communicative</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="title">Goal</label>
            <input
              type="text"
              className="form-control"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="title">Course Expectations</label>
            <input
              type="text"
              className="form-control"
              value={courseExpectations}
              onChange={(e) => setCourseExpectations(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="title">Teacher Expectations</label>
            <input
              type="text"
              className="form-control"
              value={teacherExpectations}
              onChange={(e) => setTeacherExpectations(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="title">Self Expectations</label>
            <input
              type="text"
              className="form-control"
              value={selfExpectations}
              onChange={(e) => setSelfExpectations(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="title">Due date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <button
            className="btn w-100"
            style={{
              backgroundColor: "orange",
              borderColor: "orange",
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
