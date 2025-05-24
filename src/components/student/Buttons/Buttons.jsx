import React, { useState } from "react";
import "./Buttons.css";
import ClassPlanForm from "../AddForm/ClassPlanForm";
import SelfStudyPlanForm from "../AddForm/SelfStudyPlanForm";
import { getInClassByID, getSelfStudyByID, deleteInClass } from "../../../services/api/StudentAPI";
import DeleteSelfStudyButton from "../AddForm/DeleteSelfStudyButton";
import DeleteClassPlanButton from "../AddForm/DeleteClassPlanForm";
import TagTeacher from "../Form/TagTeacher"; // Import TagTeacher component
// import { deleteInClass, getInClassByID } from "../../../services/api/StudentAPI";

export default function Buttons({ type, recordData, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [record, setRecord] = useState(null);
  const [showTagTeacher, setShowTagTeacher] = useState(false); // State for TagTeacher modal

  const handleUpdateClick = async () => {
    if (!recordData?.id) {
      console.error("Missing recordData.id");
      return;
    }

    try {
      let data;
      if (type === "class") {
        data = await getInClassByID(recordData.id);
      } else if (type === "selfstudy") {
        data = await getSelfStudyByID(recordData.id);
        console.log("data: ", data);
      }
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

        {type === "class" ? (
          <DeleteClassPlanButton
            id={recordData?.id}
            onDeleted={() => onDelete && onDelete(recordData.id)}
          />
        ) : (
          type === "selfstudy" && (
            <DeleteSelfStudyButton
              id={recordData?.id}
              onDeleted={() => onDelete && onDelete(recordData.id)}
            />
          )
        )}
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
          {type === "class" ? (
            <ClassPlanForm
              inclass={record}
              onCancel={handleCancelForm}
              onSave={handleSave}
            />
          ) : (
            <SelfStudyPlanForm
              record={record}
              onCancel={handleCancelForm}
              onSave={handleSave}
            />
          )}
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
