import React from "react";
import { deleteSelfStudy } from "../../../services/api/StudentAPI";

const DeleteSelfStudyButton = ({ id, onDeleted }) => {
  const handleDelete = async () => {
    if (!id) {
      alert("No ID to delete");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteSelfStudy(id);
      alert("Deleted successfully!");
      if (onDeleted) {
        onDeleted(); 
      }
    } catch (error) {
      alert("Failed to delete. Please try again.");
    }
  };

  return (
  <button
  type="button"
  onClick={handleDelete}
  style={{
    padding: "10px",
    marginLeft: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "10px"
  }}
>
  Delete
</button>

  );
};

export default DeleteSelfStudyButton;
