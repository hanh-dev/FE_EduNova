import React, { useState, useEffect } from "react";
import { createGoal, getSemester } from "../../../services/api/StudentAPI";
import "./GoalForm.css";

export default function GoalForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    user_id: "",
    course: "English",
    goals: "",
    courseExpectations: "",
    teacherExpectations: "",
    selfExpectations: "",
    dueDate: "",
    semester_id: "",
  });

  const [semesters, setSemesters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user_id) {
      setFormData((prev) => ({ ...prev, user_id: user.user_id }));
    } else {
      setErrorMessage("User not found. Please login again.");
    }

    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const data = await getSemester();
      setSemesters(data);
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, semester_id: data[0].id }));
      }
    } catch (error) {
      console.error("Failed to fetch semesters:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      user_id,
      course,
      goals,
      courseExpectations,
      teacherExpectations,
      selfExpectations,
      dueDate,
      semester_id,
    } = formData;

    if (
      !goals ||
      !courseExpectations ||
      !teacherExpectations ||
      !selfExpectations ||
      !dueDate ||
      !semester_id
    ) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (!user_id) {
      setErrorMessage("User ID is missing. Please login again.");
      return;
    }

    try {
      const response = await createGoal(formData);
      if (response) {
        onSave(response);
        onClose();
      }
    } catch (error) {
      console.error("Error saving goal:", error);
      setErrorMessage("Failed to save goal. Please try again.");
    }
  };

  return (
    <div className="goal-overlay">
      <div className="goal-form">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <h1>Set Goals</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Course",
              type: "select",
              name: "course",
              options: ["English", "IT-English", "Communicative"],
            },
            { label: "Goal", name: "goals" },
            { label: "Course Expectations", name: "courseExpectations" },
            { label: "Teacher Expectations", name: "teacherExpectations" },
            { label: "Self Expectations", name: "selfExpectations" },
            { label: "Due Date", type: "date", name: "dueDate" },
            {
              label: "Semester",
              type: "select",
              name: "semester_id",
              options: semesters.map((s) => ({
                label: s.name,
                value: s.id,
              })),
            },
          ].map((field, idx) => (
            <div key={idx} className="your-goal-input">
              <label className="title">{field.label}</label>
              {field.type === "select" ? (
                <select
                  className="form-control"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {field.options.map((opt, i) =>
                    typeof opt === "string" ? (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ) : (
                      <option key={i} value={opt.value}>
                        {opt.label}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  className="form-control"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <div className="button-container">
            <button className="btn-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
