import React, { useState } from "react";
import "./Buttons.css";
import ClassPlanForm from "../AddForm/ClassPlanForm";
import SelfStudyPlanForm from "../AddForm/SelfStudyPlanForm";
import { getInClassByID, getSelfStudyByID, deleteInClass } from "../../../services/api/StudentAPI";
import DeleteSelfStudyButton from "../AddForm/DeleteSelfStudyButton";
import DeleteClassPlanButton from "../AddForm/DeleteClassPlanForm";

export default function Buttons({ type, recordData, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [record, setRecord] = useState(null);
  const [showTagTeacher, setShowTagTeacher] = useState(false);

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

  return (
    <>
      <div className="button-group-study" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <i
          className="fa-solid fa-pen-to-square"
          style={{ cursor: "pointer", fontSize: "18px" }}
          title="Update"
          onClick={handleUpdateClick}
        ></i>

        {type === "class" ? (
          <DeleteClassPlanButton
            id={recordData?.id}
            onDeleted={() => onDelete && onDelete(recordData.id)}
            customIcon={true} 
          />
        ) : (
          type === "selfstudy" && (
            <DeleteSelfStudyButton
              id={recordData?.id}
              onDeleted={() => onDelete && onDelete(recordData.id)}
            />
          )
        )}
      </div>

      {showForm && record && (
        <div className="modal-overlay" key={`modal-${record.id}`}>
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
    </>
  );
}
