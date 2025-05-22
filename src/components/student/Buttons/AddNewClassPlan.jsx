import React, { useState, useEffect } from "react";
import "./AddClassPlan.css";
import {
  createInClass,
  getAllGoal
} from "../../../services/api/StudentAPI";

const AddNewClassPlan = ({ onAddNewPlan }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    skill_module: "TOEIC",
    lesson_summary: "",
    self_assessment: null,
    difficulties: "",
    improvement_plan: "",
    date: "",
    problem_solved: false,
    goal_id: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState([]);

  // Gọi API lấy danh sách tất cả goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getAllGoal();
        setGoals(data);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      }
    };
    fetchGoals();
  }, []);

  // Khi mở form, lấy user từ localStorage
  useEffect(() => {
    if (showForm) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.user_id) {
        setFormData((prev) => ({ ...prev, user_id: Number(user.user_id) }));
      } else {
        setErrorMessage("User not found. Please login again.");
      }
    }
  }, [showForm]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRadioChange = (num) => {
    setFormData((prev) => ({
      ...prev,
      self_assessment: num,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.date || !formData.skill_module || !formData.goal_id) {
      setErrorMessage("Please fill in Date, Skill/Module and Goal.");
      return;
    }

    if (formData.self_assessment === null) {
      setErrorMessage("Please select a self-assessment rating.");
      return;
    }

    try {
      const response = await createInClass({
        ...formData,
        user_id: Number(formData.user_id),
        goal_id: Number(formData.goal_id), // Đảm bảo gửi goal_id là số
        self_assessment: Number(formData.self_assessment),
        problem_solved: formData.problem_solved ? 1 : 0,
      });

      if (response) {
        console.log("Class Plan saved successfully!", response);
        if (onAddNewPlan) onAddNewPlan(response);
        alert("Class Plan added successfully!");

        // Reset form
        setFormData({
          user_id: formData.user_id,
          skill_module: "TOEIC",
          lesson_summary: "",
          self_assessment: null,
          difficulties: "",
          improvement_plan: "",
          date: "",
          problem_solved: false,
          goal_id: "",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error saving goal:", error);
      setErrorMessage("Failed to save goal. Please try again.");
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => setShowForm(true)}
          className="add-button-inclass"
        >
          Add Class Plan
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              &times;
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="class-plan-form">
              <h2>Create an In-class Journey</h2>

              <div className="form-group">
                <label>
                  Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group select-with-icon">
                <label>
                  Skill/Module <span style={{ color: "red" }}>*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    name="skill_module"
                    value={formData.skill_module}
                    onChange={handleChange}
                    required
                  >
                    <option value="TOEIC">TOEIC</option>
                    <option value="Speaking">Speaking</option>
                    <option value="IT_English">IT English</option>
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <div className="form-group select-with-icon">
                <label>
                  Goal <span style={{ color: "red" }}>*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    name="goal_id"
                    value={formData.goals}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Goal --</option>
                    {goals.map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.goals}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <div className="form-group">
                <label>Lesson Summary</label>
                <textarea
                  name="lesson_summary"
                  value={formData.lesson_summary}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Difficulties</label>
                <textarea
                  name="difficulties"
                  value={formData.difficulties}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Improvement Plan</label>
                <textarea
                  name="improvement_plan"
                  value={formData.improvement_plan}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>
                  Self-assessment <span style={{ color: "red" }}>*</span>
                </label>
                <div className="radio-group">
                  {[1, 2, 3].map((num) => (
                    <label key={num} style={{ marginRight: 15 }}>
                      <input
                        type="radio"
                        name="self_assessment"
                        value={num}
                        checked={Number(formData.self_assessment) === num}
                        onChange={() => handleRadioChange(num)}
                      />{" "}
                      {num}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewClassPlan;
