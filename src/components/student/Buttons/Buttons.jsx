import React, { useState } from "react";
import "./Buttons.css";
import ClassPlanForm from "../AddForm/ClassPlanForm";
import {
  getInClassByID,
  deleteInClass,
  getAllSelfStudy,
  getSelfStudyByID
} from "../../../services/api/StudentAPI";

export default function Buttons({ type, selfstudy, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [record, setRecord] = useState(null);

  const handleUpdateClick = async () => {

    try {
      let data = null;

      if (type === "inclass") {
         data = await getAllInClass(inclass.id);
      } else {
        data= await getSelfStudyByID(selfstudy);
      }

      setRecord(data);
      setShowForm(true);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  const handleDelete = async () => {
    if (!selfstudy?.id) return console.error("Missing selfstudy.id");

    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      if (type === "class") {
        await deleteInClass(selfstudy.id);
      } else {
        await deleteselfstudy(selfstudy.id);
      }

      alert("Delete successful");

      if (onDelete) onDelete(selfstudy.id);
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
          <ClassPlanForm
            selfstudy={record}
            onCancel={handleCancelForm}
            onSave={handleSave}
          />
        </div>
      )}
    </>
  );
}
