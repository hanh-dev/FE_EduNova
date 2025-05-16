import React, { useState } from 'react';
import './Buttons.css'; 
import UpdateClassPlanForm from '../AddForm/ClassPlanForm'; 
import UpdateSelfStudyPlanForm from '../AddForm/SelfStudyPlanForm'; 
import { getInClassByID } from '../../../services/api/StudentAPI';

function Buttons({ type, inclass }) {
  const [showForm, setShowForm] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const handleUpdateClick = async () => {
    if (!inclass || !inclass.id) {
      console.error("inclass or inclass.id is undefined");
      return;
    }
    try {
      const data = await getInClassByID(inclass.id);
      setGoalToEdit(data);
      setShowForm(true);
    } catch (error) {
      console.error("Failed to fetch inclass data:", error);
    }
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setGoalToEdit(null);
  };

  const handleSave = () => {
    console.log('Form data saved!');
    setShowForm(false);
    setGoalToEdit(null);
  };

  return (
    <td className="test">
      <button className="btn" onClick={handleUpdateClick}>Update</button>
      <button className="btn" onClick={handleCancelClick}>Cancel</button>

      {showForm && (
        <div className="modal-overlay">
          {type === "class" ? (
            <UpdateClassPlanForm
              goal={goalToEdit}
              onSave={handleSave}
              onCancel={handleCancelClick}
            />
          ) : (
            <UpdateSelfStudyPlanForm
              goal={goalToEdit}
              onSave={handleSave}
              onCancel={handleCancelClick}
            />
          )}
        </div>
      )}
    </td>
  );
}

export default Buttons;