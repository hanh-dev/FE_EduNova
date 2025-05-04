import React, { useState } from "react";
import "./YourGoal.css";

export function YourGoal() {
  const [completeStatus, setCompleteStatus] = useState("doing");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const toggleCompleteStatus = () => {
    setCompleteStatus((prev) => (prev === "done" ? "doing" : "done"));
  };

  const renderCompleteIcon = () => {
    if (completeStatus === "done") {
      return (
        <span
          onClick={toggleCompleteStatus}
          style={{
            display: "inline-block",
            backgroundColor: "#28a745",
            padding: "5px",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
        >
        </span>
      );
    } else {
      return (
        <span
          onClick={toggleCompleteStatus}
          style={{
            display: "inline-block",
            backgroundColor: "#ffc107",
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        ></span>
      );
    }
  };

  const getStatus = () => {
    return completeStatus === "done" ? "Completed" : "In Progress";
  };

  return (
    <div className="container">
      <div className="yourGoal">
        <h2 className="mt-4 mb-3">
          Your Study Goal
          <span onClick={handleShowForm} style={{ cursor: "pointer" }}>
            <img
              src="/src/assets/image/plus.png"
              className="icon_add"
              alt="Add Goal"
              style={{ marginLeft: "10px", width: "24px", height: "24px" }}
            />
          </span>
        </h2>

        {showForm && (
          <div className="goal-overlay">
            <div className="goal-form">
              <span className="close-btn" onClick={() => setShowForm(false)}>
                ×
              </span>
              <h3>Set a Goal</h3>
              <div className="mb-3">
                <label className="title">Course</label>
                <select className="form-control">
                  <option value="English">English</option>
                  <option value="IT-English">IT-English</option>
                  <option value="Communicative">Communicative</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="title">Goal</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="title">Due date</label>
                <input type="date" className="form-control due-date" />
              </div>
              <button className="btn w-100" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>Save</button>

            </div>
          </div>
        )}

        <div className="table-wrapper">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th>Course</th>
                <th>Goal</th>
                <th>Complete</th>
                <th>Status</th>
                <th>Due to</th>
                <th>History</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ReactJS</td>
                <td>Build a To-do App</td>
                <td>{renderCompleteIcon()}</td>
                <td>{getStatus()}</td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    value={completeStatus}
                    onChange={(e) => setCompleteStatus(e.target.value)}
                  >
                    <option value="doing">Đang làm</option>
                    <option value="done">Hoàn thành</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default YourGoal;
