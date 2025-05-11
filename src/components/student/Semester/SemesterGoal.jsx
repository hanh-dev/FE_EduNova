import React, { useState, useEffect } from "react";
import GoalForm from "../GoalForm/GoalForm";
import DeleteGoal from "../GoalForm/DeleteGoal";
import EditGoal from "../GoalForm/EditGoal"; // Import EditGoal
import "./SemesterGoal.css";

export default function SemesterGoal() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null); // Thêm state cho goal đang chỉnh sửa

  // Hàm lấy dữ liệu goals từ localStorage hoặc API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const localGoals = JSON.parse(localStorage.getItem("goals")) || [];

        if (localGoals.length === 0) {
          const response = await fetch("/goals.json");
          const jsonGoals = await response.json();
          localStorage.setItem("goals", JSON.stringify(jsonGoals));
          setGoals(jsonGoals);
        } else {
          setGoals(localGoals);
        }
      } catch (error) {
        console.error("Error loading goals:", error);
      }
    };

    fetchGoals();
  }, []);

  // Hàm lưu goal mới
  const handleSaveGoal = (newGoal) => {
    const updatedGoals = [...goals, { ...newGoal, completeStatus: "doing" }];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  // Hàm cập nhật trạng thái hoàn thành
  const toggleCompleteStatus = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completeStatus =
      updatedGoals[index].completeStatus === "done" ? "doing" : "done";
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  // Hàm xóa goal
  const handleDeleteGoal = () => {
    const updatedGoals = goals.filter((_, i) => i !== deleteIndex);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setShowDeletePopup(false);
    setDeleteIndex(null);
  };

  // Hàm cập nhật goal đã chỉnh sửa
  const handleUpdateGoal = (updatedGoal) => {
    const updatedGoals = goals.map((goal, index) =>
      index === editingGoal.index ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setEditingGoal(null); // Đóng form sau khi lưu
  };

  // Đóng popup xóa
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="container">
      <div className="yourGoal">
        <div className="goal-header">
          <h2>Your Study Goal</h2>
          <span className="add-goal-btn" onClick={() => setShowForm(true)}>
            <img src="/src/assets/image/plus.png" className="icon_add" alt="Add Goal" />
          </span>
        </div>

        {showForm && (
          <GoalForm onClose={() => setShowForm(false)} onSave={handleSaveGoal} />
        )}

        {editingGoal && (
          <EditGoal goal={editingGoal} onClose={() => setEditingGoal(null)} onSave={handleUpdateGoal} />
        )}

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
                <th>Due to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <tr key={index}>
                    <td>{goal.course}</td>
                    <td>{goal.courseExpectations}</td>
                    <td>{goal.teacherExpectations}</td>
                    <td>{goal.selfExpectations}</td>
                    <td>
                      <span
                        onClick={() => toggleCompleteStatus(index)}
                        style={{
                          display: "inline-block",
                          backgroundColor: goal.completeStatus === "done" ? "#28a745" : "#ffc107",
                          color: goal.completeStatus === "done" ? "white" : "inherit",
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>{goal.completeStatus === "done" ? "Completed" : "In Progress"}</td>
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
                        onClick={() => setEditingGoal({ ...goal, index })} // Chuyển sang EditGoal
                      ></i>

                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        title="Delete"
                        onClick={() => {
                          setDeleteIndex(index);
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

      {showDeletePopup && <DeleteGoal onDelete={handleDeleteGoal} onClose={handleCloseDeletePopup} />}
    </div>
  );
}
