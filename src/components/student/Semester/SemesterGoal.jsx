import React, { useState, useEffect } from "react";
import GoalForm from '../../student/GoalForm/GoalForm';

import DeleteGoal from "../GoalForm/DeleteGoal";
import EditGoal from "../GoalForm/EditGoal";
import "./SemesterGoal.css";

export default function SemesterGoal() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [goalToDeleteIndex, setGoalToDeleteIndex] = useState(null);
  const [goalToEdit, setGoalToEdit] = useState(null);

  // Load goals from localStorage or fallback to /goals.json
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];

        if (storedGoals.length === 0) {
          const response = await fetch("/goals.json");
          const fetchedGoals = await response.json();
          localStorage.setItem("goals", JSON.stringify(fetchedGoals));
          setGoals(fetchedGoals);
        } else {
          setGoals(storedGoals);
        }
      } catch (error) {
        console.error("Failed to load goals:", error);
      }
    };

    loadGoals();
  }, []);

  // Save goals to localStorage
  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  // Add new goal
  const handleSaveGoal = (newGoal) => {
    const newGoals = [...goals, { ...newGoal, completeStatus: "doing" }];
    updateGoals(newGoals);
    setShowForm(false);
  };

  // Toggle status
  const toggleCompleteStatus = (index) => {
    const updated = [...goals];
    updated[index].completeStatus =
      updated[index].completeStatus === "done" ? "doing" : "done";
    updateGoals(updated);
  };

  // Delete goal
  const handleDeleteGoal = () => {
    const updated = goals.filter((_, i) => i !== goalToDeleteIndex);
    updateGoals(updated);
    setShowDeletePopup(false);
    setGoalToDeleteIndex(null);
  };

  // Edit and update goal
  const handleUpdateGoal = (updatedGoal) => {
    const updated = goals.map((goal, index) =>
      index === goalToEdit.index ? updatedGoal : goal
    );
    updateGoals(updated);
    setGoalToEdit(null);
  };

  return (
    <div className="container">
      <div className="yourGoal">
        <div className="goal-header">
          <h2>Your Study Goal</h2>
          <span className="add-goal-btn" onClick={() => setShowForm(true)}>
            <img
              src="/src/assets/image/plus.png"
              className="icon_add"
              alt="Add Goal"
            />
          </span>
        </div>

        {showForm && (
          <GoalForm onClose={() => setShowForm(false)} onSave={handleSaveGoal} />
        )}

        {goalToEdit && (
          <EditGoal
            goal={goalToEdit}
            onClose={() => setGoalToEdit(null)}
            onSave={handleUpdateGoal}
          />
        )}

        <div className="table-wrapper">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th>Course</th>
                <th>Goal</th>
                <th>Course Expectations</th>
                <th>Teacher Expectations</th>
                <th>Self Expectations</th>
                <th>Complete</th>
                <th>Status</th>
                <th>Due to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <tr key={index}>
                    <td>{goal.course}</td>
                    <td>{goal.goals}</td>
                    <td>{goal.courseExpectations}</td>
                    <td>{goal.teacherExpectations}</td>
                    <td>{goal.selfExpectations}</td>
                    <td>
                      <span
                        onClick={() => toggleCompleteStatus(index)}
                        style={{
                          display: "inline-block",
                          backgroundColor:
                            goal.completeStatus === "done" ? "#28a745" : "#ffc107",
                          color:
                            goal.completeStatus === "done" ? "white" : "inherit",
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>
                      {goal.completeStatus === "done"
                        ? "Completed"
                        : "In Progress"}
                    </td>
                    <td>{goal.dueDate}</td>
                    <td>
                      <i
                        className="fa-regular fa-clock"
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        title="View time"
                        onClick={() => alert("View time clicked")}
                      ></i>
                      <i
                        className="fa-regular fa-pen-to-square"
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        title="Edit"
                        onClick={() =>
                          setGoalToEdit({ ...goal, index })
                        }
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        title="Delete"
                        onClick={() => {
                          setGoalToDeleteIndex(index);
                          setShowDeletePopup(true);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No goals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDeletePopup && (
        <DeleteGoal onDelete={handleDeleteGoal} onClose={() => setShowDeletePopup(false)} />
      )}
    </div>
  );
}
