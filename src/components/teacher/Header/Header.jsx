import React from 'react';
import './Header.css'; 
import teacherImage from "../../../assets/images/teacher.png"; 


const Header = () => {
  return (
    <div className="welcome-card1">
      <div className="welcome-text1">
        <h2>April 21, 2025</h2>
        <p>Welcome back, Ms. Trang</p>
      </div>
      <img src={teacherImage} alt="Classx Illustration" className="teacher-img1" />
    </div>
  );
    };

export default Header;