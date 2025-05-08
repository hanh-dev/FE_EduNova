import React, { useState } from 'react';
import './Buttons.css'; 
import UpdateClassPlanForm from '../AddForm/ClassPlanForm'; 
import UpdateSelfStudyPlanForm from '../AddForm/SelfStudyPlanForm'; 


function Buttons() {
  const [showForm, setShowForm] = useState(false);

  const handleUpdateClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleSave = () => {
    console.log('Form data saved!');
    setShowForm(false); 
  };

  return (
    <td className="test">
      <button className="btn" onClick={handleUpdateClick}>Update</button>
      <button className="btn" onClick={handleCancelClick}>Cancel</button>

      {showForm && (
        <div className="modal-overlay">
          {/* <UpdateClassPlanForm onSave={handleSave} onCancel={handleCancelClick} /> */}
          <UpdateSelfStudyPlanForm onSave={handleSave} onCancel={handleCancelClick} />

        </div>
      )}
    </td>
  );
}

export default Buttons;
