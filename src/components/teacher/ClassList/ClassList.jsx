import React from 'react';
import './ClassList.css';
import classListImage from "../../../assets/images/class_list.png";
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/teacher/Header/Header';

const ClassList = () => {
  const navigate = useNavigate();

  const classes = [
    { name: 'PNV26A', students: 30 },
    { name: 'PNV26B', students: 30 },
    { name: 'PNV27A', students: 30 },
    { name: 'PNV27B', students: 30 },
    { name: 'PNV25B', students: 30 },
    { name: 'PNV25A', students: 30 },
  ];

  const handleView = (className) => {
    navigate(`/class/${className}`);
  };

  return (
    <div className="class-container1">
      <h2>Class</h2>
      <div className="class-grid1">
        {classes.map((classItem, index) => (
          <div key={index} className="class-card1">
            <div className="class-content1">
              <div className="class-text1">
                <h3>{classItem.name}</h3>
                <p>Students: {classItem.students}</p>
              </div>
              <img src={classListImage} alt="Classx Illustration" className="class-list-img1" />
            </div>
            <button
              className="view-button1"
              onClick={() => handleView(classItem.name)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
