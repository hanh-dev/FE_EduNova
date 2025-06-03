import React from "react";
import "./GoalForm.css";
export default function GoalForm({
  newGoalData,
  setNewGoalData,
  onSave,
  onCancel,
}) {
  return (
    <tr>
      <td>
        <select
          value={newGoalData.course}
          onChange={(e) =>
            setNewGoalData({ ...newGoalData, course: e.target.value })
          }
        >
          <option value="English">English</option>
          <option value="IT-English">IT-English</option>
          <option value="Communication">Communication</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          value={newGoalData.goals}
          onChange={(e) =>
            setNewGoalData({ ...newGoalData, goals: e.target.value })
          }
          placeholder="Goal"
        />
      </td>
      <td>
        <input
          type="text"
          value={newGoalData.courseExpectations}
          onChange={(e) =>
            setNewGoalData({
              ...newGoalData,
              courseExpectations: e.target.value,
            })
          }
          placeholder="Course Expectations"
        />
      </td>
      <td>
        <input
          type="text"
          value={newGoalData.teacherExpectations}
          onChange={(e) =>
            setNewGoalData({
              ...newGoalData,
              teacherExpectations: e.target.value,
            })
          }
          placeholder="Teacher Expectations"
        />
      </td>
      <td>
        <input
          type="text"
          value={newGoalData.selfExpectations}
          onChange={(e) =>
            setNewGoalData({
              ...newGoalData,
              selfExpectations: e.target.value,
            })
          }
          placeholder="Self Expectations"
        />
      </td>
      <td>
        <input type="checkbox" checked={false} disabled />
      </td>
      <td>
        <input
          type="date"
          value={newGoalData.dueDate}
          onChange={(e) =>
            setNewGoalData({ ...newGoalData, dueDate: e.target.value })
          }
          required
        />
      </td>
      <td>
        <button className="save-goal" onClick={onSave}>Save</button>
        <button className="cancel-goal" onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  );
}
