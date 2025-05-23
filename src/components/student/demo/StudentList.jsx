import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./StudentList.css";
// import Header from "../../../components/teacher/Header/Header";
import { getStudents } from "../../../services/api/StudentAPI";


const StudentList = () => {
  const { className } = useParams();
  const [students, setStudents] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giả sử getStudents nhận className để lấy danh sách học sinh lớp đó
        const studentData = await getStudents(className);
        console.log("Student data:", studentData);
        setStudents(studentData);
      } catch (error) {
        console.log("Error fetching students:", error);
      }
    };


    fetchData();
  }, [className]);


  return (
    <>
      <div className="student-list-container">
        <h2 className="class-title">{className}</h2>
        <div className="student-grid">
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <div className="student-card" key={index}>
                <div className="student-box">
                  <img
                    src={
                      student.image ||
                      "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                    }
                    alt="avatar"
                    className="avatar"
                  />


                  <p className="student-name">{student.name || student}</p>
                  <button className="portfolio-button">View Portfolio</button>
                </div>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </div>
        <Link to="/" className="back-link">
          ⬅ Back
        </Link>
      </div>
    </>
  );
};


export default StudentList;


