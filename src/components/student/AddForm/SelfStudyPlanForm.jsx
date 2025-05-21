import React, { useState } from "react";
import "./Buttons.css";
import ClassPlanForm from "../AddForm/ClassPlanForm";
import SelfStudyPlanForm from "../AddForm/SelfStudyPlanForm";  // import form mới
import {
  getInClassByID,
  deleteInClass,
  getAllSelfStudy,
  getSelfStudyByID,
  deleteSelfStudy, // sửa tên hàm cho đúng
} from "../../../services/api/StudentAPI";

export default function Buttons({ type, selfstudy, onUpdate, onDelete }) {
  const [showForm, setFormData] = useState(false);
  const [record, setRecord] = useState(null);

  const handleUpdateClick = async () => {
    try {
      let data = null;

      if (type === "inclass") {
        data = await getInClassByID(selfstudy.id);
      } else {
        data = await getSelfStudyByID(selfstudy.id);
      }

      setRecord(data);
      setFormData(true);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  const handleDelete = async () => {
    if (!selfstudy?.id) return console.error("Missing selfstudy.id");

    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      if (type === "inclass") {
        await deleteInClass(selfstudy.id);
      } else {
        await deleteSelfStudy(selfstudy.id);
      }

      alert("Delete successful");

      if (onDelete) onDelete(selfstudy.id);
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleSave = (updatedItem) => {
    if (onUpdate) onUpdate(updatedItem);
    setFormData(false);
    setRecord(null);
  };

  const handleCancelForm = () => {
    setFormData(false);
    setRecord(null);
  };

  return (
    <>
      <button className="btn update btn-selfstudy" onClick={handleUpdateClick}>
        Update
      </button>
      <button className="btn delete btn-selfstudy" onClick={handleDelete}>
        Delete
      </button>

      {showForm && record && (
        <div className="modal-overlay">
          {type === "inclass" ? (
            <ClassPlanForm
              selfstudy={record}
              onCancel={handleCancelForm}
              onSave={handleSave}
            />
          ) : (
            <SelfStudyPlanForm
              selfstudy={record}
              onCancel={handleCancelForm}
              onSave={handleSave}
            />
          )}
        </div>
      )}
    </>
  );
}
