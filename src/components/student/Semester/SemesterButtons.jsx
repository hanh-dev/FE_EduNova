import React, { useState, useEffect } from "react";
import { getSemester, getSemesterByID } from "../../../services/api/StudentAPI";
import SemesterGoal from "./SemesterGoal";

export default function SemesterButton() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semesterGoal, setSemesterGoal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const semestersData = await getSemester();
        setSemesters(semestersData);
      } catch (error) {
        console.error("Failed to fetch semesters:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleClick = async (id) => {
    try {
      const semesterDetail = await getSemesterByID(id);
      setSemesterGoal(semesterDetail);
    } catch (error) {
      console.error("Failed to fetch semester detail:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Semester List</h3>
      <div>
        {semesters.map((semester) => (
          <button
            key={semester.id}
            style={{
              margin: "4px",
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: "4px",
              border: "1px solid #007bff",
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => handleClick(semester.id)}
          >
            {semester.name}
          </button>
        ))}
      </div>

      {semesterGoal ? (
        <div style={{ marginTop: "20px" }}>
            
          <SemesterGoal semester={semesterGoal} />
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>Chưa chọn học kỳ</p>
      )}
    </div>
  );
}
