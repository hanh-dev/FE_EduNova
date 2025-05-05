import React, { useState } from 'react'
import ClassPlan  from "../../../components/Student/StudyPlan/ClassPlan";
import AddForm from '../../../components/Student/AddForm/AddForm';
import SelfStudy from '../../../components/Student/SelfStudy/SelfStudy';

function ClassPlan1() {
  const [addStudyPlan, setStudyPlan] = useState(false);
  const [classForm, setClassForm] = useState(true)
  return (
    <div>
      <div className="tabs">
        <button className="tab active" onClick={() => setClassForm(true)}>In class</button>
        <button className="tab" onClick={() => setClassForm(false)}>Self-Study</button>
      </div>
      {classForm && <ClassPlan></ClassPlan>}
      {!classForm && <SelfStudy></SelfStudy>}
    </div>
  )
}

export default ClassPlan1
