import React, { useState } from "react";
import "./AddClassPlan.css";

const AddNewClassPlan = ({ onAddNewPlan }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    skillModule: "",
    lessonLearned: "",
    selfAssessment: "1",
    difficulties: "",
    plan: "",
    problemSolved: "Not yet",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddNewPlan) {
      onAddNewPlan(formData);
    }
    alert("Class Plan added successfully!");
    setFormData({
      date: "",
      skillModule: "",
      lessonLearned: "",
      selfAssessment: "1",
      difficulties: "",
      plan: "",
      problemSolved: "Not yet",
    });
    setShowForm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="add-button"
      >
        Add Class Plan
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              &times;
            </button>
            <form onSubmit={handleSubmit} className="class-plan-form">
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Skill/Module:</label>
                <input
                  type="text"
                  name="skillModule"
                  value={formData.skillModule}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>My lesson - What did I learn today?</label>
                <textarea
                  name="lessonLearned"
                  value={formData.lessonLearned}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Self-assessment:</label>
                <select
                  name="selfAssessment"
                  value={formData.selfAssessment}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1 </option>
                  <option value="2">2 </option>
                  <option value="3">3 </option>
                </select>
              </div>

              <div className="form-group">
                <label>My difficulties:</label>
                <textarea
                  name="difficulties"
                  value={formData.difficulties}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>My plan:</label>
                <textarea
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Problem Solved:</label>
                <select
                  name="problemSolved"
                  value={formData.problemSolved}
                  onChange={handleChange}
                  required
                >
                  <option value="Yes">Yes</option>
                  <option value="Not yet">Not yet</option>
                </select>
              </div>

              <button type="submit" className="save-button">
                Save Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewClassPlan;
