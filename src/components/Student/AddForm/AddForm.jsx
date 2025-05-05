import React from 'react'

function AddForm({setStudyPlan}) {
    
  return (
    <div>
      <h2>This is add form</h2>
      <button onClick={() => setStudyPlan(false)}>X</button>
    </div>
  )
}

export default AddForm
