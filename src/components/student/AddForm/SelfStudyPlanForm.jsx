import React, { useState, useEffect } from "react";
import './SelfStudyPlanForm.css';
import DeleteSelfStudyButton from "./DeleteSelfStudyButton";
import { getSelfStudyByID, editSelfStudy } from "../../../services/api/StudentAPI";

export default function UpdateSelfStudyPlanForm({ selfStudyId, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    week_id:       "",
    date:          "",
    skill:         "",
    lesson:        "",
    timeAllocation:"",
    resource:      "",
    activities:    "",
    concentration: "",
    plan:          "",
    reinforce:     "",
    evaluation2:   "",
    notes:         "",
    status:        "inprogress",
    user_id:       "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // 1) On mount or when selfStudyId changes, load record
  useEffect(() => {
    // preload user_id
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user_id) {
      setFormData(f => ({ ...f, user_id: String(user.user_id) }));
    }

    if (!selfStudyId) return;

    setLoading(true);
    getSelfStudyByID(selfStudyId)
      .then(record => {
        setFormData({
          week_id:        String(record.week_id       ?? ""),
          date:           record.date                 ?? "",
          skill:          record.skill_module         ?? "",
          lesson:         record.lesson_summary       ?? "",
          timeAllocation: String(record.time_allocation ?? ""),
          resource:       record.learning_resources   ?? "",
          activities:     record.learning_activities  ?? "",
          concentration:  String(record.concentration   ?? ""),
          plan:           record.follow_plan          ?? "",
          reinforce:      record.reinforcement        ?? "",
          evaluation2:    record.evaluation           ?? "",
          notes:          record.notes                ?? "",
          status:         record.status               ?? "inprogress",
          user_id:        String(record.user_id       ?? user?.user_id ?? ""),
        });
      })
      .catch(() => {
        setError("Failed to load data");
      })
      .finally(() => setLoading(false));
  }, [selfStudyId]);

  // 2) Handle field changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  // 3) Submit update
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await editSelfStudy(selfStudyId, {
        week_id:       formData.week_id,
        date:          formData.date,
        skill_module: formData.skill,
        lesson_summary: formData.lesson,
        time_allocation: formData.timeAllocation,
        learning_resources: formData.resource,
        learning_activities: formData.activities,
        concentration: parseInt(formData.concentration, 10),
        follow_plan:   formData.plan,
        evaluation:    formData.evaluation2,
        reinforcement: formData.reinforce,
        notes:         formData.notes,
        status:        formData.status,
        user_id:       formData.user_id,
      });
      if (onSave) onSave();
    } catch {
      setError("Failed to update self-study");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading…</div>;
  if (error)   return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="overlay">
      <form className="form-container6" onSubmit={e => e.preventDefault()}>
        <h2>Update Your Self‑Study Plan</h2>
        <div className="form-grid">
          {/* Week ID */}
          <div className="form-group">
            <label>Week ID</label>
            <input type="number" name="week_id"       value={formData.week_id}       onChange={handleChange}/>
          </div>
          {/* Date */}
          <div className="form-group">
            <label>Date</label>
            <input type="date"   name="date"          value={formData.date}          onChange={handleChange}/>
          </div>
          {/* Skill/Module */}
          <div className="form-group">
            <label>Skill/Module</label>
            <select name="skill" value={formData.skill} onChange={handleChange}>
              <option value="">— Select —</option>
              <option value="TOEIC">TOEIC</option>
              <option value="IELTS">IELTS</option>
              <option value="IT">IT</option>
            </select>
          </div>
          {/* Lesson Summary */}
          <div className="form-group full-width">
            <label>Lesson Summary</label>
            <textarea name="lesson" value={formData.lesson} onChange={handleChange}/>
          </div>
          {/* Time Allocation */}
          <div className="form-group">
            <label>Time Allocation (min)</label>
            <input type="number" name="timeAllocation" value={formData.timeAllocation} onChange={handleChange}/>
          </div>
          {/* Learning Resources */}
          <div className="form-group full-width">
            <label>Learning Resources</label>
            <textarea name="resource" value={formData.resource} onChange={handleChange}/>
          </div>
          {/* Learning Activities */}
          <div className="form-group full-width">
            <label>Learning Activities</label>
            <textarea name="activities" value={formData.activities} onChange={handleChange}/>
          </div>
          {/* Concentration */}
          <div className="form-group">
            <label>Concentration (1–5)</label>
            <input type="number" min="1" max="5" name="concentration" value={formData.concentration} onChange={handleChange}/>
          </div>
          {/* Follow Plan */}
          <div className="form-group full-width">
            <label>Follow Plan</label>
            <textarea name="plan" value={formData.plan} onChange={handleChange}/>
          </div>
          {/* Evaluation */}
          <div className="form-group full-width">
            <label>Evaluation</label>
            <textarea name="evaluation2" value={formData.evaluation2} onChange={handleChange}/>
          </div>
          {/* Reinforcement */}
          <div className="form-group full-width">
            <label>Reinforcement</label>
            <textarea name="reinforce" value={formData.reinforce} onChange={handleChange}/>
          </div>
          {/* Notes */}
          <div className="form-group full-width">
            <label>Notes (optional)</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange}/>
          </div>
          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>Cancel</button>
          {selfStudyId && (
            <DeleteSelfStudyButton id={selfStudyId} onDeleted={onCancel} label="Delete"/>
          )}
        </div>
      </form>
    </div>
  );
}
