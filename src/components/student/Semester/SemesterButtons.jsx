// SemesterButton.jsx
import React, { useState, useEffect } from "react";
import { getSemester, getSemesterByID, createSemesterByID } from "../../../services/api/StudentAPI";
import SemesterGoal from "./SemesterGoal";
import './SemesterButtons.css';
import './SemesterGoal.css';

export default function SemesterButton() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semesterGoal, setSemesterGoal] = useState(null);
  const [activeSemesterId, setActiveSemesterId] = useState(null);

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    setLoading(true);
    try {
      const semestersData = await getSemester();
      setSemesters(semestersData);

      const defaultSemester = semestersData.find((s) => s.id === 1) || semestersData[0];
      if (defaultSemester) {
        const semesterDetail = await getSemesterByID(defaultSemester.id);
        setSemesterGoal(semesterDetail);
        setActiveSemesterId(defaultSemester.id);
      }
    } catch (error) {
      console.error("Failed to fetch semesters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = async (e) => {
    const id = Number(e.target.value);
    try {
      const semesterDetail = await getSemesterByID(id);
      setSemesterGoal(semesterDetail);
      setActiveSemesterId(id);
    } catch (error) {
      console.error("Failed to fetch semester detail:", error);
    }
  };

  const handleAddSemester = async () => {
    try {
      const newSemesterNumber = semesters.length + 1;

      const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };

      const now = new Date();
      const start_date = formatDate(now);

      const endDateObj = new Date(now);
      endDateObj.setMonth(endDateObj.getMonth() + 6);
      const end_date = formatDate(endDateObj);

      const newSemesterData = {
        name: `Semester ${newSemesterNumber}`,
        start_date,
        end_date,
      };

      const createdSemester = await createSemesterByID(newSemesterData);

      await fetchSemesters();

      if (createdSemester && createdSemester.id) {
        const semesterDetail = await getSemesterByID(createdSemester.id);
        setSemesterGoal(semesterDetail);
        setActiveSemesterId(createdSemester.id);
      }
    } catch (error) {
      console.error("Failed to create semester:", error);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

 return (
  <div>
    {semesterGoal && (
      <div style={{ marginTop: "20px" }}>
        <SemesterGoal semester={semesterGoal} />
      </div>
    )}
    <div className="fixed-buttons">
      <div className="semester-select-wrapper">
        <select
          value={activeSemesterId || ""}
          onChange={handleSelectChange}
          className="semester-select"
        >
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>

        <button className="add-semester-btn" onClick={handleAddSemester} title="Add new semester">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
);

}
