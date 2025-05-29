import React, { useState } from "react";
import SemesterButton from "../../../components/student/Semester/SemesterButtons";

export default function ParentComponent() {
  const [semesterGoal, setSemesterGoal] = useState(null);

  const handleSemesterSelect = (semester) => {
    setSemesterGoal(semester);
    console.log("Đã gọi đến SemesterGoal với:", semester);
  };

  return (
    <div>
      <SemesterButton onSelectSemester={handleSemesterSelect} />
      {semesterGoal && (
        <div>
          <h4>Semester Goal:</h4>
          <p>{semesterGoal.name}</p>
         
        </div>
      )}
    </div>
  );
}
