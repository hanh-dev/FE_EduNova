import React, { useState } from 'react';
import './ClassPlanForm.css';

function UpdateClassPlanForm({ onCancel, onSave }) {
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    difficulties: '',
    skill: '',
    plan: '',
    selfAssess: '',
    solved: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you can save the data
    console.log('Saving form data:', formData);
    onSave(); // Calls the parent’s onSave function (to close the form or handle save)
  };

  return (
    <div className="form-container">
      <h2>Update your process</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Difficulties</label>
          <input
            type="text"
            name="difficulties"
            placeholder="I struggle with abc"
            value={formData.difficulties}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Skill/Module</label>
          <select
            name="skill"
            value={formData.skill}
            onChange={handleChange}
          >
            <option>TOEIC</option>
            <option>Speaking</option>
            <option>Coding</option>
          </select>
        </div>
        <div className="form-group">
          <label>My plan</label>
          <input
            type="text"
            name="plan"
            placeholder="I will review"
            value={formData.plan}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Self-assess</label>
          <div className="radio-group">
            <label><input type="radio" name="selfAssess" value="1" onChange={handleChange} /> 1</label>
            <label><input type="radio" name="selfAssess" value="2" onChange={handleChange} /> 2</label>
            <label><input type="radio" name="selfAssess" value="3" onChange={handleChange} /> 3</label>
          </div>
        </div>

        <div className="form-group">
          <label>Solved?</label>
          <div className="radio-group">
            <label><input type="radio" name="solved" value="Yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="solved" value="Not yet" onChange={handleChange} /> Not yet</label>
          </div>
        </div>
      </div>

      <div className="form-buttons">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default UpdateClassPlanForm;
