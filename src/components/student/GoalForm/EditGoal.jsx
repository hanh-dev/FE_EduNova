import React from "react";

export default function EditGoal({ editData, onChange, onSave, onCancel, goalId }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSave(goalId);
  };

  return (
    <tr>
      <td>
        <select
          value={editData.course || ""}
          onChange={(e) => onChange("course", e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        >
          <option value="">-- Select Course --</option>
          <option value="English">English</option>
          <option value="IT-English">IT-English</option>
          <option value="Communication">Communication</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          value={editData.goals || ""}
          onChange={(e) => onChange("goals", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input
          type="text"
          value={editData.courseExpectations || ""}
          onChange={(e) => onChange("courseExpectations", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input
          type="text"
          value={editData.teacherExpectations || ""}
          onChange={(e) => onChange("teacherExpectations", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input
          type="text"
          value={editData.selfExpectations || ""}
          onChange={(e) => onChange("selfExpectations", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={editData.completeStatus === "done"}
          onChange={(e) =>
            onChange("completeStatus", e.target.checked ? "done" : "doing")
          }
        />
      </td>
      <td>
        <input
          type="date"
          value={editData.dueDate || ""}
          onChange={(e) => onChange("dueDate", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <button className="save-goal" onClick={() => onSave(goalId)}>Save</button>
        <button className="cancel-goal" onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  );
}
