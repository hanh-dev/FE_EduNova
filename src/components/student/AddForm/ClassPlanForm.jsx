import React, { useState, useEffect } from "react";
import { getInClassByID, editInClass, getAllGoal, getAllWeek } from "../../../services/api/StudentAPI";
import "./ClassPlanForm.css";

export default function ClassPlanForm({ inclass, onCancel = () => {}, onSave = () => {} }) {
  const [formData, setFormData] = useState({
    date: "",
    skill_module: "TOEIC",
    lesson_summary: "",
    self_assessment: null,
    difficulties: "",
    improvement_plan: "",
    user_id: "",
    goal_id: "",
    week_id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [goals, setGoals] = useState([]);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsData, weeksData] = await Promise.all([getAllGoal(), getAllWeek()]);
        setGoals(goalsData);
        setWeeks(weeksData);
      } catch (err) {
        console.error("Failed to load goals or weeks", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user_id) {
      setFormData(prev => ({ ...prev, user_id: Number(user.user_id) }));
    } else {
      setErrorMessage("User not found. Please login again.");
    }
  }, []);

  useEffect(() => {
    if (!inclass?.id) return;
    (async () => {
      try {
        const data = await getInClassByID(inclass.id);
        setFormData({
          date: data.date || "",
          skill_module: data.skill_module || "TOEIC",
          lesson_summary: data.lesson_summary || "",
          self_assessment: data.self_assessment ?? null,
          difficulties: data.difficulties || "",
          improvement_plan: data.improvement_plan || "",
          goal_id: data.goal_id ? String(data.goal_id) : "",
          user_id: data.user_id ? String(data.user_id) : "",
          week_id: data.week_id ? String(data.week_id) : "",
        });
      } catch (err) {
        console.error("Failed to load inclass record", err);
        setErrorMessage("Failed to load data.");
      }
    })();
  }, [inclass]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage("");
    const { date, skill_module, goal_id, week_id } = formData;
    if (!date || !skill_module || !goal_id || !week_id) {
      setErrorMessage("Please fill in Date, Skill/Module, Week and Goal.");
      return;
    }
    if (!inclass?.id) {
      setErrorMessage("No record selected.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        date: formData.date,
        skill_module: formData.skill_module,
        lesson_summary: formData.lesson_summary,
        self_assessment: formData.self_assessment,
        difficulties: formData.difficulties,
        improvement_plan: formData.improvement_plan,
        user_id: Number(formData.user_id),
        goal_id: Number(formData.goal_id),
        week_id: Number(formData.week_id),
      };
      const updated = await editInClass(inclass.id, payload);
      onSave(updated);
      onCancel();
    } catch (err) {
      console.error("Update failed", err);
      setErrorMessage("Update failed. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="form-container5">
      <h2>Update Your Process</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>Date <span style={{ color: 'red' }}>*</span></label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Skill/Module <span style={{ color: 'red' }}>*</span></label>
            <select name="skill_module" value={formData.skill_module} onChange={handleChange} required>
              <option value="TOEIC">TOEIC</option>
              <option value="Speaking">Speaking</option>
              <option value="IT_English">IT_English</option>
            </select>
          </div>
          <div className="form-group">
            <label>Week <span style={{ color: 'red' }}>*</span></label>
            <select name="week_id" value={formData.week_id} onChange={handleChange} required>
              <option value="">-- Select Week --</option>
              {weeks.map(w => <option key={w.id} value={w.id}>Week {w.week_number}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Goal <span style={{ color: 'red' }}>*</span></label>
            <select name="goal_id" value={formData.goal_id} onChange={handleChange} required>
              <option value="">-- Select Goal --</option>
              {goals.map(g => <option key={g.id} value={g.id}>{g.goals}</option>)}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Lesson Summary</label>
            <textarea name="lesson_summary" value={formData.lesson_summary} onChange={handleChange} rows={3} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Difficulties</label>
            <textarea name="difficulties" value={formData.difficulties} onChange={handleChange} rows={3} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Improvement Plan</label>
            <textarea name="improvement_plan" value={formData.improvement_plan} onChange={handleChange} rows={3} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Self-assessment <span style={{ color: 'red' }}>*</span></label>
            <div className="radio-group">
              {[1, 2, 3].map(num => (
                <label key={num} style={{ marginRight: '10px' }}>
                  <input type="radio" name="self_assessment" value={num} checked={formData.self_assessment === num} onChange={handleChange} />{num}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn save-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={onCancel} className="btn cancel-btn" disabled={isSubmitting}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
