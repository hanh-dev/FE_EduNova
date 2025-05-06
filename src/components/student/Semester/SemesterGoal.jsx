import React, { useState } from "react";
import "./SemesterGoal.css";
import GoalForm from "../GoalForm/GoalForm";

export function SemesterGoal() {
  const [completeStatus, setCompleteStatus] = useState("doing");
  const [showForm, setShowForm] = useState(false);

  const toggleCompleteStatus = () =>
    setCompleteStatus((prev) => (prev === "done" ? "doing" : "done"));

  return (
    <div className="container">
      <div className="yourGoal">
      <div className="goal-header">
  <h2>Your Study Goal</h2>
  <span onClick={() => setShowForm(true)} style={{ cursor: "pointer" }}>
    <img
      src="/src/assets/image/plus.png"
      className="icon_add"
      alt="Add Goal"
      style={{ width: "24px", height: "24px" }}
    />
  </span>
</div>


        {showForm && <GoalForm onClose={() => setShowForm(false)} />}

        <div className="table-wrapper">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th>Course</th>
                <th>Course Expectations</th>
                <th>Teacher Expectations</th>
                <th>Self Expectations</th>
                <th>Complete</th>
                <th>Status</th>
                <th class="due-column">Due to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ReactJS</td>
                <td>Build a To-do App</td>
                <td></td>
                <td></td>
                <td>
                  <span
                    onClick={toggleCompleteStatus}
                    style={{
                      display: "inline-block",
                      backgroundColor: completeStatus === "done" ? "#28a745" : "#ffc107",
                      color: completeStatus === "done" ? "white" : "inherit",
                      width: "20px",
                      height: "20px",
                      padding: completeStatus === "done" ? "5px" : "0",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  ></span>
                </td>
                <td class="due-column">{completeStatus === "done" ? "Completed" : "In Progress"}</td>
                <td class="due-column">May 10</td>
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
                    onClick={() => alert("Edit clicked")}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "red", cursor: "pointer" }}
                    title="Delete"
                    onClick={() => alert("Delete clicked")}
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SemesterGoal;
