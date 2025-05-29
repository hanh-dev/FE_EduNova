import React, { useEffect, useState } from "react";
import './TeacherHeader.css'; 
import teacherImage from "../../assets/images/teacher.png"; 


const TeacherHeader = () => {
    const [userName, setUserName] = useState("Người dùng");
    const [userInitials, setUserInitials] = useState("??");
  
    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.username || "Người dùng");
        const initials = user.username
          .split(" ")
          .map(word => word[0])
          .join("")
          .toUpperCase();
        setUserInitials(initials);
      }
    }, []);
  
  return (
    <div className="welcome-card1">
      <div className="welcome-cardd">
      <div className="welcome-text1">
        <h2>April 21, 2025</h2>
          <p className="user-name">{userName}</p>
      </div>
      <img src={teacherImage} alt="Classx Illustration" className="teacher-img1" />
      </div>
    </div>
  );
    };

export default TeacherHeader;  