import React from "react";
import { deleteInClass } from "../../../services/api/StudentAPI";

export default function DeleteClassPlanButton({ id, onDeleted }) {
  const handleDelete = async () => {
    if (!id) return console.error("Missing id");

    const confirm = window.confirm("Are you sure you want to delete this class plan?");
    if (!confirm) return;

    try {
      await deleteInClass(id);
      alert("Delete successful");
      if (onDeleted) onDeleted(id);
    } catch (e) {
      console.error("Delete error:", e);
      alert("Failed to delete");
    }
  };

  return (
    <button className="btn delete-btn-inclass" onClick={handleDelete}>
      Delete
    </button>
  );
}
