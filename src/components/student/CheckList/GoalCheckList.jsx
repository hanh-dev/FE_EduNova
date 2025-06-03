import React, { useState, useEffect } from "react";
import {
  getAllWeekGoal,
  createWeekGoal,
  updateWeekGoalStatus,
  editWeekGoal,
  deleteWeekGoal,
} from "../../../services/api/StudentAPI";
import "./GoalChecklist.css";

function GoalChecklist() {
  const [goals, setGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState("");
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingGoalId, setUpdatingGoalId] = useState(null);
  const [deletingGoalId, setDeletingGoalId] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const data = await getAllWeekGoal();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  const toggleGoal = async (id) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;

    const newStatus = goal.complete_status === "done" ? "doing" : "done";
    setUpdatingGoalId(id);

    try {
      await updateWeekGoalStatus(id, newStatus);
      setGoals((prevGoals) =>
        prevGoals.map((g) =>
          g.id === id ? { ...g, complete_status: newStatus } : g
        )
      );
    } catch (err) {
      setError("Failed to update goal status");
    } finally {
      setUpdatingGoalId(null);
    }
  };

  const handleEdit = (goal) => {
    setEditingGoalId(goal.id);
    setEditingText(goal.goal);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSubmit = async (e, goal) => {
    if (e.key === "Enter") {
      try {
        await editWeekGoal(goal.id, {
          goal: editingText,
          complete_status: goal.complete_status,
        });

        setGoals((prevGoals) =>
          prevGoals.map((g) =>
            g.id === goal.id ? { ...g, goal: editingText } : g
          )
        );
        setEditingGoalId(null);
        setEditingText("");
        setError(null);
      } catch (err) {
        setError("Failed to edit goal");
      }
    }
  };

  const addGoal = async () => {
    if (newGoalText.trim() === "") return;

    const newGoal = {
      user_id: 1,
      goal: newGoalText,
      complete_status: "doing",
      due_date: new Date().toISOString().split("T")[0],
    };

    setLoading(true);
    try {
      await createWeekGoal(newGoal);
      setNewGoalText("");
      await fetchGoals();
    } catch (err) {
      setError("Failed to add goal");
    } finally {
      setLoading(false);
    }
  };

  const deleteGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;

    setDeletingGoalId(id);
    try {
      await deleteWeekGoal(id);
      setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete goal");
    } finally {
      setDeletingGoalId(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="goal-checklist-container">
      <div className="goal-checklist">
        {error && <div style={{ color: "red" }}>{error}</div>}

        {goals.map((goal) => (
          <div key={goal.id} className="goal-item">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                disabled={updatingGoalId === goal.id || deletingGoalId === goal.id}
                checked={goal.complete_status === "done"}
                onChange={() => toggleGoal(goal.id)}
              />
              <span className="checkmark"></span>
            </label>

            {editingGoalId === goal.id ? (
              <input
                type="text"
                value={editingText}
                onChange={handleEditChange}
                onKeyDown={(e) => handleEditSubmit(e, goal)}
                onBlur={() => setEditingGoalId(null)}
                autoFocus
              />
            ) : (
              <span
                className="goal-text"
                onClick={() => handleEdit(goal)}
              >
                {goal.goal}
              </span>
            )}

            <button
              className="delete-button"
              onClick={() => deleteGoal(goal.id)}
              disabled={deletingGoalId === goal.id}
              title="Delete Goal"
            >
              &#x2715;
            </button>
          </div>
        ))}

        <div className="add-goal-form">
          <input
            type="text"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="Enter your goal..."
          />
          <button className="add-button" onClick={addGoal}>
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalChecklist;
