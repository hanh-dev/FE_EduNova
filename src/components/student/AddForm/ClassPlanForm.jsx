import React, { useState, useEffect } from 'react';
import './ClassPlanForm.css';
import { getInClassByID, editInClass, getAllInClass } from '../../../services/api/StudentAPI';

function UpdateClassPlanForm({ inclass, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    date: '',
    difficulties: '',
    skill: 'TOEIC',
    plan: '',
    selfAssess: '',
    solved: '',
    user_id:'',
  });

  const [allInClassData, setAllInClassData] = useState([]);

  // Lấy dữ liệu của inclass cần update
  useEffect(() => {
    const fetchData = async () => {
      if (!inclass || !inclass.id) return;
      try {
        const data = await getInClassByID(inclass.id);
        console.log("Fetched inClass data:", data);
        setFormData({
          date: data.date || '',
          difficulties: data.difficulties || '',
          skill: data.skill || 'TOEIC',
          plan: data.plan || '',
          selfAssess: data.selfAssess || '',
          solved: data.solved || '',
        });
      } catch (error) {
        console.error("Failed to fetch inclass data:", error);
      }
    };

    fetchData();
  }, [inclass]);

  // Lấy toàn bộ dữ liệu để gợi ý cho input
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await getAllInClass();
        console.log("All inClass data:", data);
        setAllInClassData(data);
      } catch (error) {
        console.error("Failed to fetch all inclass data:", error);
      }
    };

    fetchAllData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await editInClass(inclass.id, formData);
      alert("Update successful!");
      onSave();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed, please try again.");
    }
  };

  // Lấy danh sách unique difficulties & plan từ data cũ
  const uniqueDifficulties = [...new Set(allInClassData.map(item => item.difficulties).filter(Boolean))];
  const uniquePlans = [...new Set(allInClassData.map(item => item.plan).filter(Boolean))];

  return (
    <div className="form-container5">
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
            list="difficulties-suggestions"
            type="text"
            name="difficulties"
            placeholder="I struggle with abc"
            value={formData.difficulties}
            onChange={handleChange}
          />
          <datalist id="difficulties-suggestions">
            {uniqueDifficulties.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
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
            list="plan-suggestions"
            type="text"
            name="plan"
            placeholder="I will review"
            value={formData.plan}
            onChange={handleChange}
          />
          <datalist id="plan-suggestions">
            {uniquePlans.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Self-assess</label>
          <div className="radio-group">
            {[1, 2, 3].map((num) => (
              <label key={num}>
                <input
                  type="radio"
                  name="selfAssess"
                  value={num.toString()}
                  checked={formData.selfAssess === num.toString()}
                  onChange={handleChange}
                />
                {num}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Solved?</label>
          <div className="radio-group">
            {['Yes', 'Not yet'].map((status) => (
              <label key={status}>
                <input
                  type="radio"
                  name="solved"
                  value={status}
                  checked={formData.solved === status}
                  onChange={handleChange}
                />
                {status}
              </label>
            ))}
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
