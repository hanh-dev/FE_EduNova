import React, { useState } from "react";
import "./Buttons.css";
import ClassPlanForm from "../AddForm/ClassPlanForm";
import TagTeacher from "../Form/TagTeacher"; // Import TagTeacher component
import { deleteInClass, getInClassByID } from "../../../services/api/StudentAPI";

export default function Buttons({ type, inclass, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [record, setRecord] = useState(null);
  const [showTagTeacher, setShowTagTeacher] = useState(false); // State for TagTeacher modal

  const handleUpdateClick = async () => {
    if (!inclass?.id) return console.error("Missing inclass.id");
    try {
      const data = await getInClassByID(inclass.id);
      setRecord(data);
      setShowForm(true);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  const handleDelete = async () => {
    if (!inclass?.id) return console.error("Missing inclass.id");
    try {
      await deleteInClass(inclass.id);
      alert("Delete successful");

      if (onDelete) onDelete(inclass.id);
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleSave = (updatedItem) => {
    if (onUpdate) onUpdate(updatedItem);
    setShowForm(false);
    setRecord(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setRecord(null);
  };

  // Handle comment button click
  const handleCommentClick = () => {
    setShowTagTeacher(true);
  };

  // Handle closing the TagTeacher modal
  const handleTagTeacherClose = () => {
    setShowTagTeacher(false);
  };

  return (
    <>
      <div className="button-group">
        <button className="btn update btn-inclass" onClick={handleUpdateClick}>
          Update
        </button>
        <button className="btn delete btn-inclass" onClick={handleDelete}>
          Delete
        </button>
        <i
          className="fa-regular fa-comment"
          style={{ color: "#007bff", cursor: "pointer", marginLeft: "10px" }}
          title="Comment"
          onClick={handleCommentClick}
        />
      </div>

      {showForm && record && (
        <div className="modal-overlay">
          <ClassPlanForm
            inclass={record}
            onCancel={handleCancelForm}
            onSave={handleSave}
          />
        </div>
      )}

      {showTagTeacher && (
        <TagTeacher
          onClose={handleTagTeacherClose}
          goalId={inclass.id}
        />
      )}
    </>
  );
}