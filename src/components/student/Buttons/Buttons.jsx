import React, { useState } from "react";
import "./Buttons.css";
import ClassPlanForm from "../AddForm/ClassPlanForm";
import SelfStudyPlanForm from "../AddForm/SelfStudyPlanForm";
import {
  getInClassByID,
  getSelfStudyByID,
} from "../../../services/api/StudentAPI";
import DeleteSelfStudyButton from "../AddForm/DeleteSelfStudyButton";
import DeleteClassPlanButton from "../AddForm/DeleteClassPlanForm";

export default function Buttons({ type, recordData, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [record, setRecord] = useState(null);

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

  const handleSave = (updatedItem) => {
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
              inclass={record}
              onCancel={handleCancelForm}
              onSave={handleSave}
            />
          )}
        </div>
      )}
    </>
  );
}
