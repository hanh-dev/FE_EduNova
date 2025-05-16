import React from "react";
import "./DeleteGoal.css";

function DeleteGoal({ onDelete, onClose }) {
  
  // Hàm xử lý khi nhấn vào nút Delete
  const handleDelete = () => {
    // Gọi onDelete khi người dùng nhấn Yes (OK)
    onDelete();
    onClose();
  };

  const handleCancel = () => {
    onClose(); 
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
