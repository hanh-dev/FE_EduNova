import React, { useEffect, useState } from "react";
import "./DeleteGoal.css";
import { deleteGoal, getGoal } from "../../../services/api/StudentAPI";

function DeleteGoal({ id, onDeleteSuccess, onClose }) {
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await getGoal(id);  // Lấy dữ liệu của goal theo id
        console.log("Goal Data:", response);
        if (response) {
          setGoal(response);
        }
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    if (id) {
      fetchGoalData();  // Gọi fetch khi id thay đổi
    }
  }, [id]);  // Chỉ gọi lại khi id thay đổi

  const handleDelete = async () => {
    try {
      await deleteGoal(id);  // Xóa mục tiêu bằng id
      alert("Goal deleted successfully!");
      if (onDeleteSuccess) {
        onDeleteSuccess(id);  // Gọi callback khi xóa thành công
      }
      onClose();  // Đóng popup
    } catch (error) {
      alert("Failed to delete goal.");
      console.error("Delete error:", error);
    }
  };

  const handleCancel = () => {
    onClose();  // Đóng popup khi hủy
  };

  return (
    <div className="delete-popup">
      <div className="delete-popup-content">
        <h3>Are you sure you want to delete this goal?</h3>
        <div className="delete-buttons">
          <button className="btn-confirm" onClick={handleDelete}>Delete</button>
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteGoal;
