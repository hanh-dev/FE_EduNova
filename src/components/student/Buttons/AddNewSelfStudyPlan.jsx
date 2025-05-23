import React, { useState, useEffect } from "react";
import { creatSelfStudy, getAllWeek } from "../../../services/api/StudentAPI";
import "./AddSelfStudy.css";

const AddNewSelfStudy = ({ onAddNewStudy }) => {
  const [formData, setFormData] = useState({
    week_id: '',
    date: '',
    skill_module: '',
    lesson_summary: '',
    time_allocation: '',
    learning_resources: '',
    learning_activities: '',
    concentration: '',
    follow_plan: '',
    evaluation: '',
    reinforcement: '',
    notes: '',
    status: 'inprogress',
    user_id: '',
  });

  const [weeks, setWeeks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const statusOptions = [
    { value: 'inprogress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
    { value: 'cancel', label: 'Cancel' },
  ];

  // Lấy user_id từ localStorage khi component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user_id) {
      setFormData(prev => ({ ...prev, user_id: Number(user.user_id) }));
    } else {
      setErrorMessage("User not found. Please login again.");
    }
  }, []);

  // Lấy danh sách tuần từ API
  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const data = await getAllWeek();
        setWeeks(data);
      } catch (error) {
        console.error("Failed to fetch weeks:", error);
      }
    };
    fetchWeeks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.week_id || !formData.date) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        week_id: Number(formData.week_id),
        date: formData.date,
        skill_module: formData.skill_module,
        lesson_summary: formData.lesson_summary,
        time_allocation: formData.time_allocation ? Number(formData.time_allocation) : 0,
        learning_resources: formData.learning_resources,
        learning_activities: formData.learning_activities,
        concentration: formData.concentration ? Number(formData.concentration) : 0,
        follow_plan: formData.follow_plan,
        evaluation: formData.evaluation,
        reinforcement: formData.reinforcement,
        notes: formData.notes,
        status: formData.status,
        user_id: Number(formData.user_id),
      };

      const created = await creatSelfStudy(payload);
      if (onAddNewStudy) onAddNewStudy(created);
      setShowForm(false); // đóng form khi tạo thành công
    } catch (error) {
      setErrorMessage('Failed to create self-study plan. Please try again.');
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <button onClick={() => setShowForm(true)} className="selfstudy-add-button">
        Add Self Study
      </button>

      {showForm && (
        <div className="selfstudy-overlay" onClick={() => setShowForm(false)}>
          <form
            onSubmit={handleSubmit}
            className="self-study-plan-form"
            onClick={e => e.stopPropagation()}
          >
            {errorMessage && <p className="error">{errorMessage}</p>}
            <h2>Create SelfStudy Plan</h2>

            <div className="form-group-self">
              <label>
                Week:
                <select
                  name="week_id"
                  value={formData.week_numnber}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Week --</option>
                  {weeks.map((week) => (
                    <option key={week.id} value={week.id}>
                      {week.week_numnber || `Week ${week.id}`}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Skill Module:
                <input
                  type="text"
                  name="skill_module"
                  value={formData.skill_module}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Lesson Summary:
                <textarea
                  name="lesson_summary"
                  value={formData.lesson_summary}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Time Allocation:
                <input
                  type="text"
                  name="time_allocation"
                  value={formData.time_allocation}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Learning Resources:
                <textarea
                  name="learning_resources"
                  value={formData.learning_resources}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Learning Activities:
                <textarea
                  name="learning_activities"
                  value={formData.learning_activities}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Concentration:
                <input
                  type="text"
                  name="concentration"
                  value={formData.concentration}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Follow Plan:
                <input
                  type="text"
                  name="follow_plan"
                  value={formData.follow_plan}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Evaluation:
                <textarea
                  name="evaluation"
                  value={formData.evaluation}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Reinforcement:
                <textarea
                  name="reinforcement"
                  value={formData.reinforcement}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Notes:
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group-self">
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="save" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Save"}
              </button>
              <button type="button" className="cancel" onClick={() => setShowForm(false)} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewSelfStudy;
