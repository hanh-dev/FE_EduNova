import React, { useState } from 'react'
import ClassPlan  from "../../../components/Student/StudyPlan/ClassPlan";
import AddForm from '../../../components/Student/AddForm/AddForm';

function ClassPlan1() {
  const [addStudyPlan, setStudyPlan] = useState(false);
  return (
    <div>
      <div className="tabs">
        <button className="tab active">In class</button>
        <button className="tab">Self-Study</button>
      </div>

      {/* <div className="controls">
        <button className="add-btn" onClick={() => setStudyPlan(true)}>Add +</button>
        {addStudyPlan && <AddForm setStudyPlan={setStudyPlan}/>}
        <button className="update-btn">Update</button>
      </div> */}
      <ClassPlan></ClassPlan>
    </div>
  )
}

export default ClassPlan1
