import React, { useState } from 'react'
import SelfStudy from '../../../components/Student/SelfStudy/SelfStudyPlan';
import ClassPlan from '../../../components/student/StudyPlan1/ClassPlan';

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