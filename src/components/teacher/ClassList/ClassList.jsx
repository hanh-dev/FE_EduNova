import React, { useEffect, useState } from "react";
import "./ClassList.css";
import classListImage from "../../../assets/images/class_list.png";
import { useNavigate } from "react-router-dom";
import {getClasses,getStudentsByClassId,} from "../../../services/api/StudentAPI";

const defaultClassImage = classListImage;

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [studentsCountByClass, setStudentsCountByClass] = useState({});
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user_id) {
      setUserId(Number(user.user_id));
    }
  }, []);

  useEffect(() => {
    const fetchClassesWithStudentCounts = async () => {
      try {
        const data = await getClasses();
        setClasses(data);

        const counts = {};
        await Promise.all(
          data.map(async (classItem) => {
            const studentList = await getStudentsByClassId(classItem.id);
            counts[classItem.id] = studentList.length;
          })
        );
        setStudentsCountByClass(counts);
      } catch (error) {
        console.error("Error fetching classes or student counts:", error);
      }
    };

    fetchClassesWithStudentCounts();
  }, []);

  const handleViewStudents = (classItem) => {
    navigate(`/classes/${classItem.id}/students`, {
      state: { className: classItem.name },
    });
  };

  return (
    <div className="class-container1">
      <h2>All Classes</h2>
      <div className="class-grid1">
        {classes.map((classItem) => (
          <div key={classItem.id} className="class-card1">
            <div className="class-content1">
              <div className="class-text1">
                <h3>{classItem.name}</h3>
                <p>
                  Total students:{" "}
                  {studentsCountByClass[classItem.id] ?? "Loading..."}
                </p>
              </div>
              <img
                src={classListImage || defaultClassImage}
                alt={`Image of ${classItem.name}`}
                className="class-list-img1"
              />
            </div>
            <button
              className="view-button1"
              onClick={() => handleViewStudents(classItem)}
            >
              View Students
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
